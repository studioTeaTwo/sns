class CreateMicroposts < ActiveRecord::Migration[5.0]
  def change
    create_table :microposts do |t|
      t.text :content
      t.references :user, foreign_key: true
      t.string :picture

      t.timestamps
    end
    add_index :microposts, [:user_id, :created_at]
  end
end
