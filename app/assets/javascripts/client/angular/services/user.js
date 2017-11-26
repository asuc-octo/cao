// Manages the User resource on the server.
angular.module('User', ['I18n', 'ArrayMetadataResponseAdapter'])
  .factory('User', [
    '$resource', 'I18n', 'ArrayMetadataResponseAdapter',
    function($resource, I18n, ArrayMetadataResponseAdapter) {
        return $resource(
            '/punctuality/:id.json', {},
            {
              query: {
                method: 'GET'
              }
            });
    }]);
