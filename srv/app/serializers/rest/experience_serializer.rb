class Rest::ExperienceSerializer < ActiveModel::Serializer
  has_many :mine do
    results = object[:mine]&.map{ |p| p.attributes }
    results
  end
  has_many :others do
    results = object[:others]&.map{ |p| p.attributes }
    results
  end
end
