# @tag Users
class Api::Users::ProfilesController < ApplicationController

  # Returns a profile
  #
  # @response_status 200
  # @response_class Rest::ProfileSerializer
  def show
    @user = User.find(params[:id])
    render json: @user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer, sort: :profile
  end

end
