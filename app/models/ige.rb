class Ige < ApplicationRecord
  belongs_to :user
  validates :test_date, presence: true
  validates :ige_value, presence: true
end
