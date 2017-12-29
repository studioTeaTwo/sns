# @name ChatThread
#
# @attr [integer] id
# @attr [boolean] hasUnread
# @attr [Array<Rest::ChatStatusSerializer>] readUntil
# @attr [date-time] createdAt
# @attr [date-time] updatedAt
# @attr [Array<Rest::UserSerializer>] participants
# @attr [Rest::ChatSerializer] newestChat
class Rest::ChatThreadSerializer < ActiveModel::Serializer
  
  attributes :id, :has_unread, :created_at, :updated_at
  
  has_many :users, key: :participants, serializer: Rest::UserSerializer do
    object.users
  end
  has_many :chat_statuses, key: :read_until, serializer: Rest::ChatStatusSerializer do
    object.chat_statuses
  end
  has_one :chat, key: :newest_chat, serializer: Rest::ChatSerializer do
    Chat.find(object.newest_chat_id) unless object.newest_chat_id == 0
  end

  def has_unread
    object.newest_chat_id > object.chat_statuses.where(user_id: current_user.id).first.read_until
  end
end
