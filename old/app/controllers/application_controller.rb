class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
  
  private

   # ユーザーのログインを確認する
   def logged_in_user
     unless logged_in?
       store_location
       flash[:danger] = "このコンテンツは会員限定です。ログインしてください。"
       redirect_to login_url
     end
   end
end
