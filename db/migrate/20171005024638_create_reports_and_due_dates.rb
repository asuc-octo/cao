class CreateReportsAndDueDates < ActiveRecord::Migration
  def change
    create_table :due_dates do |t|
    	t.datetime :due_date, null: false
    	t.belongs_to :role
    end

    create_table :reports do |t|
    	t.text :meetings_attended
    	t.text :current_projects
    	t.text :expenditures
    	t.text :other
    	t.belongs_to :due_date
    	t.belongs_to :user

    	t.timestamps null: false
    end

    add_index :reports, :user_id
    add_index :reports, :due_date_id

  end
end
