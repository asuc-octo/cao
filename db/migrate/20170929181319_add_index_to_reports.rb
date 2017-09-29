class AddIndexToReports < ActiveRecord::Migration
  def change
  	add_index "reports", ["user_id"], name: "index_reports_on_user_id", using: :btree
  end
end
