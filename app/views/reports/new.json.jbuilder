@available_dates = @current_user.roles.collect{|role| role.due_dates}.flatten.select{|due_date| @current_user.reports.find_by(due_date_id: due_date.id) == nil}

json.array! @available_dates do |due_date|
    json.(due_date, :id, :role_id, :deadline)
end
