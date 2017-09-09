# @name Chat
#
# @attr [integer] id
# @attr [integer] chatThreadId
# @attr [integer] senderId
# @attr [integer] contentType
# @attr [string] body
# @attr [hash] itemList
# @attr [string] result
# @attr [boolean] expired
# @attr [date-time] createdAt
class Rest::ChatSerializer < ActiveModel::Serializer
  attributes(*Chat.attribute_names.map(&:to_sym))
end
