class StaticPagesController < ApplicationController
  skip_before_action :logged_in_user

  def index
    render file: 'public/index.html'
  end

  def spa_forward
    if request.original_fullpath =~ /^\/(home|chat|life-log|user|search|auth|contact)(|\/.*)$/
      uri = URI('/')
      uri.query = { url: request.original_fullpath}.to_param
      redirect_to uri.to_s
    else
      redirect_to root_url
    end  
  end

  def help
  end
  
  def about
  end
  
  def contact
  end
end
