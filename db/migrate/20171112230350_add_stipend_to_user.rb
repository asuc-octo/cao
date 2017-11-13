class AddStipendToUser < ActiveRecord::Migration
  def change
      add_column :users, :stipend, :integer
  end
end
