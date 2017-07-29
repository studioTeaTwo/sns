require 'rails_helper'

RSpec.describe "Relationships", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }

  before :each do
    post login_url, params: { session: { email: current_user.email, password: 'test'} }
  end

  describe "POST /relationships/new" do
    it "saves the new record in the database" do
      expect{
        post relationships_path, params: { followed_id: another_user.id }
      }.to change(Relationship, :count).by(1)
    end
  end

  describe "DELETE /relationships/:id" do
    it "deletes" do
      current_user.follow(another_user)
      expect{
        delete relationship_path(Relationship.first.id)
      }.to change(Relationship, :count).by(-1)
    end
  end
end
