# @tag Users
class Api::Users::UsersController < ApplicationController 
  skip_before_action :logged_in_user, only: [:create, :verify_email]
  before_action :correct_user, only: :update
  before_action :admin_user, only: :destroy

  # Returns a user
  #
  # @response_status 200
  # @response_class Rest::UserSerializer
  def show
    @user = User.find(params[:id])
    render json: @user, serializer: Rest::UserSerializer
  end

  # Creates a user
  #
  # @name UserRequestBody
  # @body_parameter [Params::User] user
  # @response_status 200
  # @response_class Rest::UserSerializer
  def create
    @user = User.new
    updateUser
    @personal_assistant = @user.build_personal_assistant
    createSymptoms
    ActiveRecord::Base.transaction do
      @user.save!
      @personal_assistant.save!
      createChatThread(@user)
    end
    render json: @user, serializer: Rest::UserSerializer, sort: :session
  rescue
    puts @user.errors.full_messages
    render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
  end

  # Updates a user
  #
  # @name UserRequestBody
  # @body_parameter [Params::User] user
  # @response_status 200
  # @response_class Rest::UserSerializer
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user, serializer: Rest::UserSerializer
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Verifies a email
  #
  # @name EmailVerifyRequestBody
  # @body_parameter [string] email
  # @response_status 200
  def verify_email
    if (User.where("email = ?" ,user_params[:email]).count == 0)
      render json: {}, status: :ok
    else
      head :bad_request
    end
  end

  # Destroys a user
  #
  # @response_status 200
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
                                      :atopic,
                                      :asthma,
                                      :rhinitis,
                                      :pollen,
                                      :gastroenteritis,
                                      :conjunctivitis,
                                      :symptoms => [],
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

    def updateUser
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
            @personal_assistant.daily_atopic = true
          when :asthma then
            @user.asthma = true
            @personal_assistant.daily_asthma = true
          when :rhinitis then
            @user.rhinitis = true
            @personal_assistant.daily_rhinitis = true
          when :pollen then
            @user.pollen = true
            @personal_assistant.daily_pollen = true
          when :gastroenteritis then
            @user.gastroenteritis = true
            @personal_assistant.daily_gastroenteritis = true
          when :conjunctivitis then
            @user.conjunctivitis = true
            @personal_assistant.daily_conjunctivitis = true
          end
        end
      end
    end

    def createChatThread(user)
      @chat_thread = user.chat_threads.build({participants: [user.id, Constants::PERSONAL_ASSISTANT[:id]]})
      ActiveRecord::Base.transaction do
        @chat_thread.save!
        ChatStatus.create(chat_thread_id: @chat_thread.id, user_id: user.id)
        ChatStatus.create(chat_thread_id: @chat_thread.id, user_id: Constants::PERSONAL_ASSISTANT[:id])
      end
    end
end
