# @tag Users
class Api::Users::ProfilesController < ApplicationController
  skip_before_action :logged_in_user, only: [:index]

  # Returns profile
  #
  # @response_status 200
  # @response_class Rest::ProfileSerializer
  def index
    @user = User.find(params[:id])
    followcheck_if_login
    render json: @user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {sort: :profile, isFollow: @isFollow}
  end

  private

    def followcheck_if_login
      #before_actionでloginをスキップしているのでカレントユーザーを取り直す
      auth_token = request.headers['Authorization']
      if auth_token
        authenticate_with_auth_token(auth_token)
        @isFollow = current_user.following? @user
      end
    end

end
