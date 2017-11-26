class Experience < ApplicationRecord

  TYPE_CLASS_MAP = {
    daily_log: 'DailyLog'
  }.freeze

  belongs_to :user
  belongs_to :activity, polymorphic: true
  
  belongs_to :daily_log, foreign_type: 'DailyLog', foreign_key: 'activity_id'

  validates :user_id, uniqueness: { scope: [:activity_type, :activity_id] }
  validates :activity_type, inclusion: { in: TYPE_CLASS_MAP.values }

  def type
    @type ||= TYPE_CLASS_MAP.invert[activity_type].to_sym
    
  end

end
