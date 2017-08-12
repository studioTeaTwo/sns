##
# UserSerializerの継承
#
class Rest::ProfileSerializer < Rest::UserSerializer
  
  attributes :latest_ige, :positive_allergen_group

  has_many :iges, serializer: Rest::IgeSerializer, unless: :search?
  has_many :microposts, serializer: Rest::MicropostSerializer, unless: :search?

  def latest_test_result
    @ige ||= object.iges.where({:latest_test_result => true})
  end

  def latest_ige
    latest_test_result.present? ? latest_test_result[0].ige_value : ''
  end

  def positive_allergen_group
    return [] unless latest_test_result.present?
    result = latest_test_result[0].attributes.collect {|k, v| k if k.match(/(allergen_group_.+)/) && v }
    result.compact
  end

  # Searchならmicropotやigeは返さない
  def search?
    instance_options[:type] == :search
  end

end