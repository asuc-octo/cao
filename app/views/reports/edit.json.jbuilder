json.(@report, :id, :meetings_attended, :current_projects, :expenditures, :other, :due_date)

#json.attachments do
#  json.partial! 'layouts/attachments_by_role',
#                attachment_joins_by_role: @report.all_attachment_joins_by_role
#end
