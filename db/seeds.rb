# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'as-duration'

User.create!(name:  "allergy.blue",
             email: "allergy.blue@gmail.com",
             password:              "allergy",
             password_confirmation: "allergy",
             admin: true)
10.times do |n|
  test_date = Faker::Time.between(10.years.ago, Date.today, :day)
  Ige.create!(user_id: 1,
              test_date: test_date,
              test_category: Random.rand(0 .. 17),
              ige_value: Random.rand(10 .. 3000),
              ige_unit: 0)
end

#User.create!(name:  "Example User",
#             email: "example@railstutorial.org",
#             password:              "foobar",
#             password_confirmation: "foobar",
#             admin: true)

# モブキャラ
99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  test_date = Faker::Time.between(10.years.ago, Date.today, :day)
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password)
  Ige.create!(user_id: n+1,
              test_date: test_date,
              test_category: Random.rand(0 .. 17),
              ige_value: Random.rand(10 .. 3000),
              ige_unit: 0)
end

# マイクロポスト           
users = User.order(:created_at).take(6)
50.times do
  content = Faker::Lorem.sentence(5)
  users.each { |user| user.microposts.create!(content: content) }
end

# リレーションシップ
users = User.all
user  = users.first
following = users[2..50]
followers = users[3..40]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
