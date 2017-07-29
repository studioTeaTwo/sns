require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:current_user) { create(:user) }
  let(:admin_user) { create(:admin_user) }
  # count系テストのために!をつける
  let!(:another_user) { create(:another_user) }

  before :each do
    post login_url, params: { session: { email: current_user.email, password: 'test'} }
  end

  describe "GET /home" do
    it "works!" do
      get '/home'
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /user/:id" do
    it "works!" do
      get user_path(current_user)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /user/:id/following" do
    it "works!" do
      get following_user_path(another_user)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /user/:id/followers" do
    it "works!" do
      get followers_user_path(another_user)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /users/new" do
    it "works!" do
      get new_user_path
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /users/:id/edit" do
    it "works!" do
      get edit_user_path(current_user)
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /users/" do
    it "saves the new record in the database" do
      post users_path, params: { user: { email: 'new@sample.com' }}
      # TODO: メールのテストを追加
    end
  end

  describe "PUT /user/:id" do
    before do
      put user_path(current_user), params: { user: attributes_for(
        :user,
        email: 'update@sample.com'
      )}
      current_user.reload
    end

    it "changes" do
      expect(current_user.email).to eq 'update@sample.com'
    end
  end

  describe "DELETE /user/:id" do

    context "login as admin" do
      it "deletes" do
        post login_url, params: { session: { email: admin_user.email, password: 'test'} }
        expect{
          delete user_path(another_user)
        }.to change(User,:count).by(-1)
      end
    end

    it "can't delete without admin privilege" do
      expect{
        delete user_path(current_user)
      }.to change(User,:count).by(0)
    end
  end
end
