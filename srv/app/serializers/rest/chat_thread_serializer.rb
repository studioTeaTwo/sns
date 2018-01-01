# @name ChatThread
#
# @attr [integer] id
# @attr [date-time] createdAt
# @attr [date-time] updatedAt
# @attr [Array<Rest::UserSerializer>] participants
# @attr [Array<Rest::ChatStatusSerializer>] statuses
# @attr [Rest::ChatSerializer] newestChat
class Rest::ChatThreadSerializer < ActiveModel::Serializer
  
  attributes :id, :created_at, :updated_at
  
  has_many :users, key: :participants, serializer: Rest::UserSerializer do
    object.users
  end
  has_many :chat_statuses, key: :statuses, serializer: Rest::ChatStatusSerializer do
    object.chat_statuses
  end
  has_one :chat, key: :newest_chat, serializer: Rest::ChatSerializer do
    Chat.find(object.newest_chat_id) unless object.newest_chat_id == 0
  end
end
