json.array! @current_user.roles.collect{|role| role.due_dates}.flatten do |due_date|
    json.(due_date, :id, :role_id, :deadline)
end
