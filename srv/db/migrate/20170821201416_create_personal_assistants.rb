class CreatePersonalAssistants < ActiveRecord::Migration[5.1]
  def change
    create_table :personal_assistants do |t|
      t.references :user, foreign_key: true
      t.integer :tutorial_tatus
      t.boolean :diary_atopic # アトピー
      t.boolean :diary_asthma # 喘息
      t.boolean :diary_rhinitis # 鼻炎
      t.boolean :diary_pollen # 花粉症
      t.boolean :diary_gastroenteritis # 胃腸炎
      t.boolean :diary_conjunctivitis # 結膜炎

      t.timestamps
    end
  end
end
