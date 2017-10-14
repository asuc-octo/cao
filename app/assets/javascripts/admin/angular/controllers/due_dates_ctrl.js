angular.module('DueDatesCtrl', ['I18n', 'Flash', 'User'])
  .controller('DueDatesCtrl', [
    '$scope',
    function($scope) {
        /**
         * Allowed user roles.
         */
        var USER_ROLE_OPTIONS = [
          { label: 'Admin', value: "1"},
          { label: 'Executive', value: "2"},
          { label: 'CAO', value: "3"},
          { label: 'Senator', value: "4"}
        ];

        /**
         * Configuration for the user role Selectize instance.
         */
        var USER_ROLE_SELECTIZE_OPTIONS = {
          options: USER_ROLE_OPTIONS,
          labelField: 'label', valueField: 'value',
          searchField: 'label'
        };

        $scope.actionIndex = function () {
            // Select a role to view its associated due dates
            $scope.queryBuilderOptions = {
              columns: [
                {
                  name: 'role', label: 'Role', type: 'select',
                  selectizeOptions: USER_ROLE_SELECTIZE_OPTIONS
                }
              ],
              initialColumns: ['role'],
              onSubmit: function () {
                $scope.dataTableInstance.ajax.reload();
              }
            };

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
                { data: 'due_date' },
                { data: 'role_id' }
              ],
              stateSave: true, // Ensure table element has an id for this to work!
              // Save/load the query builder state along with the table state
              stateSaveParams: function (settings, data) {
                data.filters = $scope.queryBuilderFilters;
              },
              stateLoadParams: function (settings, data) {
                $scope.queryBuilderFilters = data.filters;
              }
            };

            // The 'raw' data table instance.
            // This is populated by the `datatable` directive.
            $scope.dataTableInstance = null;


            // For operations on a single row
            $scope.dataTableRowOps = {
              edit: {
                icon: 'glyphicon-pencil',
                link: function (rowId) {
                  return I18n.l('/:locale/posts/' + rowId + '/edit');
                }
              },
              delete: {
                icon: 'glyphicon-remove',
                action: function (rowId) {
                  I18n.confirm('Really delete post #' + rowId + '?',
                    'really_delete_post_id', { id: rowId }
                  ).then(function () {
                    $scope.pleaseWaitSvc.request();
                    // When performing an operation on a single row, unselect all
                    // rows to avoid any ambiguity about the scope of the operation.
                    $scope.dataTableSelectedRows.length = 0;

                    Post.remove({ postId: rowId }, null,
                      function (response) {
                        $scope.pleaseWaitSvc.release();
                        Flash.now.push('success', 'Post deleted.', 'post_deleted');

                        $scope.dataTableInstance.ajax.reload();
                      }, function (failureResponse) {
                        $scope.pleaseWaitSvc.release();

                        if (failureResponse.data.error) {
                          // We assume messages from the server are localized, so we
                          // don't need to provide a translation id.
                          Flash.now.push('danger', failureResponse.data.error);
                        } else {
                          Flash.now.push('danger', 'Error deleting post.',
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

                    User.batch_destroy({}, { ids: $scope.dataTableSelectedRows },
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
        }

    }]);
