json.(@report, :id, :meetings_attended, :current_projects, :expenditures, :other, :due_date)
json.due_date_options @report.user.roles.collect{|role| role.due_dates}.flatten do |due_date|
    json.(due_date, :id, :role_id, :deadline)
end
#json.attachments do
#  json.partial! 'layouts/attachments_by_role',
#                attachment_joins_by_role: @report.all_attachment_joins_by_role
#end
