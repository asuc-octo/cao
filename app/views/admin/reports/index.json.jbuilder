json.draw @reports_adapter.draw
json.recordsTotal @reports_adapter.records_total
json.recordsFiltered @reports_adapter.records_filtered

json.data do
  json.array! @reports_adapter.data do |report|
    json.(report, :id, :user_id, :due_date_id, :meetings_attended, :current_projects, :expenditures, :other, :created_at)
    json.name User.find(report.user_id).name
    json.due_date DueDate.find(report.due_date_id).deadline
    json.DT_RowId report.id
  end
end
