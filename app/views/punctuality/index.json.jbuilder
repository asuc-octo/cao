# json.users(@users, :id, :name, :email)
#
# json.reports @users.reports, :id, :due_date_id


json.array! @users do |user|
  json.(user, :id, :name, :email)
  json.reports user.reports, :id, :due_date_id
end
