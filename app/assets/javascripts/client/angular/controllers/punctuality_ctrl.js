angular.module('PunctualityCtrl', ['I18n', 'Flash', 'User'])
  .controller('PunctualityCtrl', [
    '$scope', '$state', 'I18n', 'Flash', 'User', 'initialData',
    function ($scope, $state, I18n, Flash, User, initialData) {
      /**
       * The 'index' action.
       */
      $scope.actionIndex = function () {
          $scope.view_option = 'by user';

          var fetchData = function () {
            json_query = User.query();
            console.log(json_query);
            json_query.$promise.then(function (response) {
                $scope.users = response.users;
                $scope.users = _.sortBy($scope.users, "id");
                $scope.roles = response.roles;
                $scope.roles = _.sortBy($scope.roles, "name");
            });
            console.log($scope.users);
            console.log($scope.dates);
          };

          fetchData();
      };

      // Make dates look good to humans
      $scope.formatDate = function(due_date) {
          var dateOptions = {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
          };
          // Format the "Report Date" column to make it look prettier
          var deadline = new Date(due_date.deadline);
          return deadline.toLocaleDateString("en-us", dateOptions);
      };

      // Generate a punctuality flag based on JSON data
      $scope.getPunctuality = function(due_date) {
          // Make the "Punctuality" column
          var punctuality = due_date.days_early;
          var day = (punctuality == 1 || punctuality == -1) ? " day" : " days";
          var tardy = (punctuality < 0) ? " late :(" : " early :)";

          if (punctuality == "missing") {
              punctuality = "Not submitted :((";
          } else if (punctuality == "chill") {
              punctuality = "Not yet due, chill";
          } else if (punctuality == 0) {
              punctuality = "Right on time!";
          } else {
              punctuality = Math.abs(punctuality).toString() + day + tardy;
          };
          return punctuality
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
