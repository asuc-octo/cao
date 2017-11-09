json.metadata do
  json.(@metadata, :total, :remaining)
end

json.items do
  json.array! @reports do |report|
    json.(report, :id, :meetings_attended, :current_projects, :expenditures, :other, :created_at, :updated_at, :user_id)
    json.user_email report.user.email
  end
end
