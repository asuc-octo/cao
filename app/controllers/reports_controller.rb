class ReportsController < ApplicationController
	respond_to :json

	before_action :load_basics, except: [:index, :create, :potential_due_dates]

	# This is good practice, as it provides a check that 'authorize' calls have
	# not been inadvertantly skipped.
	after_action :verify_authorized

	def index
	  authorize Report

	  @reports = policy_scope(Report).includes(:user)

	  @metadata = PaginationMetadata.new(@reports, params[:page], params[:per])

	  @reports = @reports.page(@metadata.page).per(@metadata.per)

	  respond_with @reports
	end

	def show
	  authorize @report

	  respond_with @report
	end

	def create
	  @report = Report.new(report_params)
	  authorize @report

	  @report.user = current_user
	  @report.save

	  # respond_with cleanly handles error conditions.
	  # If @report has errors, then the response is of the form:
	  #   {
	  #     <other stuff>,
	  #     errors: {
	  #       field1: ['error msg 1', 'error msg 2', ...],
	  #       field2: [...],
	  #        :
	  #     }
	  #   }
	  respond_with @report
	end

	def edit
	  authorize @report

	  respond_with @report
	end

	def update
	  authorize @report

	  @report.update_attributes(report_params)

	  # respond_with cleanly handles error conditions.
	  # See comments in 'create' above.
	  respond_with @report
	end

	def destroy
	  authorize @report

	  @report.destroy

	  respond_with @report
	end

	def potential_due_dates
		puts current_user.roles[0].due_dates
	  respond_with current_user.roles[0].due_dates
	end

	private

	def report_params
	  params.required(:report).permit(:message)
	end

	def load_basics
	  @report = Report.find(params[:id])
	end
end
