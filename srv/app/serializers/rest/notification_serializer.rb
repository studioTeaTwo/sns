# @name Notification
#
# @attr [string] type
# @attr [string] linkId
# @attr [integer] userId
# @attr [string] name
# @attr [string] avatarUrl
# @attr [string] description
class Rest::NotificationSerializer < ActiveModel::Serializer
  attributes :type, :link_id, :user_id, :name, :avatar_url, :description

  def type
    object[:type]
  end

  def link_id
    object[:link_id]
  end

  def user_id
    object[:user_id]
  end

  def avatar_url
    user = User.find(object[:user_id])
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = 20
    "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end

  def name
    object[:name]
  end

  def description
    object[:description]
  end
end
