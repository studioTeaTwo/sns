FactoryGirl.define do

  activaton_token = SecureRandom.urlsafe_base64

  factory :user do
    name Faker::Name.name
    email 'sample@sample.com'
    password 'testtest'
    encrypted_password User.digest('testtest')
    access_token 'hTDRTjL5m2Zpz6ieMVGs'
    #activated true

    classification 1

    factory :password_change_user do
      password 'newpassword'
      password_confirmation 'newpassword'
    end
  end

  factory :another_user, class: User do
    name 't2'
    email 't2@example.com'
    password 'testtest2'
    encrypted_password User.digest('testtest2')
    access_token 'aTDRTjL5m2Zpz6ieMVGs'
    #activated true

    classification 1
  end

  factory :admin_user, class: User do
    name 'admin'
    email 'admin@example.com'
    password 'adminadmin'
    encrypted_password User.digest('test')
    #activated true
    admin true

    classification 1
  end
end