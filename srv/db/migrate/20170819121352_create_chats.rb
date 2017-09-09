class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.references :chat_thread, foreign_key: true
      t.references :sender, foreign_key: { to_table: :users }
      t.integer :content_type # 1 発言 2 YesNo 3 checkbox 4 radio
      t.text :body
      t.text :item_list
      t.string :result
      t.boolean :expired, default: false

      t.timestamps
    end
  end
end
