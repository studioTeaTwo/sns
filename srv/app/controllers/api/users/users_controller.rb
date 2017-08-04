class Api::Users::UsersController < ApplicationController 
  skip_before_action :logged_in_user, only: [:create]

  def show
    @user = User.find(params[:id])
    render json: @user, serializer: Rest::UserSerializer, root: nil
  end

  def create
    @user = User.new user_params
    if @user.save
      render json: @user, serializer: Rest::SessionSerializer, root: nil
    else
      render json: { error: @user.errors }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user, serializer: Rest::UserSerializer, root: nil
    else
      render json: { error: @user.errors }, status: :unprocessable_entity
    end
  end
  
  private

    def user_params
      params.fetch(:user, {}).permit(
                                      :name,
                                      :email,
                                      :password,
                                      :password_confirmation, 
                                      :self_introduction
                                    )
    end
end
