class AddDetailToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :string
    add_column :users, :admin, :boolean, default: false
    add_column :users, :self_introduction, :text
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :integer

    add_column :users, :classification, :integer, default: 0
    add_column :users, :atopic, :boolean, default: false # アトピー
    add_column :users, :asthma, :boolean, default: false # 喘息
    add_column :users, :rhinitis, :boolean, default: false # 鼻炎
    add_column :users, :pollen, :boolean, default: false # 花粉症
    add_column :users, :gastroenteritis, :boolean, default: false # 胃腸炎
    add_column :users, :conjunctivitis, :boolean, default: false # 結膜炎

    add_column :users, :allergen_group_inekakafun, :boolean, default: false
    add_column :users, :allergen_group_zassoukafun, :boolean, default: false
    add_column :users, :allergen_group_jyukikafun, :boolean, default: false
    add_column :users, :allergen_group_chiri, :boolean, default: false
    add_column :users, :allergen_group_dani, :boolean, default: false
    add_column :users, :allergen_group_shinkin, :boolean, default: false
    add_column :users, :allergen_group_saikin, :boolean, default: false
    add_column :users, :allergen_group_doubutsu, :boolean, default: false
    add_column :users, :allergen_group_syokugyou, :boolean, default: false
    add_column :users, :allergen_group_tamago, :boolean, default: false
    add_column :users, :allergen_group_nyuuseihin, :boolean, default: false
    add_column :users, :allergen_group_gyorui, :boolean, default: false
    add_column :users, :allergen_group_koukakurui, :boolean, default: false
    add_column :users, :allergen_group_ikatako, :boolean, default: false
    add_column :users, :allergen_group_komugi, :boolean, default: false
    add_column :users, :allergen_group_komugiigai, :boolean, default: false
    add_column :users, :allergen_group_nikurui, :boolean, default: false
    add_column :users, :allergen_group_mamerui, :boolean, default: false
    add_column :users, :allergen_group_kudamonorui, :boolean, default: false
    add_column :users, :allergen_group_yasai, :boolean, default: false
    add_column :users, :allergen_group_sonota, :boolean, default: false
    add_column :users, :allergen_group_kiseityuu, :boolean, default: false
    add_column :users, :allergen_group_yakubutsu, :boolean, default: false
    add_column :users, :allergen_group_kontyuu, :boolean, default: false

    add_column :users, :access_token, :string

    add_index :users, :admin
    add_index :users, :classification
    add_index :users, :atopic
    add_index :users, :asthma
    add_index :users, :rhinitis
    add_index :users, :pollen
    add_index :users, :gastroenteritis
    add_index :users, :conjunctivitis
    add_index :users, :allergen_group_inekakafun
    add_index :users, :allergen_group_zassoukafun
    add_index :users, :allergen_group_jyukikafun
    add_index :users, :allergen_group_chiri
    add_index :users, :allergen_group_dani
    add_index :users, :allergen_group_shinkin
    add_index :users, :allergen_group_saikin
    add_index :users, :allergen_group_doubutsu
    add_index :users, :allergen_group_syokugyou
    add_index :users, :allergen_group_tamago
    add_index :users, :allergen_group_nyuuseihin
    add_index :users, :allergen_group_gyorui
    add_index :users, :allergen_group_koukakurui
    add_index :users, :allergen_group_ikatako
    add_index :users, :allergen_group_komugi
    add_index :users, :allergen_group_komugiigai
    add_index :users, :allergen_group_nikurui
    add_index :users, :allergen_group_mamerui
    add_index :users, :allergen_group_kudamonorui
    add_index :users, :allergen_group_yasai
    add_index :users, :allergen_group_sonota
    add_index :users, :allergen_group_kiseityuu
    add_index :users, :allergen_group_yakubutsu
    add_index :users, :allergen_group_kontyuu
  end
end
