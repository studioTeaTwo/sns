class StaticPagesController < ApplicationController
  def home
    if logged_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
      @latest_ige = Ige.find(current_user.latest_ige_id)
      @iges = current_user.iges.order("test_date DESC").limit(3)
      if current_user.iges.count > 3
        @more = true
      end
      @chart_data_history = current_user.iges.select(:test_date, :ige_value).group(:test_date).sum(:ige_value)
    end
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
