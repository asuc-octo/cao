class AddDueDatesToRoles < ActiveRecord::Migration
  def change
      add_index :due_dates, :role_id
  end
end
