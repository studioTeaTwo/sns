# @tag Microposts
class Api::MicropostsController < ApplicationController
  before_action :correct_user, only: :destroy

  # Creates a micropost
  #
  # @name MicropostRequestBody
  # @body_parameter [Params::Micropost] micropost
  # @response_status 200
  # @response_class Rest::MicropostSerializer
  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      render json: @micropost, status: :created, serializer: Rest::MicropostSerializer
    else
      render json: @micropost.errors.full_messages, status: :unprocessable_entity
    end
  end

  # Deletes a micropost
  #
  # @response_status 200
  def destroy
    @micropost.destroy
  end

  private

    def micropost_params
      params.fetch(:micropost, {}).permit(:content, :picture)
    end

    def correct_user
      @micropost = current_user.microposts.find_by(:id => params[:id])
      render json: { error: 'forbidden' }, status: :forbidden if @micropost.nil?
    end
    
end
