# @name Micropost
#
# @attr [integer] id   
# @attr [integer] userId   
# @attr [string] content
# @attr [string] picture
# @attr [date-time] createdAt
class Rest::MicropostSerializer < ActiveModel::Serializer

  attributes(*Micropost.attribute_names.map(&:to_sym))

  #belongs_to :profile

end