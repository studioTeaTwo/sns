# @tag Users
class Api::Users::FollowersController < ApplicationController

  # Returns the list of followers
  #
  # @response_status 200
  # @response_class Array<Rest::UserSerializer>
  def index
    user  = User.find(params[:id])
    users = user.followers
    # TODO: follow状況
    render json: users, each_serializer: Rest::UserSerializer
  end

end
