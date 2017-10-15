class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :meetings_attended
      t.string :current_projects
      t.string :expenditures
      t.string :other
      t.belongs_to :user

      t.timestamps null: false
    end

    add_index :posts, :user_id
  end
end
