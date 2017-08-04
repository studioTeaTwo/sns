require 'rails_helper'

RSpec.describe "Api::Users", type: :request do
  let(:current_user) { create(:user) }

  describe "GET /user/:id" do
    it "works!" do
      get api_user_path(current_user), headers: { 'Authorization' => '1:hTDRTjL5m2Zpz6ieMVGs' }
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq('sample@sample.com')
    end
  end

  describe "POST /api/users" do
    it 'return success status' do
      post api_users_path, params: { user: { email: 'sample@sample.com', password: 'testtest' } }
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq('sample@sample.com') 
    end
  end

  describe "PUT /user/:id" do
    before do
      put api_user_path(current_user), params: { user: attributes_for(
        :user,
        email: 'update@sample.com'
      )},
      headers: { 'Authorization' => '1:hTDRTjL5m2Zpz6ieMVGs' }
    end

    it "changes" do
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq('update@sample.com')
    end
  end

end
