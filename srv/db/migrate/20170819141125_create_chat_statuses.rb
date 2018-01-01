class CreateChatStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_statuses do |t|
      t.references :user, foreign_key: true
      t.references :chat_thread, foreign_key: true
      t.integer :read_until, default: 0
      t.boolean :has_unread, default: false

      t.timestamps
    end
  end
end
