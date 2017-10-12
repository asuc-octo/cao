angular.module('DueDatesCtrl', ['I18n', 'Flash', 'User'])
  .controller('DueDatesCtrl', [
    '$scope',
    function($scope) {
        /**
         * Allowed user roles.
         */
        var USER_ROLE_OPTIONS = [
          { label: 'Admin', value: "admin"},
          { label: 'Executive', value: "executive"},
          { label: 'CAO', value: "cao"},
          { label: 'Senator', value: "senator"}
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
                url: I18n.l('/admin/:locale/users.json'),
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
                { data: 'role_id',
                  searchable: false, orderable: false,
                  render: function (data, type, row, meta) {
                    return _.map(data, function (role) {
                      return $filter('translate')(role);
                    }).join(', ')
                  }
                },
                // An example of bypassing the data table `row-ops` functionality,
                // and instead manually setting up some row operations. Why we have
                // done this: To show you its easily possible. Why you would do it:
                // If the standard `row-ops` functionality doesn't support what you
                // want to do.
                //
                // Also see the corresponding Angular view at
                // /app/assets/javascripts/templates/admin/controllers/users/index.html,
                // where a 'row ops' column has been manually added, to accommodate
                // this column definition.
                // { // data: 'actions', // Not really required for this column!
                //   searchable: false, orderable: false,
                //   className: 'dt-body-center',
                //   render: function (data, type, row, meta) {
                //     var editHtml =
                //       '<a ui-sref="app.users.edit({ id: ' + row.id + ' })">'
                //         + '<span class="glyphicon glyphicon-pencil"></span>' +
                //       '</a>';
                //
                //     var deleteHtml =
                //       '<a ng-click="deleteUser(' + row.id + ')">'
                //         + '<span class="glyphicon glyphicon-remove"></span>' +
                //       '</a>';
                //
                //     return editHtml + '&nbsp;' + deleteHtml;
                //   }
                // }
              ],
              order: [[2, 'asc']],
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

            // To enable row selection
            $scope.dataTableSelectedRows = [];

            // For bulk operations on currently selected rows
            $scope.dataTableBulkOps = {}
            //   deleteAll: {
            //     name: 'Delete all',
            //     action: function () {
            //       I18n.confirm('Really delete users?',
            //         'really_delete_users').then(function () {
            //
            //         $scope.pleaseWaitSvc.request();
            //
            //         User.batch_destroy({}, { ids: $scope.dataTableSelectedRows },
            //           function (response) {
            //             $scope.pleaseWaitSvc.release();
            //             Flash.now.push('success', 'Users deleted.',
            //               'users_deleted');
            //
            //             $scope.dataTableInstance.ajax.reload(); // Reload table data
            //             $scope.dataTableSelectedRows.length = 0;
            //           },
            //           function (failureResponse) {
            //             $scope.pleaseWaitSvc.release();
            //
            //             if (failureResponse.data.error) {
            //               // We assume messages from the server are localized, so we
            //               // don't need to provide a translation id.
            //               Flash.now.push('danger', failureResponse.data.error);
            //             } else {
            //               Flash.now.push('danger', 'Error deleting users.',
            //                 'error_deleting_users');
            //             }
            //           });
            //       });
            //     }
            //   }
            // };
        }

    }]);
