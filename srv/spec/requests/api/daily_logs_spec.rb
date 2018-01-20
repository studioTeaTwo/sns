require 'rails_helper'

RSpec.describe "Api::DailyLogs", type: :request do
  let(:current_user) { create(:user) }
  let(:another_user) { create(:another_user) }
  let(:new_daily_log) { create(:daily_log, { user_id: current_user.id}) }
  # count系テストのために!をつける
  let!(:existing_daily_log) { create(:daily_log, { user_id: current_user.id}) }
  let!(:personal_assistant) { create(:personal_assistant, { user_id: current_user.id}) }

  describe "GET /api/daily_logs" do
    it "works!" do
      get api_daily_logs_path, headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json[0]['symptom']).to eq(existing_daily_log.symptom)
    end
  end

  describe "GET /api/daily_logs/:id" do
    it "works!" do
      get api_daily_log_path(existing_daily_log), headers: { 'Authorization' => "#{current_user.access_token}" }
      expect(response).to have_http_status(:success)
      expect(json['symptom']).to eq(existing_daily_log.symptom)
    end
  end

  describe "POST /api/daily_logs" do
    before do
      expect(DailyLog.count).to eq 1
      expect(PersonalAssistant.where(:user_id => current_user.id).first.daily_atopic).to eq true
      post api_daily_logs_path, params: { daily_log: attributes_for(:daily_log) }, headers: { 'Authorization' => "#{current_user.access_token}" }
    end

    it "works!" do
      expect(response).to have_http_status(:created)
      expect(json['symptom']).to eq(new_daily_log.symptom)
    end

    it "saves the new record in the database" do
      expect(DailyLog.count).to eq 2
      expect(Experience.count).to eq 1
      expect(Experience.first.activity_type).to eq 'DailyLog'
    end

    it "completed today's check" do
      expect(PersonalAssistant.where(:user_id => current_user.id).first.daily_atopic).to eq false
    end
  end

  describe "PUT /api/daily_logs/:id" do

    context "when current user is owner" do

      before do
        put api_daily_log_path(existing_daily_log), params: { daily_log: attributes_for(
          :daily_log, 
          health_memo: 'ちょっと痒くなってきた'
        )},
        headers: { 'Authorization' => "#{current_user.access_token}" }
        existing_daily_log.reload
      end

      it "works!" do
        expect(response).to have_http_status(:success)
        expect(json['symptom']).to eq(existing_daily_log.symptom)
      end

      it "changes" do
        expect(existing_daily_log.health_memo).to eq 'ちょっと痒くなってきた'
      end

      it "completed today's check" do
        expect(PersonalAssistant.where(:user_id => current_user.id).first.daily_asthma).to eq false
      end
    end

    context "when other user is owner" do
      it "can't change" do
        put api_daily_log_path(existing_daily_log), params: { daily_log: attributes_for(
          :daily_log, 
          health_memo: 'ちょっと痒くなってきた'
        )},
        headers: { 'Authorization' => "#{another_user.access_token}" }
        existing_daily_log.reload
        expect(response).to have_http_status(:forbidden)
        expect(json['symptom']).not_to eq(existing_daily_log.symptom)
      end
    end
  end

  describe "DELETE /api/daily_logs/:id" do
    context "when current user is owner" do
      it "deletes" do
        expect{
          delete api_daily_log_path(existing_daily_log), headers: { 'Authorization' => "#{current_user.access_token}" }
        }.to change(DailyLog, :count).by(-1)
        expect(response).to have_http_status(:success)
      end
    end

    context "when other user is owner" do
      it "can't delete" do
        expect{
          delete api_daily_log_path(existing_daily_log), headers: { 'Authorization' => "#{another_user.access_token}" }
        }.to change(DailyLog, :count).by(0)
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

end
