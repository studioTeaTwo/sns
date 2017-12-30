# @name Feed
#
# @attr [Array<Params::Experience>] mine
# @attr [Array<Params::Experience>] others
class Rest::FeedSerializer < ActiveModel::Serializer
  has_many :mine do
    results = object[:mine]&.map{ |p| p.attributes }
    results
  end
  has_many :others do
    results = object[:others]&.map{ |p| p.attributes }
    results
  end
end
