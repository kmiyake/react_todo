class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :done
      t.integer :creator_id

      t.timestamps null: false
    end
  end
end
