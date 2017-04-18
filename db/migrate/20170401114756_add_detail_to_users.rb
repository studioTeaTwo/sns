class AddDetailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :self_introduction, :text
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :integer
    add_column :users, :latest_ige_id, :integer
  end
end
