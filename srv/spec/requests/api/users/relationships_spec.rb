require 'rails_helper'

RSpec.describe "Api::Users::Relationships", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }

  describe "POST /api/users/:id/relationships" do
    it 'return success status' do
      post api_relationships_path(current_user), params: { relationship: {followed_id: another_user.id} }, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
    end

    it "saves the new record in the database" do
      expect{
        post api_relationships_path(current_user), params: { relationship: {followed_id: another_user.id} }, headers: { 'Authorization' => "#{current_user.access_token}" }
      }.to change(Relationship, :count).by(1)
      expect(Notification.count).to eq 1
    end
  end

  describe "DELETE /api/users/:id/relationship/:id" do
    before(:each) { post api_relationships_path(current_user), params: { relationship: {followed_id: another_user.id} }, headers: { 'Authorization' => "#{current_user.access_token}" } }
    
    it "deletes" do
      expect{
        delete api_relationship_path(current_user, another_user.id), headers: { 'Authorization' => "#{current_user.access_token}" }
      }.to change(Relationship, :count).by(-1)
    end
  end
end
