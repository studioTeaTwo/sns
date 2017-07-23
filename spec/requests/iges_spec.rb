require 'rails_helper'

RSpec.describe "Iges", type: :request do
  let(:current_user) { create(:user) }
  let!(:existing_ige) { create(:existing_ige, { user_id: current_user.id}) }

  before :each do
    post login_url, params: { session: { email: current_user.email, password: 'test'} }
  end

  describe "GET /iges" do
    it "works! (now write some real specs)" do
      get iges_path
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /iges/new" do
    it "works! (now write some real specs)" do
      get new_ige_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /iges/create" do
    before do
      expect(Ige.count).to eq 1
      post iges_path, params: { ige: attributes_for(:new_ige) }
    end

    it "saves the new record in the database" do
      expect(Ige.count).to eq 2
    end

    it "judge allergen as positive reaction" do
      expect(Ige.last.allergen_group_doubutsu).to eq true
    end

    it "judge allergen as negative reaction" do
      expect(Ige.last.allergen_group_inekakafun).to eq false
    end

    it "has one :latest_test_result in the database" do
      expect(Ige.where(:latest_test_result => true).count).to eq 1
    end
  end

  describe "GET /iges/:id/show" do
    it "works! (now write some real specs)" do
      get ige_path(existing_ige)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /iges/:id/edit" do
    it "works! (now write some real specs)" do
      get edit_ige_path(existing_ige)
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /iges/:id/quote" do
    it "works! (now write some real specs)" do
      get edit_ige_path(existing_ige)
      expect(response).to have_http_status(200)
    end
  end

  describe "PUT /iges/:id" do
    it "changes" do
      put ige_path(existing_ige), params: { ige: attributes_for(:existing_ige, ige_value: 300) }
      existing_ige.reload
      expect(existing_ige.ige_value).to eq 300
    end
  end

  describe "DELETE /iges/:id" do
    it "deletes" do
      expect{
        delete ige_path(existing_ige)
      }.to change(Ige,:count).by(-1)
    end
  end
end
