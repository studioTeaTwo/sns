class CreateChatThreads < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_threads do |t|
      t.text :participants
      t.integer :newest_chat_id, default: 0

      t.timestamps
    end
  end
end
