require 'rails_helper'

RSpec.describe "Api::Feeds", type: :request do
  let(:current_user) { create(:user) }
  let(:other_user) { create(:another_user) }
  let(:existing_daily_log) { create(:daily_log, { user_id: current_user.id}) }
  # 以下!をつける
  let!(:my_experience) { create(:experience, { user: current_user, activity: existing_daily_log}) }
  let!(:other_experience) { create(:experience, { user: other_user, activity: existing_daily_log}) }

  describe "GET /api/feeds" do

    it "works!" do
      post api_relationships_path(current_user), params: { relationship: {followed_id: other_user.id} }, headers: { 'Authorization' => "#{current_user.access_token}" }
      get api_feeds_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      puts response, json, json['mine'].class
      expect(json.length).to eq(2)
      expect(json).to have_key('mine')
      expect(json).to have_key('others')

      expect(json['mine'][0]['activityId']).to eq(my_experience.activity_id)
      expect(json['others'][0]['activityId']).to eq(other_experience.activity_id)
    end
    
  end
end
