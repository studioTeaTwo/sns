class Api::Users::UsersController < ApplicationController 
  skip_before_action :logged_in_user, only: [:create]
  before_action :correct_user, only: :update
  before_action :admin_user, only: :destroy

  def show
    @user = User.find(params[:id])
    render json: @user, serializer: Rest::UserSerializer
  end

  def create
    @user = User.new user_params
    if @user.save
      render json: @user, serializer: Rest::SessionSerializer
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user, serializer: Rest::UserSerializer
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    User.find(params[:id]).destroy
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

    # 正しいユーザーかどうか確認
    def correct_user
      @user = User.find(params[:id])
      render json: { error: 'forbidden' }, status: :forbidden unless current_user?(@user)
    end

    # 管理者かどうか確認
    def admin_user
      render json: { error: 'forbidden' }, status: :forbidden unless current_user.admin?
    end
end
