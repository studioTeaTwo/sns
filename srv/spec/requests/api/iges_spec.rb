require 'rails_helper'

RSpec.describe "Api::Iges", type: :request do
  let(:current_user) { create(:user) }
  let(:new_ige) { create(:new_ige, { user_id: current_user.id}) }
  # count系テストのために!をつける
  let!(:existing_ige) { create(:existing_ige, { user_id: current_user.id}) }

  describe "GET /api/iges" do
    it "works!" do
      get api_iges_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json[0]['ige_value']).to eq(existing_ige.ige_value)
    end
  end

  describe "GET /api/ige/:id" do
    it "works!" do
      get api_ige_path(existing_ige), headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json['ige_value']).to eq(existing_ige.ige_value)
    end
  end

  describe "POST /api/iges/create" do
    before do
      expect(Ige.count).to eq 1
      post api_iges_path, params: { ige: attributes_for(:new_ige) }, headers: { 'Authorization' => "#{current_user.access_token}" }
    end

    it "works!" do
      expect(response).to have_http_status(:created)
      expect(json['ige_value']).to eq(new_ige.ige_value)
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

    it "has only one :latest_test_result in the database" do
      expect(Ige.where(:latest_test_result => true).count).to eq 1
    end
  end

  describe "PUT /iges/:id" do
    before do
      put api_ige_path(existing_ige), params: { ige: attributes_for(
        :existing_ige, 
        ige_value: 300,
        allergen_milk_class: 1,
        allergen_konahyouhidani_class: 2
      )},
      headers: { 'Authorization' => "#{current_user.access_token}" }
      existing_ige.reload
    end

    it "works!" do
      expect(response).to have_http_status(:success)
      expect(json['ige_value']).to eq(existing_ige.ige_value)
    end

    it "changes" do
      expect(existing_ige.ige_value).to eq 300
    end

    it "judge allergen as positive reaction" do
      expect(existing_ige.allergen_group_dani).to eq true
    end

    it "judge allergen as negative reaction" do
      expect(existing_ige.allergen_group_nyuuseihin).to eq false
    end

    it "has one :latest_test_result in the database" do
      expect(Ige.where(:latest_test_result => true).count).to eq 1
    end
  end

  describe "DELETE /iges/:id" do
    it "deletes" do
      expect{
        delete api_ige_path(existing_ige), headers: { 'Authorization' => "#{current_user.access_token}" }
      }.to change(Ige,:count).by(-1)
      expect(response).to have_http_status(:success)
    end
  end
end
