require 'rails_helper'

RSpec.describe "AccountActivations", type: :request do
  let(:user) { create(:activate_user) }

  describe "GET /account_activations" do
    before do
      get edit_account_activation_path(user.activation_token, email: user.email)
      #@json = JSON.parse(response.body)
    end

    it 'returns success' do
      expect(response).to redirect_to(user)
    end

    it 'updates :activated to true in the database' do
      expect(User.find(user.id).activated).to eq true
    end

  end
end
