class Admin::DueDatesController < Admin::ApplicationController
    include BatchActions

    respond_to :json


    before_action :load_basics, only: [:edit, :update, :destroy]
    after_action :verify_authorized

    def index
      authorize DueDate

      due_dates_filter = QueryBuilder.new(policy_scope(DueDate), params[:filters])

      @due_dates_adapter = DataTableAdapter.new(DueDate, params, due_dates_filter.query)

      respond_with @due_dates_adapter
    end

    def create
      @due_date = DueDate.new(due_date_params)
      authorize @due_date

      @due_date.save

      respond_with @due_date, location: admin_due_dates_url
    end

    def destroy
      @due_date = DueDate.find(params[:id])
      authorize @due_date

      @due_date.destroy

      respond_with @due_date
    end

    private

    def due_date_params
      params.required(:due_date).permit(:role_id, :due_date)
    end

    def load_basics
      @due_date = DueDate.find(params[:id])
    end
end
