class StaticPagesController < ApplicationController

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
