class Api::SessionsController < ApplicationController
  skip_before_action :logged_in_user

  def create
    @user = User.find_for_database_authentication(email: params[:email])
    return invalid_email unless @user

    if @user.valid_password?(params[:password])
      sign_in :user, @user
      render json: @user, serializer: Rest::SessionSerializer
    else
      invalid_password
    end
  end

  private

    def invalid_email
      render json: { error: 'invalid_email' }, status: :unauthorized
    end

    def invalid_password
      render json: { error: 'invalid_password' }, status: :unauthorized
    end
end
