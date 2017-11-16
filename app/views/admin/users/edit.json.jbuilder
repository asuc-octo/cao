json.(@user, :id, :email, :name, :created_at)
json.roles @user.roles.pluck(:name)
