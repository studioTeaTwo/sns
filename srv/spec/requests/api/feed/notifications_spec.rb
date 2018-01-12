require 'rails_helper'

RSpec.describe "Api::Feed::Notifications", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }
  let(:chat) { create(:chat, {sender_id: current_user.id}) }
  # 以下!をつける
  let!(:personal_assistant) { create(:personal_assistant, { user_id: current_user.id }) }

  describe "GET /api/feed/notifications" do

    it "works!" do
      get api_feed_notifications_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json.length).to eq(1)

      expect(json[0]['type']).to eq('DailyLog')
      expect(json[0]['linkId']).to eq('atopic')
      expect(json[0]['userId']).to eq(Constants::PERSONAL_ASSISTANT[:id])
      expect(json[0]['name']).to eq(Constants::PERSONAL_ASSISTANT[:name])
      # TODO: ナビキャラのemailアドレス
      user = User.find(Constants::PERSONAL_ASSISTANT[:id])
      expect(json[0]['avatarUrl']).to eq("https://secure.gravatar.com/avatar/#{Digest::MD5::hexdigest(user.email.downcase)}?s=25")
      expect(json[0]['description']).to eq('アトピーの治療日記を書こう！')
    end

    context "when you have unread chat thread" do
      before do
        post api_chats_path, params: { chat_thread: { participants: [another_user.id] }}, headers: { 'Authorization' => "#{current_user.access_token}" }
        @chat_thread_id = json['id']
        post say_api_chat_path(@chat_thread_id), params: { chat: attributes_for(
          :chat,
          chat_thread_id: @chat_thread_id
        )}, headers: { 'Authorization' => "#{another_user.access_token}" }
      end

      it "should contain notification of chat" do
        get api_feed_notifications_path, headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(2)

        expect(json[1]['type']).to eq('Chat')
        expect(json[1]['linkId']).to eq(@chat_thread_id.to_s)
        expect(json[1]['userId']).to eq(another_user.id)
        expect(json[1]['name']).to eq(another_user.name)
        expect(json[1]['avatarUrl']).to eq("https://secure.gravatar.com/avatar/#{Digest::MD5::hexdigest(another_user.email.downcase)}?s=25")
        expect(json[1]['description']).to eq('チャットが届いているよ！')
      end
    end

    context "when you have followed notification" do

      it "should contain notification of followed" do
        post api_relationships_path(another_user), params: { relationship: {followed_id: current_user.id} }, headers: { 'Authorization' => "#{another_user.access_token}" }
        get api_feed_notifications_path, headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(2)

        expect(json[1]['type']).to eq('Followed')
        expect(json[1]['linkId']).to eq(another_user.id.to_s)
        expect(json[1]['userId']).to eq(another_user.id)
        expect(json[1]['name']).to eq(another_user.name)
        expect(json[1]['avatarUrl']).to eq("https://secure.gravatar.com/avatar/#{Digest::MD5::hexdigest(another_user.email.downcase)}?s=25")
        expect(json[1]['description']).to eq("#{another_user.name}さんにフォローされたよ！")
      end
    end
    
  end
end