class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.references :chat_thread, foreign_key: true
      t.references :sender, foreign_key: { to_table: :users }
      t.text :body

      t.timestamps
    end
  end
end
