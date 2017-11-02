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
          };
          fetchUsers();
      };

      $scope.getPunctuality = function(user) {
          console.log(user.email);
      };

    }]);
