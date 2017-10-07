# @tag Users
class Api::Users::ProfilesController < ApplicationController
  skip_before_action :logged_in_user, only: [:index]

  # Returns profile
  #
  # @response_status 200
  # @response_class Rest::ProfileSerializer
  def index
    @user = User.find(params[:id])
    render json: @user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer, sort: :profile
  end

end
