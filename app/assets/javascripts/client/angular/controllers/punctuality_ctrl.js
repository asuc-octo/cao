angular.module('PunctualityCtrl', ['I18n', 'Flash', 'User'])
  .controller('PunctualityCtrl', [
    '$scope', '$state', 'I18n', 'Flash', 'User', 'initialData',
    function ($scope, $state, I18n, Flash, User, initialData) {
      /**
       * The 'index' action.
       */
      $scope.actionIndex = function () {
          var usersQuery = null;

          // Debounce the posts retrieval.
          // This code is merely illustrative. In the case of this particular
          // action, no debouncing is required.
          var fetchUsers = function () {
            $scope.users = User.query();
            console.log($scope.users);
          };
          fetchUsers();
      };
      $scope.formatDates = function(user) {
          console.log("clicked!");
          dateOptions = {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
          };
          for (i = 0; i < user.due_dates.length; i++) {
              user.due_dates[i].deadline = (new Date(user.due_dates[i].deadline)).toLocaleDateString("en-us", dateOptions);
          };
        //   user.reports = user.due_dates;
      };
      $scope.getColor = function(report) {
          punctuality = report.days_early;
          if (punctuality == null) {
              return "danger"
          } else if (punctuality >= 0) {
              return "success"
          } else {
              return "warning"
          };
      };

    }]);
