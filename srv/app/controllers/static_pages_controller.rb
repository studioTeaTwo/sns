class StaticPagesController < ApplicationController
  skip_before_action :logged_in_user

  def index
    render file: 'public/index.html'
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
