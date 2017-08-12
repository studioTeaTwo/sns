require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do
  let(:reset_user) { create(:reset_user) }

  describe "GET /password_resets/new" do
    it "works!" do
      get new_password_reset_path
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /password_reset/:id/edit" do
    it "works!" do
      get edit_password_reset_path('resettoken'), params: { email: reset_user.email }
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /password_resets/" do
    it "create email" do
      post password_resets_path, params: { password_reset: { email: reset_user.email.downcase} }
      # TODO: メールのテストを追加
      expect(response).to have_http_status(302)
    end

    it "not works with wrong email" do
      post password_resets_path, params: { password_reset: { email: ''} }
      expect(response).to have_http_status(200)
    end
  end

  describe "PUT /password_reset/:id" do
    it "changes" do
      put password_reset_path('resettoken'), params: { user: { password: 'test6char', password_confirmation: 'test6char' }, email: reset_user.email }
      expect(User.find(reset_user.id).authenticated?(:password, 'test6char')).to eq true
      expect(User.find(reset_user.id).reset_digest).to eq nil
      expect(response).to have_http_status(302)
    end

    it "not works without password" do
      put password_reset_path('resettoken'), params: { user: { password: '' }, email: reset_user.email }
      expect(response).to have_http_status(200)
    end

    it "not works with wrong password" do
      put password_reset_path('resettoken'), params: { user: { password: '1' }, email: reset_user.email }
      expect(response).to have_http_status(200)
    end
  end
end
