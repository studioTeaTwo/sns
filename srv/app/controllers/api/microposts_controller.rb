class Api::MicropostsController < ApplicationController
  before_action :correct_user, only: :destroy

  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      render json: @micropost, status: :created, serializer: Rest::MicropostSerializer
    else
      render json: @micropost.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @micropost.destroy
  end

  private

    def micropost_params
      params.require(:micropost).permit(:content, :picture)
    end

    def correct_user
      @micropost = current_user.microposts.find_by(:id => params[:id])
      render json: { error: 'forbidden' }, status: :forbidden if @micropost.nil?
    end
    
end
