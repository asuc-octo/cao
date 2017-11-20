angular.module('ReportsCtrl', ['AuthSvc', 'I18n', 'Flash', 'Report', 'User', 'AttachmentLibrarySvc'])
  .controller('ReportsCtrl', [
    '$scope', '$state', 'AuthSvc', 'I18n', 'Flash', 'Report', 'User', 'AttachmentLibrarySvc',
    'initialData',
    function ($scope, $state, AuthSvc, I18n, Flash, Report, User, AttachmentLibrarySvc,
              initialData) {

      /**
       * The 'index' action.
       */
      $scope.actionIndex = function () {
        var reportsQuery = null;
        var userQuery = null;

        var fetchUser = _.debounce(function () {
          $scope.pleaseWaitSvc.request();

          userQuery = User.query();


          userQuery.$promise.then(function (response) {
            $scope.users = response;
            $scope.users = _.sortBy($scope.users, "id")
            console.log($scope.users);

          }, function (failureResponse) {
            // Do something on failure
          }).finally(function () {
            $scope.pleaseWaitSvc.release();
          });
        }, 400);

        if (userQuery) {
          userQuery.$cancelRequest();
          userQuery = null;
        }

        fetchUser();

        // Debounce the reports retrieval.
        // This code is merely illustrative. In the case of this particular
        // action, no debouncing is required.
        var fetchReports = _.debounce(function () {
          $scope.pleaseWaitSvc.request();

          reportsQuery = Report.query();


          reportsQuery.$promise.then(function (response) {
            $scope.reports = response;
            $scope.reports = _.groupBy(_.sortBy($scope.reports, "due_date"), "user_id");
            console.log($scope.reports);

          }, function (failureResponse) {
            // Do something on failure
          }).finally(function () {
            $scope.pleaseWaitSvc.release();
          });
        }, 400);

        // Cancel old request if pending.
        // This code is merely illustrative. In the case of this particular
        // action, no cancelling is required.
        if (reportsQuery) {
          reportsQuery.$cancelRequest();
          reportsQuery = null;
        }

        fetchReports();


      };

      /**
       * The 'show' action.
       */
      $scope.actionShow = function () {
        $scope.report = initialData;
      };

      /**
       * The 'new' action.
       * Builds an empty report for the form.
       */
      $scope.actionNew = function () {
        $scope.report = initialData;
        datesQuery = Report.new();
        datesQuery.$promise.then(function (response) {
          $scope.due_date_options = response;
          console.log($scope.due_date_options);
        });

        dateOptions = {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
        };

        $scope.formatDate = function(date) {
            return (new Date(date)).toLocaleDateString("en-us", dateOptions);
        }
      };

      /**
       * The 'create' action.
       * If there are validation errors on the server side, then populates the
       * `reportErrors` scope variable with these errors.
       */
      $scope.actionCreate = function () {
        $scope.pleaseWaitSvc.request();
        console.log($scope.report);
        $scope.report.$save(function (response) {
          $scope.pleaseWaitSvc.release();
          Flash.push('success', 'Report created.', 'report_created');

          $scope.navConfirmationSvc.setConfirmNav(false);
          $state.go('app.reports.index');
        }, function (failureResponse) {
          $scope.pleaseWaitSvc.release();
          $scope.reportErrors = failureResponse.data.errors;
        });
      };

      /**
       * The 'edit' action.
       */
      $scope.actionEdit = function () {
        AttachmentLibrarySvc.setVisible(true);

        $scope.report = initialData;
      };

      /**
       * The 'update' action.
       * If there are validation errors on the server side, then populates the
       * `reportErrors` scope variable with these errors.
       */
      $scope.actionUpdate = function () {
        $scope.pleaseWaitSvc.request();

        $scope.report.$update(function (response) {
          $scope.pleaseWaitSvc.release();
          Flash.push('success', 'Report updated.', 'report_updated');

          $scope.navConfirmationSvc.setConfirmNav(false);
          $state.go('app.reports.index');
        }, function (failureResponse) {
          $scope.pleaseWaitSvc.release();
          $scope.reportErrors = failureResponse.data.errors;
        });
      };

      /**
       * The 'destroy' action.
       */
      $scope.actionDestroy = function () {
        I18n.confirm('Really delete report?',
          'really_delete_report').then(function () {

          $scope.pleaseWaitSvc.request();

          $scope.report.$delete(function (response) {
            $scope.pleaseWaitSvc.release();
            Flash.push('success', 'Report deleted.', 'report_deleted');

            $scope.navConfirmationSvc.setConfirmNav(false);
            $state.go('app.reports.index');
          }, function (failureResponse) {
            $scope.pleaseWaitSvc.release();
            if (failureResponse.data.error) {
              // We assume messages from the server are localized, so we don't
              // need to provide a translation id.
              Flash.push('danger', failureResponse.data.error);
            } else {
              Flash.push('danger', 'Error deleting report.',
                'error_deleting_report');
            }
          });
        });
      };
    }]);
