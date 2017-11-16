class ChangeDueDateName < ActiveRecord::Migration
  def change
      rename_column :due_dates, :due_date, :deadline
  end
end
