// Manages the DueDate resource on the server.
angular.module('DueDate', ['I18n'])
  .factory('DueDate', [
    '$resource', 'I18n',
    function($resource, I18n) {
      return $resource(
        '/admin/:locale/due_dates/:collectionAction/:dueDateId/:memberAction.json',
        {
          dueDateId: '@id',
          locale: I18n.getLocaleUrlParam()
        },
        // Extra methods for compatibility with Rails, and our data format
        {
          batch_destroy: {
            method: 'POST',
            params: { collectionAction: 'batch_destroy' }
          }
        });
    }]);
