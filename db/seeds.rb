# Delete everything
User.destroy_all
DueDate.destroy_all

# Create an administrator
admin = User.new name: 'Test', email: 'admin@test.com', password: 'password'
admin.grant :admin
admin.save!

# Create a bunch of other users
hahe = User.create! name: "Hannah He", email: "hahe@berkeley.edu", password: "password", stipend: 1000
arakeman = User.create! name: "Alex Rakeman", email: "arakeman@berkeley.edu", password: "password", stipend: 1000
lionming = User.create! name: "Leon Ming", email: "leon.ming@berkeley.edu", password: "password", stipend: 1000
andrewchenk = User.create! name: "Andrew Chen", email: "andrewchenk@berkeley.edu", password: "password", stipend: 1000
evancui = User.create! name: "Evan Cui", email: "evancui97@berkeley.edu", password: "password", stipend: 1000

# Assign some roles
hahe.add_role "executive"
arakeman.add_role "executive"
lionming.add_role "senator"
andrewchenk.add_role "senator"
evancui.add_role "cao"

# Create a bunch of due dates
dueDate1 = DueDate.create! role_id: 2, deadline: DateTime.now + 1
dueDate2 = DueDate.create! role_id: 2, deadline: DateTime.now + 2

dueDate21 = DueDate.create! role_id: 3, deadline: DateTime.now - 15
dueDate22 = DueDate.create! role_id: 3, deadline: DateTime.now - 14
dueDate23 = DueDate.create! role_id: 3, deadline: DateTime.now - 13
dueDate3 = DueDate.create! role_id: 3, deadline: DateTime.now - 2
dueDate4 = DueDate.create! role_id: 3, deadline: DateTime.now - 1
dueDate5 = DueDate.create! role_id: 3, deadline: DateTime.now
dueDate51 = DueDate.create! role_id: 3, deadline: DateTime.now + 1
dueDate52 = DueDate.create! role_id: 3, deadline: DateTime.now + 2

dueDate53 = DueDate.create! role_id: 4, deadline: DateTime.now - 15
dueDate54 = DueDate.create! role_id: 4, deadline: DateTime.now - 14
dueDate55 = DueDate.create! role_id: 4, deadline: DateTime.now - 13
dueDate6 = DueDate.create! role_id: 4, deadline: DateTime.now - 2
dueDate7 = DueDate.create! role_id: 4, deadline: DateTime.now - 1
dueDate8 = DueDate.create! role_id: 4, deadline: DateTime.now
dueDate9 = DueDate.create! role_id: 4, deadline: DateTime.now + 1
dueDate10 = DueDate.create! role_id: 4, deadline: DateTime.now + 2


# Create a bunch of reports
Report.create! user_id: hahe.id, due_date_id: dueDate1.id, meetings_attended: 'what.'
Report.create! user_id: hahe.id, due_date_id: dueDate2.id, meetings_attended: 'what2.'
Report.create! user_id: arakeman.id, due_date_id: dueDate1.id, meetings_attended: 'what3.'

Report.create! user_id: lionming.id, due_date_id: dueDate21.id, meetings_attended: 'hi.'
Report.create! user_id: lionming.id, due_date_id: dueDate22.id, meetings_attended: 'hi2.'
Report.create! user_id: lionming.id, due_date_id: dueDate23.id, meetings_attended: 'hi3.'
Report.create! user_id: lionming.id, due_date_id: dueDate3.id, meetings_attended: 'hi.'
Report.create! user_id: lionming.id, due_date_id: dueDate4.id, meetings_attended: 'hi2.'
Report.create! user_id: lionming.id, due_date_id: dueDate5.id, meetings_attended: 'hi3.'
Report.create! user_id: lionming.id, due_date_id: dueDate51.id, meetings_attended: 'hi.'
Report.create! user_id: lionming.id, due_date_id: dueDate52.id, meetings_attended: 'hi2.'

Report.create! user_id: andrewchenk.id, due_date_id: dueDate3.id, meetings_attended: 'hi4.'
Report.create! user_id: andrewchenk.id, due_date_id: dueDate4.id, meetings_attended: 'hi5.'


# Create a post on behalf of the administrator
admin.posts.create! message: 'Seeded post from the seeded administrator.'
