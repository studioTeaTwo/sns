class Api::SessionsController < ApplicationController
  skip_before_action :logged_in_user

  def create
    @user = User.find_for_database_authentication(email: params[:email])
    return invalid_email unless @user

    if @user.valid_password?(params[:password])
      sign_in :user, @user
      render json: @user, serializer: Api::SessionSerializer, root: nil
    else
      invalid_password
    end
  end

  private

    def invalid_email
      warden.custom_failure!

      render json: { error: 'invalid_email' }
    end

    def invalid_password
      warden.custom_failure!
      render json: { error: 'invalid_password' }
    end
end
