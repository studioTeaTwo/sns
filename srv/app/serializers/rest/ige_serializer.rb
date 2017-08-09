class Rest::IgeSerializer < ActiveModel::Serializer

  attributes(*Ige.attribute_names.map(&:to_sym))

end