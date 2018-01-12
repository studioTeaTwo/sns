require 'rails_helper'

RSpec.describe "Api::Feed::Experiences", type: :request do
  let(:current_user) { create(:user) }
  let(:other_user) { create(:another_user) }
  let(:existing_daily_log) { create(:daily_log, { user_id: current_user.id}) }
  # 以下!をつける
  let!(:my_experience) { create(:experience, { user: current_user, activity: existing_daily_log}) }
  let!(:friend_experience) { create(:experience, { user: other_user, activity: existing_daily_log}) }

  describe "GET /api/feed/experiences" do

    it "works!" do
      post api_relationships_path(current_user), params: { relationship: {followed_id: other_user.id} }, headers: { 'Authorization' => "#{current_user.access_token}" }
      get api_feed_experiences_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json.length).to eq(2)

      expect(json['mine'][0]['type']).to eq(my_experience.activity_type)
      expect(json['mine'][0]['userId']).to eq(current_user.id)
      expect(json['mine'][0]['linkId']).to eq(my_experience.activity_id.to_s)

      expect(json['friend'][0]['type']).to eq('Relationship')
      expect(json['friend'][0]['userId']).to eq(other_user.id)
      expect(json['friend'][0]['linkId']).to eq(current_user.id.to_s)

      expect(json['friend'][1]['type']).to eq(friend_experience.activity_type)
      expect(json['friend'][1]['userId']).to eq(other_user.id)
      expect(json['friend'][1]['linkId']).to eq(friend_experience.activity_id.to_s)
    end
    
  end
end
