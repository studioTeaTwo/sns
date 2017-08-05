class Api::Users::FollowingsController < ApplicationController

  def index
    @user  = User.find(params[:id])
    @users = @user.followings
    render json: @users, each_serializer: Rest::UserSerializer
  end

end
