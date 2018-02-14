class Relationship < ApplicationRecord
  belongs_to :follower, class_name: "User"
  belongs_to :followed, class_name: "User"
  has_one :experience, as: :activity, dependent: :destroy
  has_one :notification, as: :activity, dependent: :destroy

  validates :follower_id, presence: true
  validates :followed_id, presence: true
end
