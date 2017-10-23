class ChangeBillsDueDate < ActiveRecord::Migration[5.1]
  def change
    remove_column :bills, :due_date
    add_column :bills, :due_date, :date, null: false
  end
end
