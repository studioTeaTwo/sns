class StaticPagesController < ApplicationController
  skip_before_action :logged_in_user

  def index
    render file: 'public/index.html'
  end

  def spa_forward
    uri = URI('/')
    uri.query = { url: request.original_fullpath}.to_param
    redirect_to uri.to_s
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
