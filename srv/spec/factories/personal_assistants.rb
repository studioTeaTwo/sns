FactoryGirl.define do
  factory :personal_assistant do
    references ""
    tutorialStatus 1
    diaryAtopic false
    diaryRhinitis false
    diaryAsthma false
    diaryPollen false
    diaryGastroenteritis false
    diaryConjunctivitis false
  end
end
