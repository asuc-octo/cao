json.(@report, :id, :meetings_attended, :current_projects, :expenditures, :other, :created_at, :updated_at, :user_id)
json.user_email @report.user.email

# json.attachments do
#   json.partial! 'layouts/attachments_by_role',
#                 attachment_joins_by_role: @report.all_attachment_joins_by_role
# end
