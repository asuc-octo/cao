// Manages the Report resource on the server.
angular.module('Report', ['I18n'])
  .factory('Report', [
    '$resource', 'I18n',
    function($resource, I18n) {
      return $resource(
        '/admin/:locale/reports/:collectionAction/:reportId/:memberAction.json',
        {
          reportId: '@id',
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
