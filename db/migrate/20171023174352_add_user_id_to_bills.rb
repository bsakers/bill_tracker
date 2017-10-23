class AddUserIdToBills < ActiveRecord::Migration[5.1]
  def change
    add_column :bills, :user_id, :integer, null: false
  end
end
