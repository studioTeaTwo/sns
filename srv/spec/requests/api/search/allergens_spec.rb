require 'rails_helper'

RSpec.describe "Api::Search::Allergens", type: :request do
  let(:current_user) { create(:user) }
  # 以下!をつける
  let!(:view_user) { create(:another_user) }
  let!(:allergen_user) { create(:allergen_user) }
  let!(:new_ige) { create(:new_ige, { user_id: view_user.id}) }
  let!(:existing_ige) { create(:existing_ige, { user_id: view_user.id}) }
  let!(:yasai_ige) { create(:yasai_ige, { user_id: allergen_user.id}) }

  describe "GET /api/search/allergens" do

    context "when initial" do
      it "works!" do
        get api_search_allergens_path, params: { keyword: :initial } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(2)
        expect(json.to_s).to match(/#{view_user.name}/)
        expect(json.to_s).to match(/#{allergen_user.name}/)

        expect(json[0]).not_to have_key('iges')
        expect(json[0]).not_to have_key('microposts')
      end
    end

    context "when user input search_key" do
      it "works!" do
        get api_search_allergens_path, params: { keyword: :allergenGroupKomugi } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(1)

        expect(json[0]['email']).to eq(allergen_user.email)
        expect(json[0]['allergenGroupKomugi']).to eq true

        expect(json[0]).not_to have_key('iges')
        expect(json[0]).not_to have_key('microposts')
      end
    end

    context "without search_key" do
      it "can't work" do
        get api_search_allergens_path, params: { keyword: {} } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:bad_request)
      end
    end
    
  end
end
