# @name Notification
#
# @attr [string] type
# @attr [integer] userId
# @attr [string] name
# @attr [string] description
class Rest::NotificationSerializer < ActiveModel::Serializer
  attributes :type, :user_id, :name, :description

  def type
    object[:type]
  end

  def user_id
    object[:user_id]
  end

  def name
    object[:name]
  end

  def description
    object[:description]
  end
end
