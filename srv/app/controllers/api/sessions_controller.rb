# @tag Sessions
class Api::SessionsController < ApplicationController
  skip_before_action :logged_in_user

  # Creates a session
  #
  # @name SessionRequestBody
  # @body_parameter [Params::Session] session
  # @response_status 200
  # @response_class Rest::UserSerializer
  def create
    @user = User.find_for_database_authentication(email: session_params[:email])
    return invalid_email unless @user

    if @user.valid_password?(session_params[:password])
      sign_in :user, @user
      render json: @user, serializer: Rest::UserSerializer, sort: :session
    else
      invalid_password
    end
  end

  # Destroys a session
  #
  # @response_status 200
  def destroy
    sign_out current_user
    render json: {}, status: :ok
  end

  private

    def session_params
      params.fetch(:session, {}).permit(:email, :password)
    end

    def invalid_email
      render json: { error: 'invalid_email' }, status: :unauthorized
    end

    def invalid_password
      render json: { error: 'invalid_password' }, status: :unauthorized
    end
end
