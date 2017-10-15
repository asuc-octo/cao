class Admin::DueDatesController < Admin::ApplicationController
    include BatchActions

    respond_to :json

    after_action :verify_authorized

    def index
      authorize DueDate

      due_dates_filter = QueryBuilder.new(policy_scope(DueDate), params[:filters])

      @due_dates_adapter = DataTableAdapter.new(DueDate, params, due_dates_filter.query)

      respond_with @due_dates_adapter
    end

    def destroy
      @due_date = DueDate.find(params[:id])
      authorize @due_date

      @due_date.destroy

      respond_with @due_date
    end
  end
