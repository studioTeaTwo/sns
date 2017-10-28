# @tag Users
class Api::Users::FollowingsController < ApplicationController

  # Returns the list of followings
  #
  # @response_status 200
  # @response_class Array<Rest::UserSerializer>
  def index
    user  = User.find(params[:id])
    users = user.followings
    # TODO: follow状況
    render json: users, each_serializer: Rest::UserSerializer
  end

end
