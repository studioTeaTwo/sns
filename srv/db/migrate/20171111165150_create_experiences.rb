class CreateExperiences < ActiveRecord::Migration[5.1]
  def change
    create_table :experiences do |t|
      t.references :user, foreign_key: true
      t.integer :activity_id
      t.string :activity_type
      t.integer :from_user_id
      
      t.timestamps
    end

    add_index :experiences, [:user_id, :activity_id, :activity_type], unique: true, name: 'self_experience'
  end
end
