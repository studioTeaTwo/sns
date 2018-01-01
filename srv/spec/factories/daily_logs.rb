FactoryGirl.define do
  factory :daily_log do
    symptom :atopic
    health 1
    health_memo '今日は良かった'
    medicina true
    medicina_memo 'いっぱい塗った'
  end
end
