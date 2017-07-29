require 'rails_helper'

RSpec.describe "Microposts", type: :request do
  let(:current_user) { create(:user) }
  let!(:existing_micropost) { create(:existing_micropost, { user_id: current_user.id}) }

  before :each do
    post login_url, params: { session: { email: current_user.email, password: 'test'} }
  end

  describe "GET /microposts/new" do
    it "works!" do
      get new_micropost_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /microposts/create" do
    it "saves the new record in the database" do
      expect{
        post microposts_path, params: { micropost: attributes_for(:new_micropost) }
      }.to change(Micropost, :count).by(1)
    end
  end

  describe "DELETE /microposts/:id" do
    it "deletes" do
      expect{
        delete micropost_path(existing_micropost)
      }.to change(Micropost, :count).by(-1)
    end
  end
end
