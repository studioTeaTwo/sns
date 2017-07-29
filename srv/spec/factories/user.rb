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

    factory :reset_user do
      reset_digest User.digest('resettoken')
      reset_sent_at Time.zone.now
    end
  end

  factory :another_user, class: User do
    name "t2"
    email "t2@example.com"
    password_digest User.digest('test')
    activated true
  end

  factory :admin_user, class: User do
    name "admin"
    email "admin@example.com"
    password_digest User.digest('test')
    activated true
    admin true
  end
end