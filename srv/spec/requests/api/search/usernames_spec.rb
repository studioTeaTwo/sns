require 'rails_helper'

RSpec.describe "Api::Search::Usernames", type: :request do
  let(:current_user) { create(:user) }
  # 以下!をつける
  let!(:view_user) { create(:another_user) }

  describe "GET /api/search/usernames" do
    context "when user input search_key" do
      it "works!" do
        get api_search_usernames_path, params: { search_key: view_user.name[-1] } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:success)
        expect(json.to_s).to match(/#{view_user.name}/)

        expect(json[0]).not_to have_key('iges')
        expect(json[0]).not_to have_key('microposts')
      end
    end

    context "when search_key is empty" do
      it "can't work" do
        get api_search_usernames_path, params: { search_key: {} } , headers: { 'Authorization' => "#{current_user.access_token}" }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

end
