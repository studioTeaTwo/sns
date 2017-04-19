module IgesHelper
  # 検査種類
  TEST_CATEGORY =
    [
      '12種吸入性アレルゲンアトピー鑑別試験',
      'CAP16食物アレルギー',
      'CAP16アトピー乳幼児',
      'CAP16アトピー学童',
      'CAP16アトピー成人',
      'CAP16花粉症・鼻炎',
      'CAP16アレルギー性喘息',
      'MAST33',
      'MAST36',
      'View 36',
      'View 39'
    ]

  # アレルゲン種類
  ALLERGEN_SORT =
    {
      'allergen_sort_inekakafun' => 'イネ科植物花粉',
      'allergen_sort_zassoukafun' => '雑草花粉',
      'allergen_sort_jyukikafun' => '樹木花粉',
      'allergen_sort_chiri' => '室内塵',     
      'allergen_sort_dani' => 'ダニ',      
      'allergen_sort_shinkin' => '真菌',   
      'allergen_sort_saikin' => '細菌',    
      'allergen_sort_doubutsu' => '動物',  
      'allergen_sort_syokugyou' => '職業性アレルゲン', 
      'allergen_sort_tamago' => '卵',    
      'allergen_sort_nyuuseihin' => '乳製品',
      'allergen_sort_gyorui' => '魚類',    
      'allergen_sort_koukakurui' => '甲殻類',
      'allergen_sort_ikatako' => 'イカ・タコ',   
      'allergen_sort_komugi' => '穀穀類（小麦）',    
      'allergen_sort_komugiigai' => '穀類（小麦以外）',
      'allergen_sort_nikurui' => '肉類',   
      'allergen_sort_mamerui' => '豆類',   
      'allergen_sort_kudamonorui' => '果物類',
      'allergen_sort_yasai' => '野菜',
      'allergen_sort_sonota' => 'その他',    
      'allergen_sort_kiseityuu' => '寄生虫', 
      'allergen_sort_yakubutsu' => '薬物', 
      'allergen_sort_kontyuu' => '昆虫',   
      'allergen_sort_maruti' => 'マルチアレルゲン'
    }

  # アレルゲン詳細 
  # 項目の参考:http://data.medience.co.jp/allergy/allergy_ctg.cgi?ctg=1
  # 英名の参考:http://plaza.umin.ac.jp/~kuhp-kensa/reference/item/6444.html
  ALLERGEN_DETAIL = 
    [
      {'en' => 'harugaya',           'ja' => 'ハルガヤ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'gyougishiba',        'ja'  => 'ギョウギシバ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'kamogaya',           'ja' => 'カモガヤ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'hirohaushinokegusa', 'ja' => 'ヒロハウシノケグサ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'hosomugi',           'ja' => 'ホソムギ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'ooawagaeri',         'ja' => 'オオアワガエリ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'ashi',               'ja' => 'アシ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'nagahagusa',         'ja' => 'ナガハグサ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'konukagusaZoku',     'ja' => 'コヌカグサ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'seibanmorokoshi',    'ja'  => 'セイバンモロコシ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'komugiZoku',         'ja' => '小麦（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'oosuzumenoteppou',   'ja' => 'オオスズメノテッポウ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'suzumenohieZoku',    'ja'  => 'スズメノヒエ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => 'イネ科植物花粉'},
      {'en' => 'butakusakongoubu1',  'ja'  => 'ブタクサ混合物1', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'butakusa',           'ja' => 'ブタクサ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'butakusamodoki',     'ja' => 'ブタクサモドキ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'oobutakusa',         'ja' => 'オオブタクサ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'nigayomogi',         'ja' => 'ニガヨモギ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'yomogi',             'ja' => 'ヨモギ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'huransugiku',        'ja'  => 'フランスギク', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'tanpopoZoku',        'ja'  => 'タンポポ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'heraobako',          'ja'  => 'ヘラオオバコ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'shiroza',            'ja'  => 'シロザ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'akinokirinsou',      'ja'  => 'アキノキリンソウ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'himesuiba',          'ja'  => 'ヒメスイバ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'irakusaZoku',        'ja'  => 'イラクサ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'kanamugura',         'ja' => 'カナムグラ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '雑草花粉'},
      {'en' => 'kaedeZoku',          'ja'  => 'カエデ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'hannokiZoku',        'ja'  => 'ハンノキ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'shirakanbaZoku',     'ja' => 'シラカンバ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'bunaZoku',           'ja' => 'ブナ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'byakushinZoku',      'ja'  => 'ビャクシン（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'konaraZoku',         'ja' => 'コナラ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'nireZoku',           'ja' => 'ニレ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'olive',              'ja'  => 'オリーブ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'kurumiZoku',         'ja' => 'クルミ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'yanagiZoku',         'ja' => 'ヤナギ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'matsuZoku',          'ja'  => 'マツ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'sugi',               'ja' => 'スギ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'acaciaZoku',         'ja' => 'アカシア（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'hinoki',             'ja' => 'ヒノキ', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'kuwaZoku',           'ja' => 'クワ（属）', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '樹木花粉'},
      {'en' => 'housedust1',         'ja' => 'ハウスダスト１', 'category' => '吸入性アレルゲン（花粉）', 'sort' => '室内塵'},
      {'en' => 'housedust2',         'ja' => 'ハウスダスト２', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '室内塵'},
      {'en' => 'yakehyouhidani',     'ja' => 'ヤケヒョウヒダニ（ダニ１）', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => 'ダニ'},
      {'en' => 'konahyouhidani',     'ja' => 'コナヒョウヒダニ', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => 'ダニ'},
      {'en' => 'ashibutokonadani',   'ja' => 'アシブトコナダニ', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => 'ダニ'},
      {'en' => 'sayaashinidani',     'ja' => 'サヤアシニクダニ', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => 'ダニ'},
      {'en' => 'kenagakonadani',     'ja' => 'ケナガコナダニ', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => 'ダニ'},
      {'en' => 'penicillium',        'ja'  => 'ペニシリウム', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'cladosporium',       'ja' => 'クラドスポリウム', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'aspergillosis',      'ja'  => 'アスペルギルス', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'mucor',              'ja'  => 'ムコール', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'candida',            'ja'  => 'カンジダ', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'alternaria',         'ja' => 'アルテルナリア', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'helminthosporium',   'ja' => 'ヘルミントスポリウム', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'pityrosporium',      'ja'  => 'ピティロスポリウム', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'trichophyton',       'ja' => 'トリコフィトン(白癬菌）', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'malassezia',         'ja' => 'マラセチア', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '真菌'},
      {'en' => 'kiirobudoukyukinA',  'ja'  => '黄色ブドウ球菌A', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '細菌'},
      {'en' => 'kiirobudoukyukinB',  'ja'  => '黄色ブドウ球菌B', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '細菌'},
      {'en' => 'nekoHisetsu',        'ja'  => 'ネコ皮屑', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'umaHisetsu',         'ja' => 'ウマ皮屑', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'ushiHisetsu',        'ja'  => 'ウシ皮屑', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'inuHisetsu',         'ja' => 'イヌ皮屑', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'marmotJyouhi',       'ja' => 'モルモット上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'hatoFun',            'ja'  => 'ハトのふん', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'gatyouUmou',         'ja' => 'ガチョウ羽毛', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'sekiseiinkoFun',     'ja' => 'セキセイインコのふん', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'sekiseiinkoUmou',    'ja'  => 'セキセイインコ羽毛', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'yagiJyouhi',         'ja' => 'ヤギ上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'hitsujiJyouhi',      'ja'  => '羊上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'katoJyouhi',         'ja' => '家兎上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'butaJyouhi',         'ja' => '豚上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'hamsterJyouhi',      'ja'  => 'ハムスター上皮', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'niwatoriUmou',       'ja' => 'ニワトリ羽毛', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'ahiruUmou',          'ja'  => 'アヒル羽毛', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'ratt',               'ja' => 'ラット', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'mouse',              'ja'  => 'マウス', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '動物'},
      {'en' => 'oobakosyushi',       'ja' => 'オオバコ種子', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'kinu',               'ja' => '絹', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'isocyanateTDI',      'ja'  => 'イソシアネートTDI', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'isocyanateMDI',      'ja'  => 'イソシアネートMDI', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'isocyanateHDI',      'ja'  => 'イソシアネートHDI', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'ethyleneoxide',      'ja'  => 'エチレンオキサイド', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'musuihutalsan',      'ja'  => '無水フタル酸', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'formalin',           'ja' => 'ホルマリン', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'latex',              'ja'  => 'ラテックス', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'men',                'ja'  => '綿', 'category' => '吸入性アレルゲン（花粉以外）', 'sort' => '職業性アレルゲン'},
      {'en' => 'ranpaku',            'ja'  => '卵白', 'category' => '食餌系アレルゲン', 'sort' => '卵'},
      {'en' => 'ranou',              'ja'  => '卵黄', 'category' => '食餌系アレルゲン', 'sort' => '卵'},
      {'en' => 'ovomucoid',          'ja'  =>  'オボムコイド', 'category' => '食餌系アレルゲン', 'sort' => '卵'},
      {'en' => 'milk',               'ja' => 'ミルク', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'alpha_actalbumin',   'ja' => 'α－ラクトアルブミン', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'beta_lactoglobulin', 'ja' => 'β－ラクトグロブリン', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'casein',             'ja' => 'カゼイン', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'cheese',             'ja' => 'チーズ', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'moldcheese',         'ja' => 'モールドチーズ', 'category' => '食餌系アレルゲン', 'sort' => '乳製品'},
      {'en' => 'tara',               'ja' => 'タラ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'maguro',             'ja' => 'マグロ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'sake',               'ja' => 'サケ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'saba',               'ja' => 'サバ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'aji',                'ja'  => 'アジ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'iwashi',             'ja' => 'イワシ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'karei',              'ja'  => 'カレイ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'ikura',              'ja'  => 'イクラ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'tarako',             'ja' => 'タラコ', 'category' => '食餌系アレルゲン', 'sort' => '魚類'},
      {'en' => 'kani',               'ja' => 'カニ', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'ebi',                'ja'  => 'エビ', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'murasakigai',        'ja'  => 'ムラサキイガイ（ムール貝）', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'lobster',            'ja'  => 'ロブスター', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'asari',              'ja'  => 'アサリ', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'kaki',               'ja' => 'カキ(貝）', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'hotate',             'ja' => 'ホタテ', 'category' => '食餌系アレルゲン', 'sort' => '甲殻類'},
      {'en' => 'ika',                'ja'  => 'イカ', 'category' => '食餌系アレルゲン', 'sort' => 'イカ・タコ'},
      {'en' => 'tako',               'ja' => 'タコ', 'category' => '食餌系アレルゲン', 'sort' => 'イカ・タコ'},
      {'en' => 'komugi',             'ja' => '小麦', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦）'},
      {'en' => 'gluten',             'ja' => 'グルテン', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦）'},
      {'en' => 'oh_5gliadin',        'ja'  => 'ω－５グリアジン', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦）'},
      {'en' => 'raimugi',            'ja'  => 'ライ麦', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'oomugi',             'ja' => '大麦', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'ootomugi',           'ja' => 'オート麦', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'toumorokoshi',       'ja' => 'トウモロコシ', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'kome',               'ja' => '米', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'soba',               'ja' => 'ソバ', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'beerkoubo',          'ja'  => 'ビール酵母', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'kibi',               'ja' => 'キビ', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'awa',                'ja'  => 'アワ', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'hie',                'ja'  => 'ヒエ', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'bakuga',             'ja' => '麦芽', 'category' => '食餌系アレルゲン', 'sort' => '穀類（小麦以外）'},
      {'en' => 'butaniku',           'ja' => '豚肉', 'category' => '食餌系アレルゲン', 'sort' => '肉類'},
      {'en' => 'gyuniku',            'ja'  => '牛肉', 'category' => '食餌系アレルゲン', 'sort' => '肉類'},
      {'en' => 'toriniku',           'ja' => '鶏肉', 'category' => '食餌系アレルゲン', 'sort' => '肉類'},
      {'en' => 'youniku',            'ja'  => '羊肉', 'category' => '食餌系アレルゲン', 'sort' => '肉類'},
      {'en' => 'endou',              'ja'  => 'エンドウ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'peanuts',            'ja'  => 'ピーナッツ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'daizu',              'ja'  => '大豆', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'ingen',              'ja'  => 'インゲン', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'hashibami',          'ja'  => 'ハシバミ（ヘーゼルナッツ）', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'brazilnuts',         'ja' => 'ブラジルナッツ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'almond',             'ja' => 'アーモンド', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'coconut',            'ja'  => 'ココナッツ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'cacao',              'ja'  => 'カカオ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'cashewnuts',         'ja' => 'カシューナッツ', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'kurumi',             'ja' => 'クルミ（実）', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'arah2',              'ja'  => 'Ara h 2 （ピーナッツ由来）', 'category' => '食餌系アレルゲン', 'sort' => '豆類'},
      {'en' => 'orange',             'ja' => 'オレンジ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'ichigo',             'ja' => 'イチゴ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'ringo',              'ja'  => 'リンゴ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'kiwi',               'ja' => 'キウイ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'melon',              'ja'  => 'メロン', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'mango',              'ja'  => 'マンゴ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'banana',             'ja' => 'バナナ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'younashi',           'ja' => '洋ナシ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'momo',               'ja' => 'モモ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'avocado',            'ja'  => 'アボカド', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'grapefruit',         'ja' => 'グレープフルーツ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'suika',              'ja'  => 'スイカ', 'category' => '食餌系アレルゲン', 'sort' => '果物類'},
      {'en' => 'tomato',             'ja' => 'トマト', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'ninjin',             'ja' => 'ニンジン', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'jyagaimo',           'ja' => 'ジャガイモ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'ninniku',            'ja'  => 'ニンニク', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'tamanegi',           'ja' => 'タマネギ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'takenoko',           'ja' => 'タケノコ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'satsumaimo',         'ja' => 'サツマイモ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'celery',             'ja' => 'セロリ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'parsley',            'ja'  => 'パセリ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'yamaimo',            'ja'  => 'ヤマイモ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'hourensou',          'ja'  => 'ホウレンソウ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'kabocha',            'ja'  => 'カボチャ', 'category' => '食餌系アレルゲン', 'sort' => '野菜'},
      {'en' => 'hitoinsulin_food',   'ja' => 'ヒトインシュリン（ヒトインスリン）', 'category' => '食餌系アレルゲン', 'sort' => 'その他'},
      {'en' => 'gelatin',            'ja'  => 'ゼラチン', 'category' => '食餌系アレルゲン', 'sort' => 'その他'},
      {'en' => 'goma',               'ja' => 'ゴマ', 'category' => '食餌系アレルゲン', 'sort' => 'その他'},
      {'en' => 'mustard',            'ja'  => 'マスタード', 'category' => '食餌系アレルゲン', 'sort' => 'その他'},
      {'en' => 'kaichu',             'ja' => 'カイチュウ', 'category' => 'その他のアレルゲン', 'sort' => '寄生虫'},
      {'en' => 'anisakis',           'ja' => 'アニサキス', 'category' => 'その他のアレルゲン', 'sort' => '寄生虫'},
      {'en' => 'hitoinsulin_etc',    'ja'  => 'ヒトインシュリン（ヒトインスリン）', 'category' => 'その他のアレルゲン', 'sort' => '薬物'},
      {'en' => 'mitsubachi',         'ja' => 'ミツバチ', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'suzumebachi',        'ja'  => 'スズメバチ', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'ashinagabachi',      'ja'  => 'アシナガバチ', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'gokiburi',           'ja' => 'ゴキブリ', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'yusurika',           'ja' => 'ユスリカ（成虫）', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'ga',                 'ja' => 'ガ', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'yabuka',             'ja' => 'ヤブカ（属）', 'category' => 'その他のアレルゲン', 'sort' => '昆虫'},
      {'en' => 'doubutsuJyouhi',     'ja' => '動物上皮', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'},
      {'en' => 'syokumotsu',         'ja' => '食物', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'},
      {'en' => 'kokumotsu',          'ja'  => '穀物', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'},
      {'en' => 'ineka',              'ja'  => 'イネ科', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'},
      {'en' => 'kabi',               'ja' => 'カビ', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'},
      {'en' => 'zassou',             'ja' => '雑草', 'category' => 'マルチアレルゲン', 'sort' => 'マルチアレルゲン'}
    ]

  # 検査単位
  TEST_UNIT =
    [
      'IU/mL',
      'UA/mL',
      'IUA/mL',
      'LC'
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

  # アレルゲンを持っているか判定する
  def allergen_possessions(test_data)
    allergen_possession_data = Array.new
    test_data.to_a.each do |allergen|
      allergen_name = allergen[0].match(/(allergen_.+)/)
      if allergen_name && (allergen[1].to_i > 1)
        ALLERGEN_DETAIL.find do |item|
          if allergen[0] == "allergen_#{item['en']}_class"
            ALLERGEN_SORT.select do |k, v|
              if v == item['sort']
                if !allergen_possession_data.include? k
                  allergen_possession_data.push << k
                end
              end
            end
          end
        end
      end
    end
    allergen_possession_data
  end
  
end