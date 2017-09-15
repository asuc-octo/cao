json.(@user, :id, :email, :created_at)
json.roles @user.roles.pluck(:name)
