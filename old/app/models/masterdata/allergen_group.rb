class Masterdata::AllergenGroup < ActiveHash::Base

  # アレルゲン種類
  self.data = [
    {:id =>  1, :en => 'allergen_group_inekakafun',  :ja => 'イネ科植物花粉'},
    {:id =>  2, :en => 'allergen_group_zassoukafun', :ja => '雑草花粉'},
    {:id =>  3, :en => 'allergen_group_jyukikafun',  :ja => '樹木花粉'},
    {:id =>  4, :en => 'allergen_group_chiri',       :ja => '室内塵'},     
    {:id =>  5, :en => 'allergen_group_dani',        :ja => 'ダニ'},      
    {:id =>  6, :en => 'allergen_group_shinkin',     :ja => '真菌'},   
    {:id =>  7, :en => 'allergen_group_saikin',      :ja => '細菌'},    
    {:id =>  8, :en => 'allergen_group_doubutsu',    :ja => '動物'},  
    {:id =>  9, :en => 'allergen_group_syokugyou',   :ja => '職業性アレルゲン'}, 
    {:id => 10, :en => 'allergen_group_tamago',      :ja => '卵'},    
    {:id => 11, :en => 'allergen_group_nyuuseihin',  :ja => '乳製品'},
    {:id => 12, :en => 'allergen_group_gyorui',      :ja => '魚類'},    
    {:id => 13, :en => 'allergen_group_koukakurui',  :ja => '甲殻類'},
    {:id => 14, :en => 'allergen_group_ikatako',     :ja => 'イカ・タコ'},   
    {:id => 15, :en => 'allergen_group_komugi',      :ja => '穀穀類（小麦）'},    
    {:id => 16, :en => 'allergen_group_komugiigai',  :ja => '穀類（小麦以外）'},
    {:id => 17, :en => 'allergen_group_nikurui',     :ja => '肉類'},   
    {:id => 18, :en => 'allergen_group_mamerui',     :ja => '豆類'},   
    {:id => 19, :en => 'allergen_group_kudamonorui', :ja => '果物類'},
    {:id => 20, :en => 'allergen_group_yasai',       :ja => '野菜'},
    {:id => 21, :en => 'allergen_group_sonota',      :ja => 'その他'},    
    {:id => 22, :en => 'allergen_group_kiseityuu',   :ja => '寄生虫'}, 
    {:id => 23, :en => 'allergen_group_yakubutsu',   :ja => '薬物'}, 
    {:id => 24, :en => 'allergen_group_kontyuu',     :ja => '昆虫'},   
    {:id => 25, :en => 'allergen_group_maruti',      :ja => 'マルチアレルゲン'}
  ]
end
