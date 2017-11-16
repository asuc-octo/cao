class PunctualityController < ApplicationController
    respond_to :json

    def index
        @users = User.all
        # render json: @users
        respond_with @users
    end
end
