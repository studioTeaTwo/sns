# @tag Users
class Api::Users::FollowingsController < ApplicationController

  # Returns the list of followings
  #
  # @response_status 200
  # @response_class Array<Rest::UserSerializer>
  def index
    @user  = User.find(params[:id])
    @users = @user.followings
    render json: @users, each_serializer: Rest::UserSerializer
  end

end
