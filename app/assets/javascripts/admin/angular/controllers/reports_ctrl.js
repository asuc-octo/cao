angular.module('ReportsCtrl', ['I18n', 'Flash', 'Report'])
  .controller('ReportsCtrl', [
    '$scope', 'I18n', 'Flash', 'Report',
    function($scope, I18n, Flash, Report) {
      $scope.actionIndex = function () {
        $scope.dataTableOptions = {
          serverSide: true,
          ajax: {
            url: I18n.l('/admin/:locale/reports.json'),
            // Just add the query builder filters to all AJAX requests sent by
            // the data table!
            data: function (d) {
              d.filters = $scope.queryBuilderFilters;
            }
          },
          searching: false, // Since we are using query builder
          processing: true, // Show the 'processing' indicator
          columns: [
            { data: 'id',
              render: function (data, type, row, meta) {
                var reportUrl = I18n.l('/:locale/reports/' + data);

                return '<a href="' + reportUrl + '">' + data + '</a>';
              }
            },
            { data: 'name'},
            { data: 'meetings_attended' },
            { data: 'current_projects' },
            { data: 'expenditures' },
            { data: 'other' },
            { data: 'created_at',
              render: function (data, type, row, meta) {
                return moment(data).format('lll');
              }
            },
            { data: 'due_date',
              render: function (data, type, row, meta) {
                return moment(data).format('lll');
              }
            }
          ],
          stateSave: true, // Ensure table element has an id for this to work!
          // Save/load the query builder state along with the table state
          stateSaveParams: function (settings, data) {
            data.filters = $scope.queryBuilderFilters;
          },
          stateLoadParams: function (settings, data) {
            $scope.queryBuilderFilters = data.filters || [];
          }
        };

        // The 'raw' data table instance.
        // This is populated by the `datatable` directive.
        $scope.dataTableInstance = null;

        // For operations on a single row
        $scope.dataTableRowOps = {
          edit: {
            //TODO: THIS NEEDS TO BE DRASTICALLY CHANGED TO ALLOW ADMINS TO ACTUALLY EDIT REPORTS
            icon: 'glyphicon-pencil',
            link: function (rowId) {
              return I18n.l('/:locale/reports/' + rowId + '/edit');
            }
          },
          delete: {
            icon: 'glyphicon-remove',
            action: function (rowId) {
              I18n.confirm('Really delete report #' + rowId + '?',
                'really_delete_report_id', { id: rowId }
              ).then(function () {
                $scope.pleaseWaitSvc.request();
                // When performing an operation on a single row, unselect all
                // rows to avoid any ambiguity about the scope of the operation.
                $scope.dataTableSelectedRows.length = 0;

                Report.remove({ reportId: rowId }, null,
                  function (response) {
                    $scope.pleaseWaitSvc.release();
                    Flash.now.push('success', 'Report deleted.', 'report_deleted');

                    $scope.dataTableInstance.ajax.reload();
                  }, function (failureResponse) {
                    $scope.pleaseWaitSvc.release();

                    if (failureResponse.data.error) {
                      // We assume messages from the server are localized, so we
                      // don't need to provide a translation id.
                      Flash.now.push('danger', failureResponse.data.error);
                    } else {
                      Flash.now.push('danger', 'Error deleting report.',
                        'error_deleting_report');
                    }
                  });
              });
            }
          }
        };

        // To enable row selection
        $scope.dataTableSelectedRows = [];

        // For bulk operations on currently selected rows
        $scope.dataTableBulkOps = {
          deleteAll: {
            name: 'Delete all',
            action: function () {
              I18n.confirm('Really delete reports?',
                'really_delete_reports').then(function () {

                $scope.pleaseWaitSvc.request();

                Report.batch_destroy({}, { ids: $scope.dataTableSelectedRows },
                  function (response) {
                    $scope.pleaseWaitSvc.release();
                    Flash.now.push('success', 'Reports deleted.',
                      'reports_deleted');

                    $scope.dataTableInstance.ajax.reload(); // Reload table data
                    $scope.dataTableSelectedRows.length = 0;
                  },
                  function (failureResponse) {
                    $scope.pleaseWaitSvc.release();

                    if (failureResponse.data.error) {
                      // We assume messages from the server are localized, so we
                      // don't need to provide a translation id.
                      Flash.now.push('danger', failureResponse.data.error);
                    } else {
                      Flash.now.push('danger', 'Error deleting reports.',
                        'error_deleting_reports');
                    }
                  });
              });
            }
          }
        };

        // For showing expanded row information
        $scope.dataTableExpandedRowInfo = function () {
          return 'If possible, put report data here';
        };

        $scope.queryBuilderOptions = {
          columns: [
            { name: 'meetings_attended', label: 'Meetings Attended', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'current_projects', label: 'Current Projects', type: 'text' },
            { name: 'expenditures', label: 'Expenditures', type: 'text' },
            { name: 'other', label: 'Other', type: 'text' },
            // See `query-builder` for why 'id' column has type 'text'
            { name: 'id', label: 'ID', type: 'text' },
            { name: 'created_at', label: 'Created At', type: 'date' },
            { name: 'due_date', label: 'Due Date', type: 'date' }
          ],
          initialColumns: ['current_projects', 'id'],
          onSubmit: function () {
            $scope.dataTableInstance.ajax.reload();
          }
        };
        $scope.queryBuilderFilters = [];
      };
    }]);
