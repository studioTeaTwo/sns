class Notification < ApplicationRecord

  TYPE_CLASS_MAP = {
    relationship: 'Relationship'
  }.freeze

  belongs_to :user
  belongs_to :activity, polymorphic: true
  
  # ポリモーフィックオブジェクト
  # FIXME: mastodonでは定義しているが、複数modelになるとエラーになるためコメントアウト
  # https://github.com/studioTeaTwo/mastodon/blob/master/app/models/notification.rb
  # belongs_to :relationship, foreign_type: 'Relationship', foreign_key: 'activity_id'

  validates :user_id, uniqueness: { scope: [:activity_type, :activity_id] }
  validates :activity_type, inclusion: { in: TYPE_CLASS_MAP.values }

end
