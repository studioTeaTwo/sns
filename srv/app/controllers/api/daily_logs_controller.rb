# @tag DailyLogs
class Api::DailyLogsController < ApplicationController
  before_action :correct_user, only: [:update, :destroy]
  
  # Returns the list of daily_logs
  #
  # @response_status 200
  # @response_class Array<Rest::DailyLogSerializer>
  def index
    @daily_logs = current_user.daily_logs.order("updated_at DESC")
    render json: @daily_logs, each_serializer: Rest::DailyLogSerializer
  end

  # Returns a daily_log
  #
  # @response_status 200
  # @response_class Rest::DailyLogSerializer
  def show
    @daily_log = DailyLog.find(params[:id]);
    render json: @daily_log, serializer: Rest::DailyLogSerializer
  end

  # Creates a daily_log
  #
  # @name DailyLogRequestBody
  # @body_parameter [Params::DailyLog] daily_log
  # @response_status 200
  # @response_class Rest::DailyLogSerializer
  def create
    @daily_log = current_user.daily_logs.build(daily_log_params)
    symptom = { 'daily_' + daily_log_params[:symptom] => true }
    ActiveRecord::Base.transaction do
      @daily_log.save!
      current_user.personal_assistant.update_attributes(symptom)
    end
    render json: @daily_log, status: :created, serializer: Rest::DailyLogSerializer
  rescue => e
    render json: { error: @daily_log.errors.full_messages }, status: :unprocessable_entity
  end

  # Updates a daily_log
  #
  # @name DailyLogRequestBody
  # @body_parameter [Params::DailyLog] daily_log
  # @response_status 200
  # @response_class Rest::DailyLogSerializer
  def update
    if @daily_log.update_attributes(daily_log_params)
      render json: @daily_log, serializer: Rest::DailyLogSerializer
    else
      render json: { error: @daily_log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Destroys a daily_log
  #
  # @response_status 200
  def destroy
    if !@daily_log.nil?
      @daily_log.destroy
      head :ok
    else
      render json: { error: 'not_found' }, status: :not_found
    end
  end

  private

    def daily_log_params
      params.fetch(:daily_log, {}).permit(
                                          :id,
                                          :date,
                                          :symptom,
                                          :health,
                                          :health_memo,
                                          :medicina,
                                          :medicina_memo,
                                          :photograph_memo,
                                          :photograph => []
                                         )
    end

    def correct_user
      @daily_log = current_user.daily_logs.find_by(:id => params[:id])
      render json: { error: 'forbidden' }, status: :forbidden if @daily_log.nil?
    end
end
