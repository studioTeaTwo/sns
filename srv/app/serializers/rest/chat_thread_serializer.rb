class Rest::ChatThreadSerializer < ActiveModel::Serializer
  
  attributes :id, :has_unread, :read_until
  
  has_many :users, key: :participants, serializer: Rest::UserSerializer do
    object.users
  end
  has_one :chat, key: :newest_chat, serializer: Rest::ChatSerializer do
    Chat.find(object.newest_chat_id) unless object.newest_chat_id == 0
  end

  def has_unread
    object.newest_chat_id > object.chat_statuses.where(user_id: current_user.id).first.read_until
  end

  def read_until
    object.chat_statuses
  end
end
