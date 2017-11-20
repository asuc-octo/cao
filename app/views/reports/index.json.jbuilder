json.metadata do
  json.(@metadata, :total, :remaining)
end

json.items do
  json.array! @reports do |report|
    json.(report, :id, :user_id, :due_date_id, :meetings_attended, :current_projects, :expenditures, :other, :created_at, :updated_at)
    json.user_email report.user.email
    json.name User.find(report.user_id).name
    json.due_date DueDate.find(report.due_date_id).deadline
  end
end
