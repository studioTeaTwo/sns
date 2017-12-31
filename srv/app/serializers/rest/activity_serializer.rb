# @name Activity
#
# @attr [Array<Params::MyExperience>] mine
# @attr [Array<Params::FriendExperience>] friend
class Rest::ActivitySerializer < ActiveModel::Serializer
  has_many :mine do
    results = object[:mine]&.map{ |p| p.attributes }
    results
  end
  has_many :friend do
    results = object[:friend]&.map{ |p| p.attributes }
    results
  end
end
