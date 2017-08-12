class AddDetailToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :text
    add_column :users, :admin, :boolean, default: false
    add_column :users, :self_introduction, :text
    add_column :users, :rank, :integer
    add_column :users, :title_of_honor, :integer

    add_column :users, :access_token, :string
  end
end
