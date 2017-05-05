class StaticPagesController < ApplicationController
  def home
    if logged_in?
      redirect_to controller: 'users', :action => "home_logined"
    else
      render 'home'
    end
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
