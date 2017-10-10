angular.module('DueDatesCtrl', ['I18n', 'Flash', 'User'])
  .controller('DueDatesCtrl', [
    '$scope',
    function($scope) {
        /**
         * Allowed user roles.
         */
        var USER_ROLE_OPTIONS = [
          { label: 'Admin', value: 'admin'},
          { label: 'Executive', value: 'executive'},
          { label: 'CAO', value: 'cao'},
          { label: 'Senator', value: 'senator'}
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

        }

    }]);
