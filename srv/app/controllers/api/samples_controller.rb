class Api::SamplesController < ApplicationController
  before_action :set_api_sample, only: [:show, :update, :destroy]

  # GET /api/samples
  # GET /api/samples.json
  def index
    @api_samples = Api::Sample.all
  end

  # GET /api/samples/1
  # GET /api/samples/1.json
  def show
  end

  # POST /api/samples
  # POST /api/samples.json
  def create
    @api_sample = Api::Sample.new(api_sample_params)

    if @api_sample.save
      render :show, status: :created, location: @api_sample
    else
      render json: @api_sample.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/samples/1
  # PATCH/PUT /api/samples/1.json
  def update
    if @api_sample.update(api_sample_params)
      render :show, status: :ok, location: @api_sample
    else
      render json: @api_sample.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/samples/1
  # DELETE /api/samples/1.json
  def destroy
    @api_sample.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_sample
      @api_sample = Api::Sample.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def api_sample_params
      params.fetch(:api_sample, {})
    end
end
