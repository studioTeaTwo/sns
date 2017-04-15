class AddDetailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :self_introduction, :text
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :integer
    add_column :users, :latest_ige_id, :integer
    add_column :users, :latest_ige_value, :integer
    add_column :users, :allergen_sort_inekakafun,  :boolean, default: false
    add_column :users, :allergen_sort_zassoukafun, :boolean, default: false
    add_column :users, :allergen_sort_jyukikafun,  :boolean, default: false
    add_column :users, :allergen_sort_chiri,       :boolean, default: false
    add_column :users, :allergen_sort_dani,        :boolean, default: false
    add_column :users, :allergen_sort_shinkin,     :boolean, default: false
    add_column :users, :allergen_sort_saikin,      :boolean, default: false
    add_column :users, :allergen_sort_doubutsu,    :boolean, default: false
    add_column :users, :allergen_sort_syokugyou,   :boolean, default: false
    add_column :users, :allergen_sort_tamago,      :boolean, default: false
    add_column :users, :allergen_sort_nyuuseihin,  :boolean, default: false
    add_column :users, :allergen_sort_gyorui,      :boolean, default: false
    add_column :users, :allergen_sort_koukakurui,  :boolean, default: false
    add_column :users, :allergen_sort_ikatako,     :boolean, default: false
    add_column :users, :allergen_sort_komugi,      :boolean, default: false
    add_column :users, :allergen_sort_komugiigai,  :boolean, default: false
    add_column :users, :allergen_sort_nikurui,     :boolean, default: false
    add_column :users, :allergen_sort_mamerui,     :boolean, default: false
    add_column :users, :allergen_sort_kudamonorui, :boolean, default: false
    add_column :users, :allergen_sort_sonota,      :boolean, default: false
    add_column :users, :allergen_sort_kiseityuu,   :boolean, default: false
    add_column :users, :allergen_sort_yakubutsu,   :boolean, default: false
    add_column :users, :allergen_sort_kontyuu,     :boolean, default: false
    add_column :users, :allergen_sort_maruti,      :boolean, default: false
  end
end
