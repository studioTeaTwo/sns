require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/login" do
    it "return success status" do
      post api_login_path, params: { session: {email: user.email, password: user.password} }
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq(user.email)
      expect(json['accessToken'].length).to be > 0
    end
  end
end
