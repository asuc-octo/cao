class RemoveIndexFromPosts < ActiveRecord::Migration
  def change
  	remove_index :posts, column: :user_id
  end
end
