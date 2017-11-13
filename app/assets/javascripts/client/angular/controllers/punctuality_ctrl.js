angular.module('PunctualityCtrl', ['I18n', 'Flash', 'User'])
  .controller('PunctualityCtrl', [
    '$scope', '$state', 'I18n', 'Flash', 'User', 'initialData',
    function ($scope, $state, I18n, Flash, User, initialData) {
      /**
       * The 'index' action.
       */
      $scope.actionIndex = function () {
          var usersQuery = null;

          var fetchUsers = function () {
            $scope.users = User.query();
            console.log($scope.users);
          };

          now = new Date();
          millisecondsInADay = 8.64e+7;

          fetchUsers();
      };
      // Get data from the JSON and process it to make it easier for the view
      $scope.formatDates = function(user) {
          var dateOptions = {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
          };
          for (i = 0; i < user.due_dates.length; i++) {
              // Format the "Report Date" column to make it look prettier
              var deadline = new Date(user.due_dates[i].deadline);
              user.due_dates[i].deadline = deadline.toLocaleDateString("en-us", dateOptions);

              // Make the "Punctuality" column
              var punctuality = user.due_dates[i].days_early;
              var day = (punctuality == 1 || punctuality == -1) ? " day" : " days";
              var tardy = (punctuality < 0) ? " late :(" : " early :)";

              if (punctuality == "missing") {
                  user.due_dates[i].punctuality = "Not submitted :((";
              } else if (punctuality == "chill") {
                  user.due_dates[i].punctuality = "Not yet due, chill";
              } else if (punctuality == 0) {
                  user.due_dates[i].punctuality = "Right on time!";
              } else {
                  user.due_dates[i].punctuality = Math.abs(punctuality).toString() + day + tardy;
              }
          };
      };
      // Decide the color of the row based on whether the user has turned in the report and whether it was on time
      $scope.getColor = function(due_date) {

          var punctuality = due_date.days_early;

          if (punctuality == "missing") {
              return "danger"
          } else if (punctuality == "chill") {
              return ""
          } else if (punctuality >= 0) {
              return "success"
          } else if (punctuality < 0) {
              return "warning"
          };
      };

    }]);
