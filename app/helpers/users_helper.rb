module UsersHelper

  # 引数で与えられたユーザーのGravatar画像を返す
  def gravatar_for(user, options = { size: 80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
  end

  def getRankName(rank)
    case rank
    when 0 then 'Dランク'
    when 1 then 'Cランク'
    when 2 then 'Bランク'
    when 3 then 'Aランク'
    when 4 then 'Sランク'
    end
  end

  def getTitleOfHonor(rank)
    case rank
    when 10 then 'ふつーの人'
    when 11 then 'アレルギーサラリーマン'
    when 12 then 'アレルギーナイト'
    when 13 then 'アレルギーキング'
    when 14 then 'アレルギーゴッド'
    end
  end
end
