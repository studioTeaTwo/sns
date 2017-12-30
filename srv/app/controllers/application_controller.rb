class ApplicationController < ActionController::API

  before_action :logged_in_user

  respond_to :json

  protected

    # ユーザーのログインを確認する
    # Authenticates the user with OAuth2 Resource Owner Password Credentials
    def logged_in_user
      # swaggerをパスする
      return if request.original_fullpath =~ /^\/api_docs\/.*$/

      auth_token = request.headers['Authorization']
      auth_token ? authenticate_with_auth_token(auth_token) : authenticate_error
    end

    # 現在ログイン中のユーザーを返す (いる場合)
    def current_user
      @current_user
    end

    # ユーザーがログインしていればtrue、その他ならfalseを返す
    def logged_in?
      !current_user.nil?
    end

    # 渡されたユーザーがログイン済みユーザーであればtrueを返す
    def current_user?(user)
      user == current_user
    end

    # ユーザーを永続的セッションに記憶する
    def remember(user)
    end

    # 永続的セッションを破棄する
    def forget(user)
    end
    
    # 記憶したURL (もしくはデフォルト値) にリダイレクト
    def redirect_back_or(default)
      redirect_to(session[:forwarding_url] || default)
      session.delete(:forwarding_url)
    end
    
    # アクセスしようとしたURLを覚えておく
    def store_location
      session[:forwarding_url] = request.original_url if request.get?
    end

  private

    def authenticate_with_auth_token auth_token
      unless auth_token.include?(':')
        authenticate_error
        return
      end

      user_id = auth_token.split(':').first
      user = User.find_by(id: user_id)

      if user && Devise.secure_compare(user.access_token, auth_token)
        # User can access
        sign_in user, store: false
        # カレントユーザーとしてインスタンス変数に記憶
        @current_user = user
      else
        authenticate_error
      end
    end

    ##
    # Authentication Failure
    # Renders a 401 error
    def authenticate_error
      render json: { error: 'このコンテンツは会員限定です。ログインしてください。' }, status: 401
    end
end
