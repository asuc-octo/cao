// Manages the Report resource on the server.
angular.module('Report', ['I18n', 'ArrayMetadataResponseAdapter'])
  .factory('Report', [
    '$resource', 'I18n', 'ArrayMetadataResponseAdapter',
    function($resource, I18n, ArrayMetadataResponseAdapter) {
      var resource = $resource(
        '/:locale/reports/:collectionAction/:reportId/:memberAction.json',
        {
          reportId: '@id',
          locale: I18n.getLocaleUrlParam()
        },
        // Extra methods for compatibility with Rails, and our data format
        {
          query: ArrayMetadataResponseAdapter.adaptToArray(
            'items', 'metadata', {
              method: 'GET'
            }),
          edit: {
            method: 'GET',
            params: { memberAction: 'edit' }
          },
          update: {
            method: 'PUT'
          },
          new: {
              method: 'GET',
              isArray: true,
              params: { collectionAction: 'new' }
          }
        });

      // resource.get_dates = function () {
      //   return this.get(
      //     {
      //       collectionAction: "potential_due_dates",
      //     },
      //   );
      // };
      return resource;
    }]);
