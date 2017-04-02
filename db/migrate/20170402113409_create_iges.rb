class CreateIges < ActiveRecord::Migration[5.0]
  def change
    create_table :iges do |t|
      t.references :user, foreign_key: true
      t.date :test_date
      t.integer :test_category
      t.decimal :ige_value, precision: 24, scale: 20
      t.integer :ige_unit
      t.decimal :allergen_housedust1_value
      t.integer :allergen_housedust1_unit
      t.integer :allergen_housedust1_class
      t.decimal :allergen_housedust2_value
      t.integer :allergen_housedust2_unit
      t.integer :allergen_housedust2_class
      t.decimal :allergen_sugi_value
      t.integer :allergen_sugi_unit
      t.integer :allergen_sugi_class
      t.decimal :allergen_hinoki_value
      t.integer :allergen_hinoki_unit
      t.integer :allergen_hinoki_class
      t.decimal :allergen_hannoki_value
      t.integer :allergen_hannoki_unit
      t.integer :allergen_hannoki_class
      t.decimal :allergen_shirakanba_value
      t.integer :allergen_shirakanba_unit
      t.integer :allergen_shirakanba_class

      t.timestamps
    end
  end
end
