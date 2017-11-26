class PunctualityController < ApplicationController
    respond_to :json

    def index
        @users = User.all
        @roles = Role.all
        respond_with @users
    end
end
