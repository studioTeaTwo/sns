class Rest::MicropostSerializer < ActiveModel::Serializer

  attributes(*Micropost.attribute_names.map(&:to_sym))

  #belongs_to :profile

end