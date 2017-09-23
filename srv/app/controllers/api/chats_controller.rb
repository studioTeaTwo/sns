# @tag Chats
class Api::ChatsController < ApplicationController
  before_action :correct_user, only: [:show, :say, :destroy]

  # Returns the list of chat threads
  #
  # @response_status 200
  # @response_class Array<Rest::ChatThreadSerializer>
  def index
    @chat_threads = current_user.chat_threads.order("updated_at DESC")
    render json: @chat_threads, each_serializer: Rest::ChatThreadSerializer
  end

  # Creates a chat thread
  #
  # @name ChatThreadRequestBody
  # @body_parameter [Params::ChaThread] chatThread
  # @response_status 200
  # @response_class Rest::ChatThreadSerializer
  def create
    participants = make_participants
    @existing_chat_thread = current_user.chat_threads.where("participants = ?", participants.to_yaml)
    if @existing_chat_thread.present?
      render json: @existing_chat_thread.first, serializer: Rest::ChatThreadSerializer
      return
    end
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

  # Returns the chats of the chat thread
  #
  # @response_status 200
  # @response_class Array<Rest::ChatSerializer>
  def show
    @chat_thread = ChatThread.find(params[:id])
    # 既読チェック
    readChat(@chat_thread.id, @chat_thread.chats.last.id) if @chat_thread.chats.count > 0
    render json: @chat_thread.chats, each_serializer: Rest::ChatSerializer
  end

  # Creates a chat
  #
  # @name ChatRequestBody
  # @body_parameter [Params::Chat] chat
  # @response_status 200
  # @response_class Rest::ChatSerializer
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

  # Deletes a chat thread
  #
  # @response_status 200
  def destroy
  end

  private
  
    def chat_thread_params
      params.fetch(:chat_thread, {}).permit(
        :chat_thread_id,
        :participants => []
      )
    end

    def chat_params
      params.fetch(:chat, {}).permit(*Chat.column_names)
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
