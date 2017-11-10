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

          fetchUsers();
      };
      $scope.formatDates = function(user) {
          dateOptions = {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
          };
          for (i = 0; i < user.due_dates.length; i++) {
              punc = user.due_dates[i].days_early;
              deadline = new Date(user.due_dates[i].deadline);
              now = new Date();

              day = (punc == 1 || punc == -1) ? " day" : " days";
              tardy = (punc < 0) ? " late :(" : " early :)";

              if (punc == "missing" && deadline.getTime() < now.getTime()) {
                  user.due_dates[i].punctuality = "Not yet submitted :((";
              } else if (punc == "missing") {
                  user.due_dates[i].punctuality = "Not yet due, chill";
              } else if (punc == 0) {
                  user.due_dates[i].punctuality = "Right on time!";
              } else {
                  user.due_dates[i].punctuality = Math.abs(punc).toString() + day + tardy;
              }

              user.due_dates[i].deadline = deadline.toLocaleDateString("en-us", dateOptions);
          };
      };
      $scope.getColor = function(due_date) {
          punctuality = due_date.days_early;
          deadline = due_date.deadline;
          now = new Date();
          if (punctuality == "missing" && Date.parse(deadline) < now.getTime()) {
              return "danger"
          } else if (punctuality >= 0) {
              return "success"
          } else if (punctuality < 0) {
              return "warning"
          } else {
              return ""
          };
      };

    }]);
