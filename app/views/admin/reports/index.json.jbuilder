json.draw @reports_adapter.draw
json.recordsTotal @reports_adapter.records_total
json.recordsFiltered @reports_adapter.records_filtered

json.data do
  json.array! @reports_adapter.data do |report|
    json.(report, :id, :meetings_attended, :current_projects, :expenditures, :other, :created_at)
    json.DT_RowId report.id
  end
end