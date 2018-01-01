# @name ChatStatus
#
# @attr [integer] id
# @attr [integer] chatThreadId
# @attr [integer] userId
# @attr [integer] readUntil
# @attr [boolean] hasUnread
# @attr [date-time] createdAt
# @attr [date-time] updatedAt
class Rest::ChatStatusSerializer < ActiveModel::Serializer
  attributes(*ChatStatus.attribute_names.map(&:to_sym))
end