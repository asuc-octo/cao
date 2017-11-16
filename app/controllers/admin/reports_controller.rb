class Admin::ReportsController < Admin::ApplicationController
  include BatchActions

  respond_to :json

  after_action :verify_authorized

  def index
    authorize Report

    reports_filter = QueryBuilder.new(Report, params[:filters])

    @reports_adapter = DataTableAdapter.new(Report, params, reports_filter.query)

    respond_with @reports_adapter
  end

  def destroy
    @report = Report.find(params[:id])
    authorize @report

    @report.destroy

    respond_with @report
  end
end
