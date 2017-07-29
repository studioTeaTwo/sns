class Api::UsersController < ApplicationController 
  skip_before_action :authenticate_user_from_token, only: [:create]

  def create
    @user = User.new user_params
    if @user.save
      render json: @user, serializer: Api::SessionSerializer, root: nil
    else
      render json: { error: 'user_create_error' }, status: :unprocessable_entity
    end
  end
  
  private

  def user_params
    params.require(:user).permit(
                                  :name,
                                  :email,
                                  :password,
                                  :password_confirmation, 
                                  :self_introduction
                                )
  end
end
