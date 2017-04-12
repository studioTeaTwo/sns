class Ige < ApplicationRecord
  attribute :ige_value, :float
  belongs_to :user
  validates :test_date, presence: true
  validates :ige_value, presence: true

  def ige_value=(ige_value)
    @ige_value = ige_value.to_f
  end
end
