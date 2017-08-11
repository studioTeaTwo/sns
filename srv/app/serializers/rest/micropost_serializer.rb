class Rest::MicropostSerializer < ActiveModel::Serializer

  attributes(*Micropost.attribute_names.map(&:to_sym))

end