# @name Experience
#
# @attr [Array<Params::MyExperience>] mine
# @attr [Array<Params::FriendExperience>] friend
class Rest::ExperienceSerializer < ActiveModel::Serializer
  has_many :mine do
    results = object[:mine]&.map{ |p| p.attributes }
    results
  end
  has_many :friend do
    results = object[:friend]&.map{ |p| p.attributes }
    results
  end
end
