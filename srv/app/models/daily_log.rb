class DailyLog < ApplicationRecord
  belongs_to :user

  serialize :photograph, Array
  enum symptom: { atopic: 0, asthma: 1, rhinitis: 2, pollen: 3, gastroenteritis: 4, conjunctivitis: 5 }
end
