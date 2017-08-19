require 'rails_helper'

RSpec.describe "Api::Users::Profiles", type: :request do
  let(:current_user) { create(:user) }
  let(:view_user) { create(:another_user) }
  # 以下!をつける
  let!(:new_micropost) { create(:new_micropost, { user_id: view_user.id}) }
  let!(:existing_micropost) { create(:existing_micropost, { user_id: view_user.id}) }
  let!(:new_ige) { create(:new_ige, { user_id: view_user.id}) }
  let!(:existing_ige) { create(:existing_ige, { user_id: view_user.id}) }

  describe "GET /api/profiles/:id" do
    it "works!" do
      get api_profile_path(view_user), headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      
      expect(json['email']).to eq(view_user.email)
      expect(json['avatarUrl']).to eq('https://secure.gravatar.com/avatar/66be054e58f234aa64b5af7f0159a74d?s=50')
      expect(json['latestIge']).to eq(existing_ige.ige_value)
      expect(json['positiveAllergenGroup']).to include('allergen_group_yasai')

      expect(json['iges'].length).to eq(2)
      expect(json['iges'][0]).to have_key('allergenRattClass')
      expect(json['iges'].to_s).to match(/#{new_ige.test_date.to_s}/)

      expect(json['microposts'].length).to eq(2)
      expect(json['microposts'][0]).to have_key('content')
      expect(json['microposts'].to_s).to match(/#{new_micropost.content}/)
    end
  end
end
