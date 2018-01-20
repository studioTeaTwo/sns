# @tag Users
class Api::Users::UsersController < ApplicationController 
  skip_before_action :logged_in_user, only: [:create, :verify_email]
  before_action :correct_user, only: :update
  before_action :admin_user, only: [:index, :destroy]

  # Returns the list of users
  #
  # @response_status 200
  # @response_class Array<Rest::UserSerializer>
  def index
    @users = User.all.order("updated_at DESC")
    render json: @users, each_serializer: Rest::UserSerializer
  end

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
      record_experience(@user)
    end
    render json: @user, serializer: Rest::UserSerializer, sort: :session
  rescue => e
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
    main_params, password_params = divide_user_params
    ActiveRecord::Base.transaction do
      if password_params.present?
        if current_user.update_with_password(password_params)
          # パスワードを変更するとログアウトしてしまうので、再ログインが必要
          bypass_sign_in(current_user)
        else
          raise StandardError.new
        end
      end
      if @user.update_attributes(main_params)
        render json: @user, serializer: Rest::UserSerializer
      else
        raise StandardError.new
      end
    end
  rescue => e
    puts e
    render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
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
                                      :current_password,
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

    def divide_user_params
      main_params = {}
      password_params = {}
      if user_params.has_key? :password
        password_params[:password] = user_params[:password]
        password_params[:password_confirmation] = user_params[:password_confirmation]
        password_params[:current_password] = user_params[:current_password]

        main_params = user_params.select {|key, val| key != 'password' && key != 'password_confirmation' && key != 'current_password'}
      else
        main_params = user_params
      end
      return main_params, password_params
    end

    def record_experience(user)
      user.create_experience(user_id: user.id)
    end
end
