FactoryGirl.define do

  activaton_token = SecureRandom.urlsafe_base64

  factory :user do
    name Faker::Name.name
    email 'sample@sample.com'
    password_digest User.digest('test')

    factory :activate_user do
      activated false
      activation_token activaton_token
      activation_digest User.digest(activaton_token)
    end
  end

  factory :another_user, class: User do
    name "Nash"
    email "nash@example.com"
  end
end