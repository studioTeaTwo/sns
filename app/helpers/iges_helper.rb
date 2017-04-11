module IgesHelper
  # アレルゲン項目
  ALLERGEN_SORT = 
    [
      {"en" => 'housedust1',     "ja" => 'ハウスダスト1'}, 
      {"en" => 'housedust2',     "ja" => 'ハウスダスト2'},
      {"en" => 'yakehyouhidani', "ja" => 'ヤケヒョウヒダニ'},
      {"en" => 'konahyouhidani', "ja" => 'コナヒョウヒダニ'},
      {"en" => 'sugi',           "ja" => 'スギ'},
      {"en" => 'hinoki',         "ja" => 'ヒノキ'},
      {"en" => 'hannoki',        "ja" => 'ハンノキ'},
      {"en" => 'shirakanba',     "ja" => 'シラカンバ'},
      {"en" => 'gyougisiba',     "ja" => 'ギョウギシバ'},
      {"en" => 'harugaya',       "ja" => 'ハルガヤ'},
      {"en" => 'kamogaya',       "ja" => 'カモガヤ'},
      {"en" => 'ooawagaeri',     "ja" => 'オオアワガエリ'},
      {"en" => 'butakusa',       "ja" => 'ブタクサ'},
      {"en" => 'yomogi',         "ja" => 'ヨモギ'},
      {"en" => 'alternaria',     "ja" => 'アルテリナリア'},
      {"en" => 'aspergillosis',  "ja" => 'アスペルギルス'},
      {"en" => 'candida',        "ja" => 'カンジダ'},
      {"en" => 'malassezia',     "ja" => 'マラセチア'},
      {"en" => 'neko',           "ja" => 'ネコ（皮屑）'},
      {"en" => 'inu',            "ja" => 'イヌ（皮屑）'},
      {"en" => 'kato',           "ja" => '家兎上皮'},
      {"en" => 'gokiburi',       "ja" => 'ゴキブリ'},
      {"en" => 'ga',             "ja" => 'ガ'},
      {"en" => 'gyunyu',         "ja" => '牛乳'},
      {"en" => 'ranpaku',        "ja" => '卵白'},
      {"en" => 'ovomucoid',      "ja" => 'オボムコイド'},
      {"en" => 'kome',           "ja" => '米'},
      {"en" => 'komugi',         "ja" => '小麦（食品）'},
      {"en" => 'soba',           "ja" => 'ソバ'},
      {"en" => 'daizu',          "ja" => '大豆'},
      {"en" => 'peanuts',        "ja" => 'ピーナッツ'},
      {"en" => 'ringo',          "ja" => 'リンゴ'},
      {"en" => 'banana',         "ja" => 'バナナ'},
      {"en" => 'kiwi',           "ja" => 'キウイ'},
      {"en" => 'goma',           "ja" => 'ゴマ'},
      {"en" => 'gyuniku',        "ja" => '牛肉'},
      {"en" => 'butaniku',       "ja" => '豚肉'},
      {"en" => 'toriniku',       "ja" => '鶏肉'},
      {"en" => 'ebi',            "ja" => 'エビ'},
      {"en" => 'kani',           "ja" => 'カニ'},
      {"en" => 'saba',           "ja" => 'サバ'},
      {"en" => 'sake',           "ja" => 'サケ'},
      {"en" => 'maguro',         "ja" => 'マグロ'},
      {"en" => 'latex',          "ja" => 'ラテックス'}
    ]

  # 検査種類
  TEST_CATEGORY =
    [
      "IgE(非特異的IgE)〔CLEIA〕",
      "IgE(非特異的IgE)〔FEIA〕",
      "特異的IgE(MAST36アレルゲン)",
      "汎用セット スクリーニング16　内科・呼吸器系",
      "汎用セット スクリーニング16　小児科",
      "汎用セット スクリーニング16　耳鼻科",
      "汎用セット スクリーニング16　皮膚科",
      "汎用セット コンビネーション6",
      "特異的IgE(ミックスアレルゲン)",
      "特異的IgE(シングルアレルゲン)",
      "アトピー鑑別試験 (12種吸入性アレルゲン)",
      "特異的IgE (C-PAC16アレルゲン) 小児用",
      "特異的IgE (C-PAC16アレルゲン) アトピー性皮膚炎用",
      "特異的IgE (C-PAC16アレルゲン) 鼻炎・喘息用",
      "特異的IgE (C-PAC5アレルゲン)　小児除去食用",
      "特異的IgE(マルチアレルゲン)",
      "特異的IgE(シングルアレルゲン)",
      "特異的IgE(Ara h 2)(ピーナッツ由来)"
    ]

  # 検査単位
  TEST_UNIT =
    [
      "IU/mL",
      "UA/mL",
      "IUA/mL",
      "LC"
    ]

  # 検査種類を表示する
  def get_category_name(test_category_value)
    case test_category_value
    when  0 then TEST_CATEGORY[0]
    when  1 then TEST_CATEGORY[1]
    when  2 then TEST_CATEGORY[2]
    when  3 then TEST_CATEGORY[3]
    when  4 then TEST_CATEGORY[4]
    when  5 then TEST_CATEGORY[5]
    when  6 then TEST_CATEGORY[6]
    when  7 then TEST_CATEGORY[7]
    when  8 then TEST_CATEGORY[8]
    when  9 then TEST_CATEGORY[9]
    when 10 then TEST_CATEGORY[10]
    when 11 then TEST_CATEGORY[11]
    when 12 then TEST_CATEGORY[12]
    when 13 then TEST_CATEGORY[13]
    when 14 then TEST_CATEGORY[14]
    when 15 then TEST_CATEGORY[15]
    when 16 then TEST_CATEGORY[16]
    when 17 then TEST_CATEGORY[17]
    else
    end
  end

  # 単位を表示する
  def get_unit_name(unit_value)
    case unit_value
    when 0 then TEST_UNIT[0]
    when 1 then TEST_UNIT[1]
    when 2 then TEST_UNIT[2]
    when 3 then TEST_UNIT[3]
    else
    end
  end
end