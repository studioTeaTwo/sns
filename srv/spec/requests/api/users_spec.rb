require 'rails_helper'

RSpec.describe "Api::Users", type: :request do

  describe "POST /api/users" do
    it 'return success status' do
      post api_users_path, params: { user: { email: 'sample@sample.com', password: 'testtest' } }
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq('sample@sample.com') 
    end

  end
end
