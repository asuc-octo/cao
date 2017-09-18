# Create an administrator
admin = User.new email: 'admin@test.com', password: 'password'
admin.grant :admin
admin.save!

# Create a post on behalf of the administrator
admin.posts.create! ([{
	meetings_attended: 'Seeded post from the seeded administrator.', 
	current_projects: 'none', 
	expenditures: 'none', 
	other: 'other'}])
