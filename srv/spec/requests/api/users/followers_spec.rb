require 'rails_helper'

RSpec.describe "Api::Users::Followers", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }

  describe "GET /api/users/:id/followers" do
    before do
      post api_relationships_path(another_user), params: { followed_id: current_user.id }, headers: { 'Authorization' => "#{another_user.access_token}" }
    end

    it "works!" do
      get api_followers_path(current_user), headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json[0]['name']).to eq(another_user.name)
    end
  end
end
