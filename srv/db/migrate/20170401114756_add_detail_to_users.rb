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

    add_column :users, :access_token, :string
  end
  add_index :users, :admin
  add_index :users, :classification
  add_index :users, :atopic
  add_index :users, :asthma
  add_index :users, :rhinitis
  add_index :users, :pollen
  add_index :users, :gastroenteritis
  add_index :users, :conjunctivitis
end
