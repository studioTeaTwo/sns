class StaticPagesController < ApplicationController
  def home
    if logged_in?
      @iges = current_user.iges.order("test_date DESC").limit(3)
      if current_user.iges.count > 3
        @more = true
      end
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
