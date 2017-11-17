class PunctualityController < ApplicationController
    respond_to :json

    def index
        @users = User.all
        respond_with @users
    end
end
