# @name User
#
# @attr [integer] id
# @attr [string] email
# @attr [string] name
# @attr [boolean] admin
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
# @attr [string] accessToken
# @attr [date-time] createdAt
class Rest::UserSerializer < ActiveModel::Serializer

  attributes :id, :email, :name, :admin, :self_introduction, :rank, :title_of_honor,
             :classification, :atopic, :asthma, :rhinitis, :pollen, :gastroenteritis, :conjunctivitis,
             :avatar_url, :created_at
  attribute :access_token if :session?

  def avatar_url
    gravatar_for(object, size: 50)
  end

  def rank
    case object.rank
    when 0 then 'Dランク'
    when 1 then 'Cランク'
    when 2 then 'Bランク'
    when 3 then 'Aランク'
    when 4 then 'Sランク'
    end
  end

  def title_of_honor
    case object.title_of_honor
    when 10 then 'ふつーの人'
    when 11 then 'アレルギーサラリーマン'
    when 12 then 'アレルギーナイト'
    when 13 then 'アレルギーキング'
    when 14 then 'アレルギーゴッド'
    end
  end

  # Searchならmicropotやigeは返さない
  def session?
    instance_options[:sort] == :session
  end

  private

  # 引数で与えられたユーザーのGravatar画像を返す
  def gravatar_for(user, options = { size: 80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end
end