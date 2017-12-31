require 'rails_helper'

RSpec.describe "Api::Feed::Notifications", type: :request do
  let(:current_user) { create(:user) }
  # 以下!をつける
  let!(:personal_assistant) { create(:personal_assistant, { user_id: current_user.id }) }

  describe "GET /api/feed/notifications" do

    it "works!" do
      get api_feed_notifications_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json.length).to eq(1)

      user = User.find(Constants::PERSONAL_ASSISTANT[:id])
      notification = {
        'type' => 'DailyLog',
        'userId' => Constants::PERSONAL_ASSISTANT[:id],
        'name' => Constants::PERSONAL_ASSISTANT[:name],
        'avatarUrl' => "https://secure.gravatar.com/avatar/#{Digest::MD5::hexdigest(user.email.downcase)}?s=20",
        'description' => 'アトピーの治療日記を書こう！'
      }
      expect(json[0]).to eq(notification)

      # チャットの通知パターン
    end
    
  end
end