class CreatePersonalAssistants < ActiveRecord::Migration[5.1]
  def change
    create_table :personal_assistants do |t|
      t.references :user, foreign_key: true
      t.integer :tutorial_tatus
      t.boolean :diary_atopic
      t.boolean :diary_asthma
      t.boolean :diary_rhinitis
      t.boolean :diary_pollen
      t.boolean :diary_gastroenteritis
      t.boolean :diary_conjunctivitis

      t.timestamps
    end
  end
end
