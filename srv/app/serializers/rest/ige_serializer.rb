# @attr [integer] id
# @attr [boolean] latest_test_result
# @attr [date-time] created_at
# @attr [date-time] updated_at
class Rest::IgeSerializer < ActiveModel::Serializer

  attributes(*Ige.attribute_names.map(&:to_sym))

  #belongs_to :profile

end