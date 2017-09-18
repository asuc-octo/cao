json.metadata do
  json.(@metadata, :total, :remaining)
end

json.items do
  json.array! @posts do |post|
    json.(post, :id, :meetings_attended, :current_projects, :expenditures, :other, :created_at, :updated_at, :user_id)
    json.user_email post.user.email
  end
end
