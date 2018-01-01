require 'rails_helper'

RSpec.describe "Api::Chats", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }
  let(:other_user) { create(:admin_user) }
  let(:chat_thread) { create(:chat_thread) }
  let(:chat) { create(:chat, {sender_id: current_user.id, chat_thread_id: 1}) }

  before do
    post api_chats_path, params: { chat_thread: { participants: [another_user.id] }}, headers: { 'Authorization' => "#{current_user.access_token}" }
    @chat_thread_id = json['id']
  end

  describe "GET /api/chats" do
    it "works!" do
      get api_chats_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)

      expect(json[0]).to have_key('participants')
      expect(json[0]).to have_key('statuses')
      expect(json[0]).to have_key('newestChat')
      expect(json[0]['participants'].to_s).to match(/#{current_user.name}/)
      expect(json[0]['participants'].to_s).to match(/#{another_user.name}/)
      expect(json[0]['statuses'].to_s).to match(/#{@chat_thread_id}/)
      expect(json[0]['statuses'].to_s).to match(/#{current_user.id}/)
      expect(json[0]['statuses'].to_s).to match(/#{another_user.id}/)
    end
  end

  describe "GET /api/chats/:id" do
    context "when valid input data" do
      before do
        post say_api_chat_path(@chat_thread_id), params: { chat: attributes_for(
          :chat,
          chat_thread_id: @chat_thread_id
        )}, headers: { 'Authorization' => "#{another_user.access_token}" }
        get api_chat_path(@chat_thread_id), headers: { 'Authorization' => "#{current_user.access_token}" }
      end
      
      it "works!" do
        expect(response).to have_http_status(:success)

        expect(json[0]['senderId']).to eq another_user.id
        expect(json[0]['body']).to eq chat.body
      end

      it "updates read_until in ChatStatus" do
        expect(ChatStatus.where(chat_thread_id: @chat_thread_id, user_id: current_user.id).first.read_until).to eq json[0]['id']
      end
    end

    context "when you are not in participants" do
      it "should be error" do
        get api_chat_path(@chat_thread_id), headers: { 'Authorization' => "#{other_user.access_token}" }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "POST /api/chats" do
    context "when valid input data" do
      before do
        post api_chats_path, params: { chat_thread: { participants: [other_user.id] }}, headers: { 'Authorization' => "#{current_user.access_token}" }
      end

      it "works!" do
        expect(response).to have_http_status(:success)
      end

      it "saves the new record in the database" do
        expect(ChatThread.count).to eq 2
        expect(ChatThread.find(json['id']).participants).to eq [current_user.id, other_user.id]
        expect(ChatStatus.count).to eq 4
        expect(ChatStatus.where(chat_thread_id: json['id'], user_id: current_user.id).count).to eq 1
        expect(ChatStatus.where(chat_thread_id: json['id'], user_id: other_user.id).count).to eq 1
      end
    end

    context "when request is the existing thread" do
      it "return existing data" do
        post api_chats_path, params: { chat_thread: { participants: [another_user.id] }}, headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        
        expect(json).to have_key('participants')
        expect(json).to have_key('statuses')
        expect(json).to have_key('newestChat')
        expect(json['participants'].to_s).to match(/#{current_user.name}/)
        expect(json['participants'].to_s).to match(/#{another_user.name}/)
        expect(json['statuses'].to_s).to match(/#{@chat_thread_id}/)
        expect(json['statuses'].to_s).to match(/#{current_user.id}/)
        expect(json['statuses'].to_s).to match(/#{another_user.id}/)
      end
    end
  end

  describe "POST /api/chats/:id/say" do
    context "when valid input data" do
      before do
        post say_api_chat_path(@chat_thread_id), params: { chat: attributes_for(
          :chat,
          chat_thread_id: @chat_thread_id
        )}, headers: { 'Authorization' => "#{current_user.access_token}" }
      end

      it "works!" do
        expect(response).to have_http_status(:success)
        expect(json['senderId']).to eq current_user.id
        expect(json['body']).to eq chat.body
      end

      it "saves the new record in the database" do
        expect(Chat.count).to eq 1
        expect(Chat.find(json['id']).body).to eq chat.body
      end

      it "updates newest_chat_id in ChatThread" do
        expect(ChatThread.find(@chat_thread_id).newest_chat_id).to eq json['id']
      end

      it "updates read_until in ChatStatus" do
        expect(ChatStatus.where(chat_thread_id: @chat_thread_id, user_id: current_user.id).first.read_until).to eq json['id']
      end

      it "updates has_unread in ChatStatus" do
        # 本人はfalseである
        expect(ChatStatus.where(chat_thread_id: @chat_thread_id, user_id: current_user.id).first.has_unread).to eq false
        # 対話相手はtrueである
        expect(ChatStatus.where(chat_thread_id: @chat_thread_id, user_id: another_user.id).first.has_unread).to eq true
      end
    end

    context "when you are not in participants" do
      it "should be error" do
        post say_api_chat_path(1), params: { chat: attributes_for(
          :chat,
          chat_thread_id: @chat_thread_id
        )}, headers: { 'Authorization' => "#{other_user.access_token}" }
        expect(response).to have_http_status(:forbidden)
        expect(Chat.count).to eq 0
      end
    end
  end
end
