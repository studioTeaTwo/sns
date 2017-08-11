class Ige < ApplicationRecord
  attribute :ige_value, :float
  belongs_to :user
  
  validates :test_date, presence: true
  validates :ige_value, presence: true
end
