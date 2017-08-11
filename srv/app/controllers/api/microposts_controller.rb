class Api::MicropostsController < ApplicationController

  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      render json: @micropost, status: :created, serializer: Rest::MicropostSerializer
    else
      render json: @micropost.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @micropost = current_user.microposts.find_by(:id => params[:id])
    if !@micropost.nil?
      @micropost.destroy
    else
      render json: @micropost.errors, status: :unprocessable_entity
    end
  end

  private

    def micropost_params
      params.require(:micropost).permit(:content, :picture)
    end
    
end
