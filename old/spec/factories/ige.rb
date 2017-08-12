FactoryGirl.define do

  factory :new_ige, class: Ige do
    test_date Faker::Time.between(1.months.ago, Date.today, :day)
    ige_value 100

    allergen_harugaya_class 1
    allergen_ratt_class 2
  end

  factory :existing_ige, class: Ige do
    test_date Faker::Time.between(1.years.ago, 1.months.ago, :day)
    ige_value 200
    latest_test_result true
  end
end