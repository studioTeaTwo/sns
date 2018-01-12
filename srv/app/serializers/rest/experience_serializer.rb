# @name Experience
#
# @attr [Array<Rest::NotificationSerializer>] mine
# @attr [Array<Rest::NotificationSerializer>] friend
class Rest::ExperienceSerializer < ActiveModel::Serializer
  has_many :mine do
    object[:mine]
  end
  has_many :friend do
    object[:friend]
  end
end
