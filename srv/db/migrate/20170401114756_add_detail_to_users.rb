class AddDetailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :text
    add_column :users, :admin, :boolean, default: false
    add_column :users, :self_introduction, :text
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :integer
  end
end
