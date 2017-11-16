json.(@post, :id, :meetings_attended, :current_projects, :expenditures, :other, :created_at, :updated_at, :user_id)
json.user_email @post.user.email

json.attachments do
  json.partial! 'layouts/attachments_by_role',
                attachment_joins_by_role: @post.all_attachment_joins_by_role
end
