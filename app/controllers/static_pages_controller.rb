class StaticPagesController < ApplicationController
  def home
    if logged_in?
      @iges = current_user.iges.order("test_date DESC")
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
    end
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
