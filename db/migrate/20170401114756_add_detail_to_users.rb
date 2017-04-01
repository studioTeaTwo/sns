class AddDetailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :self_introduction, :string
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :string
    add_column :users, :latest_ige_id, :integer
  end
end
