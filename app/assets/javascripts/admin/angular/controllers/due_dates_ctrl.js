angular.module('DueDatesCtrl', ['I18n', 'Flash', 'DueDate'])
  .controller('DueDatesCtrl', [
    '$scope', '$state', 'I18n', 'Flash', 'DueDate', 'initialData',
    function($scope, $state, I18n, Flash, DueDate, initialData) {
        /**
         * Allowed user roles for search.
         */
        var USER_ROLE_SEARCH_OPTIONS = [
            { label: 'Admin', value: '1'},
            { label: 'Executive', value: '2'},
            { label: 'Senator', value: '3'},
            { label: 'CAO', value: '4'}
        ];

        /**
         * Configuration for the user role Selectize instance, for search.
         */
        var USER_ROLE_SEARCH_SELECTIZE_OPTIONS = {
          options: USER_ROLE_SEARCH_OPTIONS,
          labelField: 'label', valueField: 'value',
          searchField: 'label'
        };

        /**
         * Allowed user roles for due date creation.
         */
        var USER_ROLE_CREATION_OPTIONS = [
            { label: 'Admin', value: 'admin'},
            { label: 'Executive', value: 'executive'},
            { label: 'Senator', value: 'senator'},
            { label: 'CAO', value: 'cao'}
        ];

        /**
         * Configuration for the user role Selectize instance for due date creation.
         */
        var USER_ROLE_CREATION_SELECTIZE_OPTIONS = {
          options: USER_ROLE_CREATION_OPTIONS,
          labelField: 'label', valueField: 'value',
          searchField: 'label'
        };

        $scope.actionIndex = function () {

            $scope.dataTableOptions = {
              serverSide: true,
              ajax: {
                url: I18n.l('/admin/:locale/due_dates.json'),
                // Just add the query builder filters to all AJAX requests sent by
                // the data table!
                data: function (d) {
                  d.filters = $scope.queryBuilderFilters;
                }
              },
              searching: false, // Since we are using query builder
              processing: true, // Show the 'processing' indicator
              columns: [
                { data: 'id' },
                { data: 'deadline',
                  render: function (data, type, row, meta) {
                    return moment(data).format('lll');
                  }
                },
                { data: 'role_id' },
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
            //   edit: {
            //     icon: 'glyphicon-pencil',
            //     link: function (rowId) {
            //       return I18n.l('/:locale/due_dates/' + rowId + '/edit');
            //     }
            //   },
              delete: {
                icon: 'glyphicon-remove',
                action: function (rowId) {
                  I18n.confirm('Really delete due date #' + rowId + '?',
                    'really_delete_post_id', { id: rowId }
                  ).then(function () {
                    $scope.pleaseWaitSvc.request();
                    // When performing an operation on a single row, unselect all
                    // rows to avoid any ambiguity about the scope of the operation.
                    $scope.dataTableSelectedRows.length = 0;

                    DueDate.remove({ dueDateId: rowId }, null,
                      function (response) {
                        $scope.pleaseWaitSvc.release();
                        Flash.now.push('success', 'Due date deleted.', 'post_deleted');

                        $scope.dataTableInstance.ajax.reload();
                      }, function (failureResponse) {
                        $scope.pleaseWaitSvc.release();

                        if (failureResponse.data.error) {
                          // We assume messages from the server are localized, so we
                          // don't need to provide a translation id.
                          Flash.now.push('danger', failureResponse.data.error);
                        } else {
                          Flash.now.push('danger', 'Error deleting due date.',
                            'error_deleting_post');
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
                  I18n.confirm('Really delete due dates?',
                    'really_delete_users').then(function () {

                    $scope.pleaseWaitSvc.request();

                    DueDate.batch_destroy({}, { ids: $scope.dataTableSelectedRows },
                      function (response) {
                        $scope.pleaseWaitSvc.release();
                        Flash.now.push('success', 'Due dates deleted.',
                          'users_deleted');

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
                          Flash.now.push('danger', 'Error deleting due dates.',
                            'error_deleting_users');
                        }
                      });
                  });
                }
              }
            };
            // Select a role to view its associated due dates
            $scope.queryBuilderOptions = {
              columns: [
                {
                  name: 'role_id', label: 'Role', type: 'select',
                  selectizeOptions: USER_ROLE_SEARCH_SELECTIZE_OPTIONS
                }
              ],
              initialColumns: ['role_id'],
              onSubmit: function () {
                $scope.dataTableInstance.ajax.reload();
              }
            };
            $scope.queryBuilderFilters = [];
        };

        /**
         * The 'new' action.
         * Builds an empty due date for the form.
         */
        $scope.actionNew = function () {

          $scope.due_date = initialData;
          console.log($scope.due_date);
          $scope.userRoleSelectizeOptions = USER_ROLE_CREATION_SELECTIZE_OPTIONS;
        };

        /**
         * The 'create' action.
         * If there are validation errors on the server side, then populates the
         * `userErrors` scope variable with these errors.
         */
        $scope.actionCreate = function () {
          $scope.due_date.deadline = new Date($scope.due_date.deadline);
          $scope.pleaseWaitSvc.request();

          $scope.due_date.$save(function (response) {
            $scope.pleaseWaitSvc.release();
            Flash.push('success', 'Due date created.');

            $scope.navConfirmationSvc.setConfirmNav(false);
            $state.go('app.due_dates.index');
          }, function (failureResponse) {
            $scope.pleaseWaitSvc.release();
            $scope.dueDateErrors = failureResponse.data.errors;
          });
        };


    }]);
