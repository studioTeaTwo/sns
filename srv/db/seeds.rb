# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ナビキャラ
User.create!( 
  name: Constants::PERSONAL_ASSISTANT[:name],
  email: "allelog.info@gmail.com",
  password: "allergy",
  encrypted_password: User.digest('allergy'),
  rank: 1,
  title_of_honor: 11,
  self_introduction: "よろしくにゃ！",
  admin: true
)
PersonalAssistant.create!(
  user_id: 1
)

# 管理者ユーザー
User.create!( 
  name: "allelog",
  email: "t2.tide@gmail.com",
  password: "allergy",
  encrypted_password: User.digest('allergy'),
  rank: 1,
  title_of_honor: 11,
  self_introduction: "自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。",
  classification: 1,
  atopic: true,
  allergen_group_chiri: true,
  allergen_group_dani: true,
  allergen_group_saikin: true,
  allergen_group_komugi: true,
  admin: true
)
PersonalAssistant.create!(
  user_id: 2,
  daily_atopic: true,
)
# 管理者ユーザーの最新IgE検査の登録
latest_test_date = Faker::Time.between(1.months.ago, Date.today, :day)
Ige.create!(
  user_id: 2,
  latest_test_result: true,
  test_date: latest_test_date,
  test_category: Random.rand(0 .. 10),
  ige_value: Random.rand(10 .. 3000),
  ige_unit: 0,
  allergen_group_chiri: true,
  allergen_group_dani: true,
  allergen_group_saikin: true,
  allergen_group_komugi: true
)
# 管理者ユーザーのその他のIgE検査結果
10.times do |n|
  test_date = Faker::Time.between(10.years.ago, 1.months.ago, :day)
  Ige.create!(
              user_id: 2,
              latest_test_result: false,
              test_date: test_date,
              test_category: Random.rand(0 .. 10),
              ige_value: Random.rand(10 .. 3000),
              ige_unit: 0,
              allergen_group_chiri: true,
              allergen_group_dani: true,
              allergen_group_saikin: true,
              allergen_group_yasai: true
              )
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
  User.create!(
               name: name,
               email: email,
               password: password,
               encrypted_password: User.digest(password),
               rank: Random.rand(0 .. 4),
               title_of_honor: Random.rand(10 .. 14),
               classification: Random.rand(1 .. 4),
               atopic: true,
               allergen_group_chiri: true,
               allergen_group_dani: true,
               allergen_group_gyorui: true,
               allergen_group_inekakafun: true
              )
  # パーソナルアシスタントの作成
  PersonalAssistant.create!(
    user_id: n+3
  )
  # 最新IgE検査の登録
  latest_test_date = Faker::Time.between(1.months.ago, Date.today, :day)
  Ige.create!(
              user_id: n+3,
              latest_test_result: true,
              test_date: latest_test_date,
              test_category: Random.rand(0 .. 10),
              ige_value: Random.rand(10 .. 3000),
              ige_unit: 0,
              allergen_group_chiri: true,
              allergen_group_dani: true,
              allergen_group_gyorui: true,
              allergen_group_inekakafun: true
             )
  # その他のIgE検査結果
  ige_count = Random.rand(1 .. 10)
  ige_count.times do |n2|
    test_date = Faker::Time.between(10.years.ago, 1.months.ago, :day)
    Ige.create!(
                user_id: n+3,
                latest_test_result: false,
                test_date: test_date,
                test_category: Random.rand(0 .. 10),
                ige_value: Random.rand(10 .. 3000),
                ige_unit: 0
               )
  end
end

# マイクロポスト           
users = User.order(:created_at).take(6)
50.times do
  content = Faker::Lorem.sentence(5)
  users.each { |user| user.microposts.create!(content: content) }
end

# リレーションシップ
users = User.all
user  = users.find(2)
following = users[2..50]
followers = users[3..90]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
