class Rest::UserSerializer < ActiveModel::Serializer

  attributes :id, :email, :name, :self_introduction, :rank, :title_of_honor,
             :avatar_url

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

  private

  # 引数で与えられたユーザーのGravatar画像を返す
  def gravatar_for(user, options = { size: 80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end
end