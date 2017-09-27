class Ige < ApplicationRecord
  belongs_to :user

  attribute :ige_value, :float
  
  validates :test_date, presence: true
  validates :ige_value, presence: true
end
