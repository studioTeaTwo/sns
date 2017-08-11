class Api::Users::ProfilesController < ApplicationController

  def show
    @user = User.find(params[:id])
    render json: @user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer, type: :profile
  end

end
