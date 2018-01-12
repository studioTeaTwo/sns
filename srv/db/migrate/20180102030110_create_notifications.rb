class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :user, foreign_key: true
      t.integer :activity_id
      t.string :activity_type
      t.integer :from_user_id
      t.boolean :is_read, default: false

      t.timestamps
    end

    add_index :notifications, [:user_id, :activity_id, :activity_type], unique: true, name: 'self_notification'
    add_index :notifications, :is_read
  end
end
