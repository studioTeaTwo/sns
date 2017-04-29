class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy, :following, :followers]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  
  def index
    # オススメの検索条件のユーザーを示す
    # とりあえず　1.同じアレルゲン持ち、2.IgEが同ランク程度のユーザー、3.IgE検査がある人からランダムの順に20件作成する
    @users = User.paginate(page: params[:page])
  end

  def search_by_allergen
  end

  def search_result_by_allergen
    @users = User.search_by_allergen(params[:search_key])
  end

  def show
    @user = User.find(params[:id])
    @microposts = @user.microposts.paginate(:page => params[:page])
    @latest_ige = @user.iges.where(:latest_test_result => true)
    @iges = @user.iges.order('test_date DESC').limit(5)
    if @user.iges.count > 5
      @more = true
    end
    @chart_data_history = @user.iges.select(:test_date, :ige_value).group(:test_date).sum(:ige_value)
  end

  def new
    @user = User.new
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to the #{Constants::SITE_TITLE}!"
      redirect_to @user
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
      puts params
      params.require(:user).permit(
                                   :name,
                                   :email,
                                   :password,
                                   :password_confirmation, 
                                   :self_introduction
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
end
