class CreatePersonalAssistants < ActiveRecord::Migration[5.1]
  def change
    create_table :personal_assistants do |t|
      t.references :user, foreign_key: true
      t.integer :tutorial_status
      t.boolean :daily_atopic # アトピー
      t.boolean :daily_asthma # 喘息
      t.boolean :daily_rhinitis # 鼻炎
      t.boolean :daily_pollen # 花粉症
      t.boolean :daily_gastroenteritis # 胃腸炎
      t.boolean :daily_conjunctivitis # 結膜炎

      t.timestamps
    end
  end
end
