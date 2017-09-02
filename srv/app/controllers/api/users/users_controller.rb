class Api::Users::UsersController < ApplicationController 
  skip_before_action :logged_in_user, only: [:create]
  before_action :correct_user, only: :update
  before_action :admin_user, only: :destroy

  def show
    @user = User.find(params[:id])
    render json: @user, serializer: Rest::UserSerializer
  end

  def create
    @user = User.new
    createUser
    @personal_assistant = @user.build_personal_assistant
    createSymptoms
    ActiveRecord::Base.transaction do
      @user.save!
      @personal_assistant.save!
    end
    render json: @user, serializer: Rest::SessionSerializer
  rescue
    puts @user.errors.full_messages
    render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
  end

  def update
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
                                      :self_introduction,
                                      :classification,
                                      :symptoms => []
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

    def createUser
      @user.name = user_params[:name]
      @user.email = user_params[:email]
      @user.password = user_params[:password]
      @user.classification = user_params[:classification]
    end

    def createSymptoms
      if (user_params[:classification] == 1 || 2)
        user_params[:symptoms].each do |symptom|
          case symptom.to_sym
          when :atopic then
            @user.atopic = true
            @personal_assistant.diary_atopic = true
          when :asthma then
            @user.asthma = true
            @personal_assistant.diary_asthma = true
          when :rhinitis then
            @user.rhinitis = true
            @personal_assistant.diary_rhinitis = true
          when :pollen then
            @user.pollen = true
            @personal_assistant.diary_pollen = true
          when :gastroenteritis then
            @user.gastroenteritis = true
            @personal_assistant.diary_gastroenteritis = true
          when :conjunctivitis then
            @user.conjunctivitis = true
            @personal_assistant.diary_conjunctivitis = true
          end
        end
      end
    end
end
