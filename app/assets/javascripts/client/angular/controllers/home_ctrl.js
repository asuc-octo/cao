angular.module('HomeCtrl', [])
  .controller('HomeCtrl', [
    '$scope',
    function($scope) {
      $scope.hello = 'Welcome to the Office of the Chief Personnel Officer';
      $scope.submit = 'Submit a report';
    }]);