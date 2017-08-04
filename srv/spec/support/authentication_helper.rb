module AuthenticationHelper
  def login(user)
    sign_in user
  end
end