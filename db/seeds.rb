# Delete everything
User.destroy_all
DueDate.destroy_all

# Create an administrator
admin = User.new name: 'Andrew Chen', email: 'admin@test.com', password: 'password'
admin.grant :admin
admin.save!

# Create a due date
dueDate = DueDate.create! role_id: 1, deadline: DateTime.now + 1

# Create a post on behalf of the administrator
admin.posts.create! message: 'Seeded post from the seeded administrator.'


# Create a report on behalf of the administrator
Report.create! user_id: admin.id, due_date_id: dueDate.id, meetings_attended: 'testing.'
