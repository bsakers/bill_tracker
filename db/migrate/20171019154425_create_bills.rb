class CreateBills < ActiveRecord::Migration[5.1]
  def change
    create_table :bills do |t|
      t.string :name, null: false
      t.string :due_date, null: false
      t.integer :cost
      t.string :source
      t.boolean :paid, default: false

      t.timestamps
    end
  end
end
