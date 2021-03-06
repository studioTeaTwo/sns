class CreateIges < ActiveRecord::Migration[5.1]
  def change
    create_table :iges do |t|
      t.references :user, foreign_key: true
      t.date :test_date
      t.boolean :latest_test_result, default: false
      t.integer :test_category
      t.decimal :ige_value, precision: 24, scale: 20
      t.integer :ige_unit
      t.boolean :allergen_group_inekakafun,  default: false
      t.boolean :allergen_group_zassoukafun, default: false
      t.boolean :allergen_group_jyukikafun,  default: false
      t.boolean :allergen_group_chiri,       default: false
      t.boolean :allergen_group_dani,        default: false
      t.boolean :allergen_group_shinkin,     default: false
      t.boolean :allergen_group_saikin,      default: false
      t.boolean :allergen_group_doubutsu,    default: false
      t.boolean :allergen_group_syokugyou,   default: false
      t.boolean :allergen_group_tamago,      default: false
      t.boolean :allergen_group_nyuuseihin,  default: false
      t.boolean :allergen_group_gyorui,      default: false
      t.boolean :allergen_group_koukakurui,  default: false
      t.boolean :allergen_group_ikatako,     default: false
      t.boolean :allergen_group_komugi,      default: false
      t.boolean :allergen_group_komugiigai,  default: false
      t.boolean :allergen_group_nikurui,     default: false
      t.boolean :allergen_group_mamerui,     default: false
      t.boolean :allergen_group_kudamonorui, default: false
      t.boolean :allergen_group_yasai,       default: false
      t.boolean :allergen_group_sonota,      default: false
      t.boolean :allergen_group_kiseityuu,   default: false
      t.boolean :allergen_group_yakubutsu,   default: false
      t.boolean :allergen_group_kontyuu,     default: false
      t.boolean :allergen_group_maruti,      default: false
      t.integer :allergen_harugaya_class
      t.integer :allergen_gyougishiba_class
      t.integer :allergen_kamogaya_class
      t.integer :allergen_hirohaushinokegusa_class
      t.integer :allergen_hosomugi_class
      t.integer :allergen_ooawagaeri_class 
      t.integer :allergen_ashi_class    
      t.integer :allergen_nagahagusa_class 
      t.integer :allergen_konukagusaZoku_class 
      t.integer :allergen_seibanmorokoshi_class   
      t.integer :allergen_komugiZoku_class  
      t.integer :allergen_oosuzumenoteppou_class  
      t.integer :allergen_suzumenohieZoku_class
      t.integer :allergen_butakusakongoubu1_class 
      t.integer :allergen_butakusa_class
      t.integer :allergen_butakusamodoki_class    
      t.integer :allergen_oobutakusa_class 
      t.integer :allergen_nigayomogi_class 
      t.integer :allergen_yomogi_class  
      t.integer :allergen_huransugiku_class
      t.integer :allergen_tanpopoZoku_class 
      t.integer :allergen_heraobako_class  
      t.integer :allergen_shiroza_class 
      t.integer :allergen_akinokirinsou_class     
      t.integer :allergen_himesuiba_class  
      t.integer :allergen_irakusaZoku_class 
      t.integer :allergen_kanamugura_class 
      t.integer :allergen_kaedeZoku_class   
      t.integer :allergen_hannokiZoku_class 
      t.integer :allergen_shirakanbaZoku_class 
      t.integer :allergen_bunaZoku_class    
      t.integer :allergen_byakushinZoku_class  
      t.integer :allergen_konaraZoku_class  
      t.integer :allergen_nireZoku_class    
      t.integer :allergen_olive_class   
      t.integer :allergen_kurumiZoku_class  
      t.integer :allergen_yanagiZoku_class  
      t.integer :allergen_matsuZoku_class   
      t.integer :allergen_sugi_class    
      t.integer :allergen_acaciaZoku_class  
      t.integer :allergen_hinoki_class  
      t.integer :allergen_kuwaZoku_class    
      t.integer :allergen_housedust1_class 
      t.integer :allergen_housedust2_class 
      t.integer :allergen_yakehyouhidani_class    
      t.integer :allergen_konahyouhidani_class    
      t.integer :allergen_ashibutokonadani_class  
      t.integer :allergen_sayaashinidani_class    
      t.integer :allergen_kenagakonadani_class    
      t.integer :allergen_penicillium_class
      t.integer :allergen_cladosporium_class      
      t.integer :allergen_aspergillosis_class     
      t.integer :allergen_mucor_class   
      t.integer :allergen_candida_class 
      t.integer :allergen_alternaria_class 
      t.integer :allergen_helminthosporium_class  
      t.integer :allergen_pityrosporium_class     
      t.integer :allergen_trichophyton_class      
      t.integer :allergen_malassezia_class 
      t.integer :allergen_kiirobudoukyukinA_class 
      t.integer :allergen_kiirobudoukyukinB_class 
      t.integer :allergen_nekoHisetsu_class
      t.integer :allergen_umaHisetsu_class 
      t.integer :allergen_ushiHisetsu_class
      t.integer :allergen_inuHisetsu_class 
      t.integer :allergen_marmotJyouhi_class      
      t.integer :allergen_hatoFun_class 
      t.integer :allergen_gatyouUmou_class 
      t.integer :allergen_sekiseiinkoFun_class    
      t.integer :allergen_sekiseiinkoUmou_class   
      t.integer :allergen_yagiJyouhi_class 
      t.integer :allergen_hitsujiJyouhi_class     
      t.integer :allergen_katoJyouhi_class 
      t.integer :allergen_butaJyouhi_class 
      t.integer :allergen_hamsterJyouhi_class     
      t.integer :allergen_niwatoriUmou_class      
      t.integer :allergen_ahiruUmou_class  
      t.integer :allergen_ratt_class    
      t.integer :allergen_mouse_class   
      t.integer :allergen_oobakosyushi_class      
      t.integer :allergen_kinu_class    
      t.integer :allergen_isocyanateTDI_class     
      t.integer :allergen_isocyanateMDI_class     
      t.integer :allergen_isocyanateHDI_class     
      t.integer :allergen_ethyleneoxide_class     
      t.integer :allergen_musuihutalsan_class     
      t.integer :allergen_formalin_class
      t.integer :allergen_latex_class   
      t.integer :allergen_men_class     
      t.integer :allergen_ranpaku_class 
      t.integer :allergen_ranou_class   
      t.integer :allergen_ovomucoid_class  
      t.integer :allergen_milk_class    
      t.integer :allergen_alpha_actalbumin_class  
      t.integer :allergen_beta_lactoglobulin_class
      t.integer :allergen_casein_class  
      t.integer :allergen_cheese_class  
      t.integer :allergen_moldcheese_class 
      t.integer :allergen_tara_class    
      t.integer :allergen_maguro_class  
      t.integer :allergen_sake_class    
      t.integer :allergen_saba_class    
      t.integer :allergen_aji_class     
      t.integer :allergen_iwashi_class  
      t.integer :allergen_karei_class   
      t.integer :allergen_ikura_class   
      t.integer :allergen_tarako_class  
      t.integer :allergen_kani_class    
      t.integer :allergen_ebi_class     
      t.integer :allergen_murasakigai_class
      t.integer :allergen_lobster_class 
      t.integer :allergen_asari_class   
      t.integer :allergen_kaki_class    
      t.integer :allergen_hotate_class  
      t.integer :allergen_ika_class     
      t.integer :allergen_tako_class    
      t.integer :allergen_komugi_class  
      t.integer :allergen_gluten_class  
      t.integer :allergen_oh_5gliadin_class
      t.integer :allergen_raimugi_class 
      t.integer :allergen_oomugi_class  
      t.integer :allergen_ootomugi_class
      t.integer :allergen_toumorokoshi_class      
      t.integer :allergen_kome_class    
      t.integer :allergen_soba_class    
      t.integer :allergen_beerkoubo_class  
      t.integer :allergen_kibi_class    
      t.integer :allergen_awa_class     
      t.integer :allergen_hie_class     
      t.integer :allergen_bakuga_class  
      t.integer :allergen_butaniku_class
      t.integer :allergen_gyuniku_class 
      t.integer :allergen_toriniku_class
      t.integer :allergen_youniku_class 
      t.integer :allergen_endou_class   
      t.integer :allergen_peanuts_class 
      t.integer :allergen_daizu_class   
      t.integer :allergen_ingen_class   
      t.integer :allergen_hashibami_class  
      t.integer :allergen_brazilnuts_class 
      t.integer :allergen_almond_class  
      t.integer :allergen_coconut_class 
      t.integer :allergen_cacao_class   
      t.integer :allergen_cashewnuts_class 
      t.integer :allergen_kurumi_class  
      t.integer :allergen_arah2_class   
      t.integer :allergen_orange_class  
      t.integer :allergen_ichigo_class  
      t.integer :allergen_ringo_class   
      t.integer :allergen_kiwi_class    
      t.integer :allergen_melon_class   
      t.integer :allergen_mango_class   
      t.integer :allergen_banana_class  
      t.integer :allergen_younashi_class
      t.integer :allergen_momo_class    
      t.integer :allergen_avocado_class 
      t.integer :allergen_grapefruit_class 
      t.integer :allergen_suika_class   
      t.integer :allergen_tomato_class  
      t.integer :allergen_ninjin_class  
      t.integer :allergen_jyagaimo_class
      t.integer :allergen_ninniku_class 
      t.integer :allergen_tamanegi_class
      t.integer :allergen_takenoko_class
      t.integer :allergen_satsumaimo_class 
      t.integer :allergen_celery_class  
      t.integer :allergen_parsley_class 
      t.integer :allergen_yamaimo_class 
      t.integer :allergen_hourensou_class  
      t.integer :allergen_kabocha_class 
      t.integer :allergen_hitoinsulin_food_class  
      t.integer :allergen_gelatin_class 
      t.integer :allergen_goma_class    
      t.integer :allergen_mustard_class 
      t.integer :allergen_kaichu_class  
      t.integer :allergen_anisakis_class
      t.integer :allergen_hitoinsulin_etc_class   
      t.integer :allergen_mitsubachi_class 
      t.integer :allergen_suzumebachi_class
      t.integer :allergen_ashinagabachi_class     
      t.integer :allergen_gokiburi_class
      t.integer :allergen_yusurika_class
      t.integer :allergen_ga_class      
      t.integer :allergen_yabuka_class  
      t.integer :allergen_doubutsuJyouhi_class    
      t.integer :allergen_syokumotsu_class 
      t.integer :allergen_kokumotsu_class  
      t.integer :allergen_ineka_class   
      t.integer :allergen_kabi_class    
      t.integer :allergen_zassou_class
      t.timestamps
    end
    add_index :iges, :test_date
    add_index :iges, :latest_test_result
    add_index :iges, :allergen_group_inekakafun
    add_index :iges, :allergen_group_zassoukafun
    add_index :iges, :allergen_group_jyukikafun
    add_index :iges, :allergen_group_chiri
    add_index :iges, :allergen_group_dani
    add_index :iges, :allergen_group_shinkin
    add_index :iges, :allergen_group_saikin
    add_index :iges, :allergen_group_doubutsu
    add_index :iges, :allergen_group_syokugyou
    add_index :iges, :allergen_group_tamago
    add_index :iges, :allergen_group_nyuuseihin
    add_index :iges, :allergen_group_gyorui
    add_index :iges, :allergen_group_koukakurui
    add_index :iges, :allergen_group_ikatako
    add_index :iges, :allergen_group_komugi
    add_index :iges, :allergen_group_komugiigai
    add_index :iges, :allergen_group_nikurui
    add_index :iges, :allergen_group_mamerui
    add_index :iges, :allergen_group_kudamonorui
    add_index :iges, :allergen_group_yasai
    add_index :iges, :allergen_group_sonota
    add_index :iges, :allergen_group_kiseityuu
    add_index :iges, :allergen_group_yakubutsu
    add_index :iges, :allergen_group_kontyuu
    add_index :iges, :allergen_group_maruti  
  end
end
