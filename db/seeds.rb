# Delete everything 
User.destroy_all
DueDate.destroy_all

# Create an administrator
admin = User.new email: 'admin@test.com', password: 'password'
admin.grant :admin
admin.save!

# Create a due date
dueDate = DueDate.create! role_id: 1, due_date: DateTime.now

# Create a post on behalf of the administrator
# <<<<<<< HEAD
# admin.posts.create! message: 'Seeded post from the seeded administrator.'


# Create a report on behalf of the administrator
Report.create! user_id: admin.id, due_date_id: dueDate.id, meetings_attended: 'testing.'
# =======
admin.posts.create! ([{
	meetings_attended: 'Seeded post from the seeded administrator.', 
	current_projects: 'none', 
	expenditures: 'none', 
	other: 'other'}])
# >>>>>>> migrate_post_logic_to_reports
