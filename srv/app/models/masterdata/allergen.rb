# @name MasterAllergen
#
# @attr [integer] id
# @attr [string] en
# @attr [string] ja
# @attr [string] category
# @attr [string] allergenGroup
class Masterdata::Allergen < ActiveHash::Base

  # アレルゲン詳細 
  # 項目の参考:http://data.medience.co.jp/allergy/allergy_ctg.cgi?ctg=1
  # 英名の参考:http://plaza.umin.ac.jp/~kuhp-kensa/reference/item/6444.html
  self.data = [
      {:id =>   1, :en => 'harugaya',           :ja => 'ハルガヤ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   2, :en => 'gyougishiba',        :ja  => 'ギョウギシバ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   3, :en => 'kamogaya',           :ja => 'カモガヤ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   4, :en => 'hirohaushinokegusa', :ja => 'ヒロハウシノケグサ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   5, :en => 'hosomugi',           :ja => 'ホソムギ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   6, :en => 'ooawagaeri',         :ja => 'オオアワガエリ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   7, :en => 'ashi',               :ja => 'アシ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   8, :en => 'nagahagusa',         :ja => 'ナガハグサ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>   9, :en => 'konukagusaZoku',     :ja => 'コヌカグサ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>  10, :en => 'seibanmorokoshi',    :ja  => 'セイバンモロコシ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>  11, :en => 'komugiZoku',         :ja => '小麦（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>  12, :en => 'oosuzumenoteppou',   :ja => 'オオスズメノテッポウ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>  13, :en => 'suzumenohieZoku',    :ja  => 'スズメノヒエ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => 'イネ科植物花粉'},
      {:id =>  14, :en => 'butakusakongoubu1',  :ja  => 'ブタクサ混合物1', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  15, :en => 'butakusa',           :ja => 'ブタクサ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  16, :en => 'butakusamodoki',     :ja => 'ブタクサモドキ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  17, :en => 'oobutakusa',         :ja => 'オオブタクサ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  18, :en => 'nigayomogi',         :ja => 'ニガヨモギ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  19, :en => 'yomogi',             :ja => 'ヨモギ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  20, :en => 'huransugiku',        :ja  => 'フランスギク', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  21, :en => 'tanpopoZoku',        :ja  => 'タンポポ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  22, :en => 'heraobako',          :ja  => 'ヘラオオバコ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  23, :en => 'shiroza',            :ja  => 'シロザ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  24, :en => 'akinokirinsou',      :ja  => 'アキノキリンソウ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  25, :en => 'himesuiba',          :ja  => 'ヒメスイバ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  26, :en => 'irakusaZoku',        :ja  => 'イラクサ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  27, :en => 'kanamugura',         :ja => 'カナムグラ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '雑草花粉'},
      {:id =>  28, :en => 'kaedeZoku',          :ja  => 'カエデ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  29, :en => 'hannokiZoku',        :ja  => 'ハンノキ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  30, :en => 'shirakanbaZoku',     :ja => 'シラカンバ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  31, :en => 'bunaZoku',           :ja => 'ブナ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  32, :en => 'byakushinZoku',      :ja  => 'ビャクシン（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  33, :en => 'konaraZoku',         :ja => 'コナラ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  34, :en => 'nireZoku',           :ja => 'ニレ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  35, :en => 'olive',              :ja  => 'オリーブ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  36, :en => 'kurumiZoku',         :ja => 'クルミ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  37, :en => 'yanagiZoku',         :ja => 'ヤナギ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  38, :en => 'matsuZoku',          :ja  => 'マツ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  39, :en => 'sugi',               :ja => 'スギ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  40, :en => 'acaciaZoku',         :ja => 'アカシア（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  41, :en => 'hinoki',             :ja => 'ヒノキ', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  42, :en => 'kuwaZoku',           :ja => 'クワ（属）', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '樹木花粉'},
      {:id =>  43, :en => 'housedust1',         :ja => 'ハウスダスト１', :category => '吸入性アレルゲン（花粉）', :allergenGroup => '室内塵'},
      {:id =>  44, :en => 'housedust2',         :ja => 'ハウスダスト２', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '室内塵'},
      {:id =>  45, :en => 'yakehyouhidani',     :ja => 'ヤケヒョウヒダニ（ダニ１）', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => 'ダニ'},
      {:id =>  46, :en => 'konahyouhidani',     :ja => 'コナヒョウヒダニ', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => 'ダニ'},
      {:id =>  47, :en => 'ashibutokonadani',   :ja => 'アシブトコナダニ', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => 'ダニ'},
      {:id =>  48, :en => 'sayaashinidani',     :ja => 'サヤアシニクダニ', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => 'ダニ'},
      {:id =>  49, :en => 'kenagakonadani',     :ja => 'ケナガコナダニ', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => 'ダニ'},
      {:id =>  50, :en => 'penicillium',        :ja  => 'ペニシリウム', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  51, :en => 'cladosporium',       :ja => 'クラドスポリウム', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  52, :en => 'aspergillosis',      :ja  => 'アスペルギルス', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  53, :en => 'mucor',              :ja  => 'ムコール', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  54, :en => 'candida',            :ja  => 'カンジダ', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  55, :en => 'alternaria',         :ja => 'アルテルナリア', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  56, :en => 'helminthosporium',   :ja => 'ヘルミントスポリウム', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  57, :en => 'pityrosporium',      :ja  => 'ピティロスポリウム', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  58, :en => 'trichophyton',       :ja => 'トリコフィトン(白癬菌）', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  59, :en => 'malassezia',         :ja => 'マラセチア', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '真菌'},
      {:id =>  60, :en => 'kiirobudoukyukinA',  :ja  => '黄色ブドウ球菌A', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '細菌'},
      {:id =>  61, :en => 'kiirobudoukyukinB',  :ja  => '黄色ブドウ球菌B', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '細菌'},
      {:id =>  62, :en => 'nekoHisetsu',        :ja  => 'ネコ皮屑', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  63, :en => 'umaHisetsu',         :ja => 'ウマ皮屑', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  64, :en => 'ushiHisetsu',        :ja  => 'ウシ皮屑', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  65, :en => 'inuHisetsu',         :ja => 'イヌ皮屑', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  66, :en => 'marmotJyouhi',       :ja => 'モルモット上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  67, :en => 'hatoFun',            :ja  => 'ハトのふん', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  68, :en => 'gatyouUmou',         :ja => 'ガチョウ羽毛', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  69, :en => 'sekiseiinkoFun',     :ja => 'セキセイインコのふん', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  70, :en => 'sekiseiinkoUmou',    :ja  => 'セキセイインコ羽毛', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  71, :en => 'yagiJyouhi',         :ja => 'ヤギ上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  72, :en => 'hitsujiJyouhi',      :ja  => '羊上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  73, :en => 'katoJyouhi',         :ja => '家兎上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  74, :en => 'butaJyouhi',         :ja => '豚上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  75, :en => 'hamsterJyouhi',      :ja  => 'ハムスター上皮', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  76, :en => 'niwatoriUmou',       :ja => 'ニワトリ羽毛', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  77, :en => 'ahiruUmou',          :ja  => 'アヒル羽毛', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  78, :en => 'ratt',               :ja => 'ラット', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  79, :en => 'mouse',              :ja  => 'マウス', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '動物'},
      {:id =>  80, :en => 'oobakosyushi',       :ja => 'オオバコ種子', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  81, :en => 'kinu',               :ja => '絹', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  82, :en => 'isocyanateTDI',      :ja  => 'イソシアネートTDI', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  83, :en => 'isocyanateMDI',      :ja  => 'イソシアネートMDI', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  84, :en => 'isocyanateHDI',      :ja  => 'イソシアネートHDI', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  85, :en => 'ethyleneoxide',      :ja  => 'エチレンオキサイド', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  86, :en => 'musuihutalsan',      :ja  => '無水フタル酸', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  87, :en => 'formalin',           :ja => 'ホルマリン', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  88, :en => 'latex',              :ja  => 'ラテックス', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  89, :en => 'men',                :ja  => '綿', :category => '吸入性アレルゲン（花粉以外）', :allergenGroup => '職業性アレルゲン'},
      {:id =>  90, :en => 'ranpaku',            :ja  => '卵白', :category => '食餌系アレルゲン', :allergenGroup => '卵'},
      {:id =>  91, :en => 'ranou',              :ja  => '卵黄', :category => '食餌系アレルゲン', :allergenGroup => '卵'},
      {:id =>  92, :en => 'ovomucoid',          :ja  =>  'オボムコイド', :category => '食餌系アレルゲン', :allergenGroup => '卵'},
      {:id =>  93, :en => 'milk',               :ja => 'ミルク', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  94, :en => 'alpha_actalbumin',   :ja => 'α－ラクトアルブミン', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  95, :en => 'beta_lactoglobulin', :ja => 'β－ラクトグロブリン', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  96, :en => 'casein',             :ja => 'カゼイン', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  97, :en => 'cheese',             :ja => 'チーズ', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  98, :en => 'moldcheese',         :ja => 'モールドチーズ', :category => '食餌系アレルゲン', :allergenGroup => '乳製品'},
      {:id =>  99, :en => 'tara',               :ja => 'タラ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 100, :en => 'maguro',             :ja => 'マグロ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 101, :en => 'sake',               :ja => 'サケ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 102, :en => 'saba',               :ja => 'サバ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 103, :en => 'aji',                :ja  => 'アジ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 104, :en => 'iwashi',             :ja => 'イワシ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 105, :en => 'karei',              :ja  => 'カレイ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 106, :en => 'ikura',              :ja  => 'イクラ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 107, :en => 'tarako',             :ja => 'タラコ', :category => '食餌系アレルゲン', :allergenGroup => '魚類'},
      {:id => 108, :en => 'kani',               :ja => 'カニ', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 109, :en => 'ebi',                :ja  => 'エビ', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 110, :en => 'murasakigai',        :ja  => 'ムラサキイガイ（ムール貝）', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 111, :en => 'lobster',            :ja  => 'ロブスター', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 112, :en => 'asari',              :ja  => 'アサリ', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 113, :en => 'kaki',               :ja => 'カキ(貝）', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 114, :en => 'hotate',             :ja => 'ホタテ', :category => '食餌系アレルゲン', :allergenGroup => '甲殻類'},
      {:id => 115, :en => 'ika',                :ja  => 'イカ', :category => '食餌系アレルゲン', :allergenGroup => 'イカ・タコ'},
      {:id => 116, :en => 'tako',               :ja => 'タコ', :category => '食餌系アレルゲン', :allergenGroup => 'イカ・タコ'},
      {:id => 117, :en => 'komugi',             :ja => '小麦', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦）'},
      {:id => 118, :en => 'gluten',             :ja => 'グルテン', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦）'},
      {:id => 119, :en => 'oh_5gliadin',        :ja  => 'ω－５グリアジン', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦）'},
      {:id => 120, :en => 'raimugi',            :ja  => 'ライ麦', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 121, :en => 'oomugi',             :ja => '大麦', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 122, :en => 'ootomugi',           :ja => 'オート麦', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 123, :en => 'toumorokoshi',       :ja => 'トウモロコシ', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 124, :en => 'kome',               :ja => '米', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 125, :en => 'soba',               :ja => 'ソバ', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 126, :en => 'beerkoubo',          :ja  => 'ビール酵母', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 127, :en => 'kibi',               :ja => 'キビ', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 128, :en => 'awa',                :ja  => 'アワ', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 129, :en => 'hie',                :ja  => 'ヒエ', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 130, :en => 'bakuga',             :ja => '麦芽', :category => '食餌系アレルゲン', :allergenGroup => '穀類（小麦以外）'},
      {:id => 131, :en => 'butaniku',           :ja => '豚肉', :category => '食餌系アレルゲン', :allergenGroup => '肉類'},
      {:id => 132, :en => 'gyuniku',            :ja  => '牛肉', :category => '食餌系アレルゲン', :allergenGroup => '肉類'},
      {:id => 133, :en => 'toriniku',           :ja => '鶏肉', :category => '食餌系アレルゲン', :allergenGroup => '肉類'},
      {:id => 134, :en => 'youniku',            :ja  => '羊肉', :category => '食餌系アレルゲン', :allergenGroup => '肉類'},
      {:id => 135, :en => 'endou',              :ja  => 'エンドウ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 136, :en => 'peanuts',            :ja  => 'ピーナッツ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 137, :en => 'daizu',              :ja  => '大豆', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 138, :en => 'ingen',              :ja  => 'インゲン', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 139, :en => 'hashibami',          :ja  => 'ハシバミ（ヘーゼルナッツ）', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 140, :en => 'brazilnuts',         :ja => 'ブラジルナッツ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 141, :en => 'almond',             :ja => 'アーモンド', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 142, :en => 'coconut',            :ja  => 'ココナッツ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 143, :en => 'cacao',              :ja  => 'カカオ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 144, :en => 'cashewnuts',         :ja => 'カシューナッツ', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 145, :en => 'kurumi',             :ja => 'クルミ（実）', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 146, :en => 'arah2',              :ja  => 'Ara h 2 （ピーナッツ由来）', :category => '食餌系アレルゲン', :allergenGroup => '豆類'},
      {:id => 147, :en => 'orange',             :ja => 'オレンジ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 148, :en => 'ichigo',             :ja => 'イチゴ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 149, :en => 'ringo',              :ja  => 'リンゴ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 150, :en => 'kiwi',               :ja => 'キウイ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 151, :en => 'melon',              :ja  => 'メロン', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 152, :en => 'mango',              :ja  => 'マンゴ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 153, :en => 'banana',             :ja => 'バナナ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 154, :en => 'younashi',           :ja => '洋ナシ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 155, :en => 'momo',               :ja => 'モモ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 156, :en => 'avocado',            :ja  => 'アボカド', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 157, :en => 'grapefruit',         :ja => 'グレープフルーツ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 158, :en => 'suika',              :ja  => 'スイカ', :category => '食餌系アレルゲン', :allergenGroup => '果物類'},
      {:id => 159, :en => 'tomato',             :ja => 'トマト', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 160, :en => 'ninjin',             :ja => 'ニンジン', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 161, :en => 'jyagaimo',           :ja => 'ジャガイモ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 162, :en => 'ninniku',            :ja  => 'ニンニク', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 163, :en => 'tamanegi',           :ja => 'タマネギ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 164, :en => 'takenoko',           :ja => 'タケノコ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 165, :en => 'satsumaimo',         :ja => 'サツマイモ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 166, :en => 'celery',             :ja => 'セロリ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 167, :en => 'parsley',            :ja  => 'パセリ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 168, :en => 'yamaimo',            :ja  => 'ヤマイモ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 169, :en => 'hourensou',          :ja  => 'ホウレンソウ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 170, :en => 'kabocha',            :ja  => 'カボチャ', :category => '食餌系アレルゲン', :allergenGroup => '野菜'},
      {:id => 171, :en => 'hitoinsulin_food',   :ja => 'ヒトインシュリン（ヒトインスリン）', :category => '食餌系アレルゲン', :allergenGroup => 'その他'},
      {:id => 172, :en => 'gelatin',            :ja  => 'ゼラチン', :category => '食餌系アレルゲン', :allergenGroup => 'その他'},
      {:id => 173, :en => 'goma',               :ja => 'ゴマ', :category => '食餌系アレルゲン', :allergenGroup => 'その他'},
      {:id => 174, :en => 'mustard',            :ja  => 'マスタード', :category => '食餌系アレルゲン', :allergenGroup => 'その他'},
      {:id => 175, :en => 'kaichu',             :ja => 'カイチュウ', :category => 'その他のアレルゲン', :allergenGroup => '寄生虫'},
      {:id => 176, :en => 'anisakis',           :ja => 'アニサキス', :category => 'その他のアレルゲン', :allergenGroup => '寄生虫'},
      {:id => 177, :en => 'hitoinsulin_etc',    :ja  => 'ヒトインシュリン（ヒトインスリン）', :category => 'その他のアレルゲン', :allergenGroup => '薬物'},
      {:id => 178, :en => 'mitsubachi',         :ja => 'ミツバチ', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 179, :en => 'suzumebachi',        :ja  => 'スズメバチ', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 180, :en => 'ashinagabachi',      :ja  => 'アシナガバチ', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 181, :en => 'gokiburi',           :ja => 'ゴキブリ', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 182, :en => 'yusurika',           :ja => 'ユスリカ（成虫）', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 183, :en => 'ga',                 :ja => 'ガ', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 184, :en => 'yabuka',             :ja => 'ヤブカ（属）', :category => 'その他のアレルゲン', :allergenGroup => '昆虫'},
      {:id => 185, :en => 'doubutsuJyouhi',     :ja => '動物上皮', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'},
      {:id => 186, :en => 'syokumotsu',         :ja => '食物', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'},
      {:id => 187, :en => 'kokumotsu',          :ja  => '穀物', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'},
      {:id => 188, :en => 'ineka',              :ja  => 'イネ科', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'},
      {:id => 189, :en => 'kabi',               :ja => 'カビ', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'},
      {:id => 190, :en => 'zassou',             :ja => '雑草', :category => 'マルチアレルゲン', :allergenGroup => 'マルチアレルゲン'}
    ]
end
