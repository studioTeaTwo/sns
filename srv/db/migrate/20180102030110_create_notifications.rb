class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :user, foreign_key: true
      t.integer :activity_id
      t.string :activity_type

      t.timestamps
    end
  end
end
