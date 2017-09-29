class AddDueDateToReports < ActiveRecord::Migration
  def change
  	add_column :reports, :due_date, :date
  end
end
