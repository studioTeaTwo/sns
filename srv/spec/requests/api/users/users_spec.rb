require 'rails_helper'

RSpec.describe "Api::Users", type: :request do
  let(:current_user) { create(:user) }
  let(:password_change_user) { create(:password_change_user) }
  let(:another_user) { create(:another_user) }
  let(:admin_user) { create(:admin_user) }

  describe "GET /api/users/:id" do
    it "works!" do
      get api_user_path(another_user), headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq(another_user.email)
    end
  end

  describe "POST /api/users" do
    before do
      post api_users_path, params: { user: {
        email: 'sample@sample.com',
        name: 'テスト太郎',
        password: 'ああああああ',
        classification: 1,
        symptoms: ['atopic']
      } }
    end

    it 'works!' do
      expect(response).to have_http_status(:success)
      expect(json['email']).to eq('sample@sample.com')
      expect(json['accessToken'].length).to be > 0
    end

    it 'saves the new record in the database' do
      expect(User.count).to eq 1
      expect(User.first.name).to eq 'テスト太郎'
      expect(User.first.atopic).to be true
      expect(PersonalAssistant.count).to eq 1
      expect(PersonalAssistant.first.user_id).to eq User.first.id
    end
  end

  describe "PUT /api/users/:id" do
    context "when current user is owner" do
      it "changes" do
        put api_user_path(current_user), params: { user: {
          email: 'update@sample.com'
        }}, headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json['email']).to eq('update@sample.com')
      end
    end

    context "when current user change password" do
      it "changes" do
        put api_user_path(password_change_user), params: { user: attributes_for(
          :password_change_user,
          current_password: 'testtest'
        )}, headers: { 'Authorization' => "#{password_change_user.access_token}" }
        expect(response).to have_http_status(:success)

        post api_login_path, params: { session: {email: password_change_user.email, password: password_change_user.password} }
        expect(response).to have_http_status(:success)
      end
    end

    context "when other user is owner" do
      it "can't change" do
        put api_user_path(current_user), params: { user: attributes_for(
          :user,
          email: 'update@sample.com'
        )},
        headers: { 'Authorization' => "#{another_user.access_token}" }
        expect(response).to have_http_status(:forbidden)
        expect(json['email']).not_to eq('update@sample.com')
      end
    end
  end

  describe "DELETE /api/users/:id/" do
    context "when admin user logs in" do
      it "deletes" do
        expect{
          delete api_user_path(current_user), headers: { 'Authorization' => "#{admin_user.access_token}" }
        }.to change(User, :count).from(0).to(1) # userがhttp request実行で2つ作られるため
        expect(response).to have_http_status(:success)
      end
    end

    context "when general user logs in" do
      it "can't delete" do
        expect{
          delete api_user_path(current_user), headers: { 'Authorization' => "#{another_user.access_token}" }
        }.to change(User, :count).from(0).to(2) # userがhttp request実行で2つ作られるため
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

end
