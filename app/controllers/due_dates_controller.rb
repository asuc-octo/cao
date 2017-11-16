class DueDatesController < ApplicationController
    respond_to :json

	before_action :load_basics, except: [:index, :create]

  # This is good practice, as it provides a check that 'authorize' calls have
  # not been inadvertantly skipped.
  after_action :verify_authorized

  def index
    authorize @due_dates

    @due_dates = policy_scope(DueDate).all

    @metadata = PaginationMetadata.new(@due_dates, params[:page], params[:per])

    @due_dates = @due_dates.page(@metadata.page).per(@metadata.per)

    respond_with @due_dates

  end

  def show
    authorize @due_date

    respond_with @due_date
  end

  def create
    @due_date = DueDate.new(due_date_params)
    # authorize @due_date

    # @due_date.user = current_user
    @due_date.save

    # respond_with cleanly handles error conditions.
    # If @due_date has errors, then the response is of the form:
    #   {
    #     <other stuff>,
    #     errors: {
    #       field1: ['error msg 1', 'error msg 2', ...],
    #       field2: [...],
    #        :
    #     }
    #   }
    respond_with @due_date
  end

  def edit
    authorize @due_date

    respond_with @due_date
  end

  def update
    authorize @due_date

    @due_date.update_attributes(due_date_params)

    # respond_with cleanly handles error conditions.
    # See comments in 'create' above.
    respond_with @due_date
  end

  def destroy
    authorize @due_date

    @due_date.destroy

    respond_with @due_date
  end

  private

  def due_date_params
    params.required(:due_date).permit(:message)
  end

  def load_basics
    @due_date = DueDate.find(params[:id])
  end
end
