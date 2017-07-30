class CreateApiSamples < ActiveRecord::Migration[5.1]
  def change
    create_table :api_samples do |t|

      t.timestamps
    end
  end
end
