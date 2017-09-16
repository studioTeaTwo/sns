require 'rails_helper'

RSpec.describe "Api::Search::IgeRanks", type: :request do
  let(:current_user) { create(:user) }
  # 以下!をつける
  let!(:view_user) { create(:another_user) }
  let!(:new_ige) { create(:new_ige, { user_id: view_user.id}) }
  let!(:existing_ige) { create(:existing_ige, { user_id: view_user.id}) }

  describe "GET /api/search/ige_ranks" do

    context "when initial" do
      it "works!" do
        get api_search_ige_ranks_path, params: { keyword: :initial } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(1)
        expect(json.to_s).to match(/#{view_user.name}/)

        expect(json[0]).not_to have_key('iges')
        expect(json[0]).not_to have_key('microposts')
      end
    end

    context "when user input search_key" do
      it "works!" do
        get api_search_ige_ranks_path, params: { keyword: { from_ige: 101, to_ige: 200} } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.length).to eq(1)

        expect(json[0]['email']).to eq(view_user.email)
        expect(json[0]['avatarUrl']).to eq('https://secure.gravatar.com/avatar/66be054e58f234aa64b5af7f0159a74d?s=50')
        expect(json[0]['latestIge']).to be_between(101, 200)
        expect(json[0]['positiveAllergenGroups']).to include('allergenGroupYasai')

        expect(json[0]).not_to have_key('iges')
        expect(json[0]).not_to have_key('microposts')
      end
    end

    context "without search_key" do
      it "can't work" do
        get api_search_ige_ranks_path, params: { keyword: {} } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:bad_request)
      end
    end

  end
end
