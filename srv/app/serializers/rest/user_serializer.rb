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
# @attr [boolean] allergenGroupInekakafun
# @attr [boolean] allergenGroupZassoukafun
# @attr [boolean] allergenGroupJyukikafun
# @attr [boolean] allergenGroupChiri
# @attr [boolean] allergenGroupDani
# @attr [boolean] allergenGroupShinkin
# @attr [boolean] allergenGroupSaikin
# @attr [boolean] allergenGroupDoubutsu
# @attr [boolean] allergenGroupSyokugyou
# @attr [boolean] allergenGroupTamago
# @attr [boolean] allergenGroupNyuuseihin
# @attr [boolean] allergenGroupGyorui
# @attr [boolean] allergenGroupKoukakurui
# @attr [boolean] allergenGroupIkatako
# @attr [boolean] allergenGroupKomugi
# @attr [boolean] allergenGroupKomugiigai
# @attr [boolean] allergenGroupNikurui
# @attr [boolean] allergenGroupMamerui
# @attr [boolean] allergenGroupKudamonorui
# @attr [boolean] allergenGroupYasai
# @attr [boolean] allergenGroupSonota
# @attr [boolean] allergenGroupKiseityuu
# @attr [boolean] allergenGroupYakubutsu
# @attr [boolean] allergenGroupKontyuu
# @attr [string] avatarUrl
# @attr [string] accessToken
# @attr [date-time] createdAt
# @attr [date-time] currentSignInAt
class Rest::UserSerializer < ActiveModel::Serializer

  attributes  :id, :email, :name, :admin, :self_introduction, :rank, :title_of_honor,
              :classification, :atopic, :asthma, :rhinitis, :pollen, :gastroenteritis, :conjunctivitis,
              :allergen_group_inekakafun,
              :allergen_group_zassoukafun,
              :allergen_group_jyukikafun,
              :allergen_group_chiri,
              :allergen_group_dani,
              :allergen_group_shinkin,
              :allergen_group_saikin,
              :allergen_group_doubutsu,
              :allergen_group_syokugyou,
              :allergen_group_tamago,
              :allergen_group_nyuuseihin,
              :allergen_group_gyorui,
              :allergen_group_koukakurui,
              :allergen_group_ikatako,
              :allergen_group_komugi,
              :allergen_group_komugiigai,
              :allergen_group_nikurui,
              :allergen_group_mamerui,
              :allergen_group_kudamonorui,
              :allergen_group_yasai,
              :allergen_group_sonota,
              :allergen_group_kiseityuu,
              :allergen_group_yakubutsu,
              :allergen_group_kontyuu,
              :avatar_url, :created_at, :current_sign_in_at
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