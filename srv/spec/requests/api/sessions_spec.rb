require 'rails_helper'

RSpec.describe "Api::Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/login" do
    it "return success status" do
      post api_login_path, params: { email: user.email, password: user.password }
      expect(response).to have_http_status(200)
    end
  end
end
