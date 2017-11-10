json.array! @users do |user|
    json.(user, :id, :name, :email)
    json.role user.roles.first.name == "cao" ? user.roles.first.name.upcase : user.roles.first.name.capitalize
    json.due_dates user.roles.collect{|role| role.due_dates}.flatten do |due_date|
        json.(due_date, :id, :role_id, :deadline)
        dd = user.reports.find{|report| report.due_date_id == due_date.id}
        if dd != nil
            json.days_early ((due_date.deadline - user.reports.find{|report| report.due_date_id == due_date.id}.created_at) / 86400).round
        else
            json.days_early "missing"
        end
    end
end
