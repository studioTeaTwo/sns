class Api::ChatsController < ApplicationController
  before_action :correct_user, only: [:show, :say, :destroy]

  def index
    @chat_threads = current_user.chat_threads.order("updated_at DESC")
    render json: @chat_threads, each_serializer: Rest::ChatThreadSerializer
  end

  def create
    participants = make_participants
    @chat_thread = current_user.chat_threads.build({participants: participants})
    ActiveRecord::Base.transaction do
      @chat_thread.save!
      participants.each do |participant|
        ChatStatus.create(chat_thread_id: @chat_thread.id, user_id: participant)
      end
    end
    render json: @chat_thread, status: :created, serializer: Rest::ChatThreadSerializer
  rescue => e
    render json: @chat_thread.errors.full_messages, status: :unprocessable_entity
  end

  def show
    @chat_thread = ChatThread.find(params[:id])
    # 既読チェック
    readChat(@chat_thread.id, @chat_thread.chats.last.id) if @chat_thread.chats.count > 0
    render json: @chat_thread.chats, each_serializer: Rest::ChatSerializer
  end

  def say
    @chat = current_user.chats.build(chat_params)
    @chat.sender_id = current_user.id
    ActiveRecord::Base.transaction do
      @chat.save!
      chat_thread = ChatThread.find(chat_params[:chat_thread_id])
      chat_thread.update(newest_chat_id: @chat.id)
      readChat(chat_thread.id, @chat.id)
    end
    render json: @chat, serializer: Rest::ChatSerializer
  rescue => e
    render json: @chat.errors.full_messages, status: :unprocessable_entity
  end

  def destroy
  end

  private
  
      def chat_thread_params
        params.fetch(:chat_thread, {}).permit(
          :chat_thread_id,
          :participants => [],
        )
      end

      def chat_params
        params.fetch(:chat, {}).permit(
          :chat_thread_id,
          :body,
        )
      end

      def readChat(chat_thread_id, chat_id)
        ChatStatus.where(chat_thread_id: chat_thread_id, user_id: current_user.id).first.update(read_until: chat_id)
      end

      def correct_user
        chat_thread = ChatThread.find(params[:id])
        render json: { error: 'forbidden' }, status: :forbidden if chat_thread.chat_statuses.where(user_id: current_user.id).empty?
      end

      def make_participants
        participants = chat_thread_params[:participants]
        participants.push(current_user.id)
        # modelのvalidates :participantsのためにsortする
        participants.map(&:to_i).sort!        
      end
end
