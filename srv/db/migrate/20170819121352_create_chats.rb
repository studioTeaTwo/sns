class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.references :chat_thread, foreign_key: true
      t.references :sender, foreign_key: { to_table: :users }
      t.integer :content_type # 0 発言 1 YesNo 2 checkbox 3 radio
      t.text :body
      t.text :item_list
      t.string :result
      t.boolean :expired, default: false

      t.timestamps
    end
  end
end
