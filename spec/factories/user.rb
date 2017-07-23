FactoryGirl.define do

  activaton_token = SecureRandom.urlsafe_base64

  factory :user do
    name Faker::Name.name
    email 'sample@sample.com'
    password_digest User.digest('test')
    activated true

    factory :activate_user do
      activated false
      activation_token activaton_token
      activation_digest User.digest(activaton_token)
    end
  end

  factory :another_user, class: User do
    id 2
    name "t2"
    email "t2@example.com"
    password_digest User.digest('test')
  end
end