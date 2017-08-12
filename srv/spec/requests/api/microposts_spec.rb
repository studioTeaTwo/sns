require 'rails_helper'

RSpec.describe "Api::Microposts", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }
  let(:new_micropost) { create(:new_micropost, { user_id: current_user.id}) }
  # count系テストのために!をつける
  let!(:existing_micropost) { create(:existing_micropost, { user_id: current_user.id}) }

  describe "POST /api/microposts" do
    before do
      expect(Micropost.count).to eq 1
      post api_microposts_path, params: { micropost: attributes_for(:new_micropost) }, headers: { 'Authorization' => "#{current_user.access_token}" }
    end

    it "works!" do
      expect(response).to have_http_status(:created)
      expect(json['content']).to eq(new_micropost.content)
    end

    it "saves the new record in the database" do
      expect(Micropost.count).to eq 2
    end
  end

  describe "DELETE /api/microposts/:id" do
    context "when current user is owner" do
      it "deletes" do
        expect{
          delete api_micropost_path(existing_micropost), headers: { 'Authorization' => "#{current_user.access_token}" }
        }.to change(Micropost,:count).by(-1)
        expect(response).to have_http_status(:success)
      end
    end

    context "when other user is owner" do
      it "deletes" do
        expect{
          delete api_micropost_path(existing_micropost), headers: { 'Authorization' => "#{another_user.access_token}" }
        }.to change(Micropost,:count).by(0)
        expect(response).to have_http_status(:forbidden)
      end
    end

  end
end
