FactoryGirl.define do

  factory :new_micropost, class: Micropost do
    content 'マイクのテスト中'
  end

  factory :existing_micropost, class: Micropost do
    content 'テスト終わった'
  end
end