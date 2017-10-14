json.draw @due_dates_adapter.draw
json.recordsTotal @due_dates_adapter.records_total
json.recordsFiltered @due_dates_adapter.records_filtered

json.data do
  json.array! @due_dates_adapter.data do |due_date|
    json.(due_date, :id, :due_date, :role_id)
    json.DT_RowId due_date.id
  end
end
