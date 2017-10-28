##
# UserSerializerの継承
#
# @name Profile
#
# @attr [integer] latestIge
# @attr [Array<string>] positiveAllergenGroups
# @attr [integer] followers
# @attr [integer] followings
# @attr [boolean] isFollow
# @attr [Array<string>] positiveAllergenGroups
# @attr [integer] id
# @attr [string] email
# @attr [string] name
# @attr [string] selfIntroduction
# @attr [integer] rank
# @attr [integer] titleOfHonor
# @attr [integer] classification
# @attr [boolean] atopic
# @attr [boolean] asthma
# @attr [boolean] rhinitis
# @attr [boolean] pollen
# @attr [boolean] gastroenteritis
# @attr [boolean] conjunctivitis
# @attr [string] avatarUrl
# @attr [Array<Rest::IgeSerializer>] iges
# @attr [Array<Rest::MicropostSerializer>] microposts
class Rest::ProfileSerializer < Rest::UserSerializer
  
  attributes :latest_ige, :positive_allergen_groups,
             :followers, :followings, :isFollow

  has_many :iges, serializer: Rest::IgeSerializer, unless: :search?
  has_many :microposts, serializer: Rest::MicropostSerializer, unless: :search?

  def latest_test_result
    @ige ||= object.iges.where({:latest_test_result => true})
  end

  def latest_ige
    latest_test_result.present? ? latest_test_result.first.ige_value : ''
  end

  def positive_allergen_groups
    return [] unless latest_test_result.present?
    result = latest_test_result[0].attributes.collect {|k, v| k.camelize(:lower) if k.match(/(allergen_group_.+)/) && v }
    result.compact
  end

  def followers
    object.followers.count
  end

  def followings
    object.followings.count
  end

  def isFollow
    instance_options[:option][:isFollow] unless instance_options[:option][:isFollow].nil?
  end

  # Searchならmicropotやigeは返さない
  def search?
    instance_options[:option][:sort] == :search
  end

end