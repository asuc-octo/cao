class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.text :meetings_attended
      t.text :current_projects
      t.text :expenditures
      t.text :other

      t.timestamps null: false
    end
  end
end
