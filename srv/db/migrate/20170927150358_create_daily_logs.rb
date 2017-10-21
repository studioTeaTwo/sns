class CreateDailyLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :daily_logs do |t|
      t.references :user, foreign_key: true
      t.date :date
      t.integer :symptom, default: 0, null: false, limit: 1
      t.integer :health
      t.string :health_memo
      t.boolean :medicina
      t.string :medicina_memo
      t.string :photograph
      t.string :photograph_memo

      t.timestamps
    end
    add_index :daily_logs, :symptom
  end
end
