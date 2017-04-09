class CreateIges < ActiveRecord::Migration[5.0]
  def change
    create_table :iges do |t|
      t.references :user, foreign_key: true
      t.date :test_date
      t.integer :test_category
      t.decimal :ige_value, precision: 24, scale: 20
      t.integer :ige_unit
      t.decimal :allergen_housedust1_value
      t.integer :allergen_housedust1_unit
      t.integer :allergen_housedust1_class
      t.decimal :allergen_housedust2_value
      t.integer :allergen_housedust2_unit
      t.integer :allergen_housedust2_class
      t.decimal :allergen_yakehyoudani_value
      t.integer :allergen_yakehyoudani_unit
      t.integer :allergen_yakehyoudani_class 
      t.decimal :allergen_sugi_value
      t.integer :allergen_sugi_unit
      t.integer :allergen_sugi_class
      t.decimal :allergen_hinoki_value
      t.integer :allergen_hinoki_unit
      t.integer :allergen_hinoki_class
      t.decimal :allergen_hannoki_value
      t.integer :allergen_hannoki_unit
      t.integer :allergen_hannoki_class
      t.decimal :allergen_shirakanba_value
      t.integer :allergen_shirakanba_unit
      t.integer :allergen_shirakanba_class
      t.decimal :allergen_harugaya_value
      t.integer :allergen_harugaya_unit
      t.integer :allergen_harugaya_class
      t.decimal :allergen_kamogaya_value
      t.integer :allergen_kamogaya_unit
      t.integer :allergen_kamogaya_class
      t.decimal :allergen_ooawagaeri_value
      t.integer :allergen_ooawagaeri_unit
      t.integer :allergen_ooawagaeri_class
      t.decimal :allergen_butakusa_value
      t.integer :allergen_butakusa_unit
      t.integer :allergen_butakusa_class
      t.decimal :allergen_yomogi_value
      t.integer :allergen_yomogi_unit
      t.integer :allergen_yomogi_class
      t.decimal :allergen_alternaria_value
      t.integer :allergen_alternaria_unit
      t.integer :allergen_alternaria_class
      t.decimal :allergen_aspergillosis_value
      t.integer :allergen_aspergillosis_unit
      t.integer :allergen_aspergillosis_class
      t.decimal :allergen_candida_value
      t.integer :allergen_candida_unit
      t.integer :allergen_candida_class
      t.decimal :allergen_malassezia_value
      t.integer :allergen_malassezia_unit
      t.integer :allergen_malassezia_class
      t.decimal :allergen_neko_value
      t.integer :allergen_neko_unit
      t.integer :allergen_neko_class
      t.decimal :allergen_inu_value
      t.integer :allergen_inu_unit
      t.integer :allergen_inu_class
      t.decimal :allergen_kato_value # 家兎
      t.integer :allergen_kato_unit
      t.integer :allergen_kato_class
      t.decimal :allergen_gokiburi_value
      t.integer :allergen_gokiburi_unit
      t.integer :allergen_gokiburi_class
      t.decimal :allergen_ga_value
      t.integer :allergen_ga_unit
      t.integer :allergen_ga_class
      t.decimal :allergen_gyunyu_value
      t.integer :allergen_gyunyu_unit
      t.integer :allergen_gyunyu_class
      t.decimal :allergen_ranpaku_value
      t.integer :allergen_ranpaku_unit
      t.integer :allergen_ranpaku_class
      t.decimal :allergen_ovomucoid_value
      t.integer :allergen_ovomucoid_unit
      t.integer :allergen_ovomucoid_class
      t.decimal :allergen_kome_value
      t.integer :allergen_kome_unit
      t.integer :allergen_kome_class
      t.decimal :allergen_komugi_value
      t.integer :allergen_komugi_unit
      t.integer :allergen_komugi_class
      t.decimal :allergen_soba_value
      t.integer :allergen_soba_unit
      t.integer :allergen_soba_class
      t.decimal :allergen_daizu_value
      t.integer :allergen_daizu_unit
      t.integer :allergen_daizu_class
      t.decimal :allergen_peanuts_value
      t.integer :allergen_peanuts_unit
      t.integer :allergen_peanuts_class
      t.decimal :allergen_ringo_value
      t.integer :allergen_ringo_unit
      t.integer :allergen_ringo_class
      t.decimal :allergen_banana_value
      t.integer :allergen_banana_unit
      t.integer :allergen_banana_class
      t.decimal :allergen_kiwi_value
      t.integer :allergen_kiwi_unit
      t.integer :allergen_kiwi_class
      t.decimal :allergen_goma_value
      t.integer :allergen_goma_unit
      t.integer :allergen_goma_class
      t.decimal :allergen_gyuniku_value
      t.integer :allergen_gyuniku_unit
      t.integer :allergen_gyuniku_class
      t.decimal :allergen_butaniku_value
      t.integer :allergen_butaniku_unit
      t.integer :allergen_butaniku_class
      t.decimal :allergen_toriniku_value
      t.integer :allergen_toriniku_unit
      t.integer :allergen_toriniku_class
      t.decimal :allergen_ebi_value
      t.integer :allergen_ebi_unit
      t.integer :allergen_ebi_class
      t.decimal :allergen_kani_value
      t.integer :allergen_kani_unit
      t.integer :allergen_kani_class
      t.decimal :allergen_saba_value
      t.integer :allergen_saba_unit
      t.integer :allergen_saba_class
      t.decimal :allergen_sake_value
      t.integer :allergen_sake_unit
      t.integer :allergen_sake_class
      t.decimal :allergen_maguro_value
      t.integer :allergen_maguro_unit
      t.integer :allergen_maguro_class
      t.decimal :allergen_latex_value
      t.integer :allergen_latex_unit
      t.integer :allergen_latex_class

      t.timestamps
    end
  end
end