json.users @users do |user|
    json.(user, :id, :name, :email)
    json.role user.roles.first.name.capitalize
    json.stipend user.stipend
    json.due_dates user.roles.collect{|role| role.due_dates}.flatten do |due_date|
        json.(due_date, :id, :role_id, :deadline)
        dd = user.reports.find{|report| report.due_date_id == due_date.id}
        if dd != nil
            d_e = ((due_date.deadline - user.reports.find{|report| report.due_date_id == due_date.id}.created_at) / 86400).truncate
            json.days_early d_e
            if d_e < -14
                json.stipend_reduction user.stipend * 0.05
            else
                json.stipend_reduction "N/A"
            end
        else
            d_e = ((Time.parse(due_date.deadline.to_s) - Time.new) / 86400).truncate
            if d_e < 0
                json.days_early "missing"
                json.stipend_reduction user.stipend * 0.05
            else
                json.days_early "chill"
                json.stipend_reduction "N/A"
            end
        end
    end
end

json.roles @roles do |role|
    json.(role, :id, :name)
    json.due_dates role.due_dates do |due_date|
        json.(due_date, :id, :deadline)
        json.users role.users do |user|
            json.(user, :id, :name, :email)
            dd = user.reports.find{|report| report.due_date_id == due_date.id}
            if dd != nil
                d_e = ((due_date.deadline - user.reports.find{|report| report.due_date_id == due_date.id}.created_at) / 86400).truncate
                json.days_early d_e
                if d_e < -14
                    json.stipend_reduction user.stipend * 0.05
                else
                    json.stipend_reduction "N/A"
                end
            else
                d_e = ((Time.parse(due_date.deadline.to_s) - Time.new) / 86400).truncate
                if d_e < 0
                    json.days_early "missing"
                    json.stipend_reduction user.stipend * 0.05
                else
                    json.days_early "chill"
                    json.stipend_reduction "N/A"
                end
            end
        end
    end
end
