class UsersController < ApplicationController
  before_action :logged_in_user, only: [:home_logined, :index, :edit, :update, :destroy, :following, :followers]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  
  def index
    # オススメの検索条件のユーザーを示す
    # 1.同じアレルゲン持ち、2.IgEが同ランク程度のユーザー、3.IgE検査がある人からランダムの順に20件作成する
    # TODO: 
    search_by_ige
  end

  def search_by_ige
    @tabs = 'search_by_ige'
    @form = UserSearchForm.new
    # デフォルトで表示しておく人たちを作成する
    # ログインユーザーのIgE値に近い人を、10人になるまで再帰検索する
    @latest_ige = current_user.iges.where(:latest_test_result => true)
    if @latest_ige[0].present?
      ige_value = @latest_ige[0].ige_value
      range = 10
      @users = User.search_by_ige(ige_value - range, ige_value + range)
      # IgE範囲を±10ずつ増やしていく
      while @users.count < 10 do
        range += 10
        @users = User.search_by_ige(ige_value - range, ige_value + range)
      end
    else
      # 適当に10人(検査日付が新しい人から)
      @users = User.search_by_newest
    end
    render 'index'
  end

  def search_result_by_ige
    @form = UserSearchForm.new(user_search_form_params)
    @users = @form.matches
    render 'search_result'
  end

  def search_by_allergen
    @tabs = 'search_by_allergen'
    # デフォルトで表示しておく人たちを作成する
    # ログインユーザーが持っているアレルゲンを、10人になるまで再帰検索する
    @latest_ige = current_user.iges.where(:latest_test_result => true)
    if @latest_ige[0].present?
      # TODO: 保有アレルゲンで10人探す
      @users = User.search_by_newest
    else
      # 適当に10人(検査日付が新しい人から)
      @users = User.search_by_newest
    end
    render 'index'
  end

  def search_result_by_allergen
    @users = User.search_by_allergen(params[:search_key])
    render 'search_result'
  end

  def search_by_name
    @tabs = 'search_by_name'
    @user = User.new
    render 'index'
  end

  def search_result_by_name
    @user = User.find_by_name(user_params[:name])
    get_user_info @user
    @microposts = @user.microposts.paginate(:page => params[:page])
    render 'show'
  end

  def show
    @user = User.find(params[:id])
    get_user_info @user
    @microposts = @user.microposts.paginate(:page => params[:page])
  end

  def home_logined
    @user = current_user
    get_user_info @user
    @feed_items = @user.feed.paginate(page: params[:page])
  end

  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      flash[:success] = "#{Constants::SITE_TITLE}へようこそ!アカウント有効化のためにメールを送ったのでご確認お願いします。"
      redirect_to root_url
    else
      render 'new'
    end
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "プロフィールが更新されました"
      redirect_to @user
    else
      render 'edit'
    end
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "該当ユーザーを削除しました。"
    redirect_to users_url
  end
  
  def following
    @title = "Following"
    @user  = User.find(params[:id])
    @users = @user.following.paginate(:page => params[:page])
    render 'show_follow'
  end

  def followers
    @title = "Followers"
    @user  = User.find(params[:id])
    @users = @user.followers.paginate(:page => params[:page])
    render 'show_follow'
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

    def user_search_form_params
      params.require(:user_search_form).permit(
                                                :from_ige,
                                                :to_ige
                                              )
    end
    
    # beforeアクション
    
    # 正しいユーザーかどうか確認
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
    
    # 管理者かどうか確認
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end

    # 共通メソッド

    def get_user_info(user)
      @latest_ige = user.iges.where(:latest_test_result => true)
      @iges = user.iges.order('test_date DESC').limit(5)
      if user.iges.count > 5
        @more = true
      end
      @chart_data_history = user.iges.select(:test_date, :ige_value).group(:test_date).sum(:ige_value)
    end
end
