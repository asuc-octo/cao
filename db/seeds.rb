# Create an administrator
admin = User.new email: 'admin@test.com', password: 'password'
admin.grant :admin
admin.save!

# Create a post on behalf of the administrator
admin.posts.create! message: 'Seeded post from the seeded administrator.'
