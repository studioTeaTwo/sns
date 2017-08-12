class Api::Users::FollowersController < ApplicationController

  def index
    @user  = User.find(params[:id])
    @users = @user.followers
    render json: @users, each_serializer: Rest::UserSerializer
  end

end
