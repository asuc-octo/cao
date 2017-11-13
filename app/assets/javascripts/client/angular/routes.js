/*
 * Angular application routes.
 * Uses the `app` variable defined in app.js, so must be loaded after it.
 */
app.config([
  '$stateProvider', '$locationProvider', '$urlRouterProvider', 'ROUTE_UTILS',
  function ($stateProvider, $locationProvider, $urlRouterProvider,
            ROUTE_UTILS) {

    var R = ROUTE_UTILS; // Shortcut

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      // App routes
      // The 'top level' view corresponding to `AppCtrl`
      .state('app', {
        abstract: true,
        url: '',
        templateUrl: 'client/controllers/app/index.html',
        controller: 'AppCtrl'
      })

      // Home routes
      .state('app.home', {
        url: '/',
        templateUrl: 'client/controllers/home/index.html',
        controller: 'HomeCtrl'
      })

      // Post routes
      .state('app.posts', {
        abstract: true,
        url: '/posts',
        template: '<div ui-view></div>',
        resolve: {
          initialData: angular.noop
        }
      })
      .state('app.posts.index', {
        url: '',
        templateUrl: 'client/controllers/posts/index.html',
        controller: 'PostsCtrl'
      })
      .state('app.posts.new', {
        url: '/new',
        templateUrl: 'client/controllers/posts/new.html',
        controller: 'PostsCtrl',
        resolve: {
          auth: R.requireSignIn(),
          initialData: ['Post', function (Post) {
            // It is good practice to initialize to non-null values
            return new Post({ meetings_attended: '' });
          }]
        }
      })
      .state('app.posts.show', {
        url: '/:id',
        templateUrl: 'client/controllers/posts/show.html',
        controller: 'PostsCtrl',
        resolve: {
          initialData: ['$stateParams', 'Post', function ($stateParams, Post) {
            return Post.get({ postId: $stateParams.id }).$promise;
          }]
        }
      })
      .state('app.posts.edit', {
        url: '/:id/edit',
        templateUrl: 'client/controllers/posts/edit.html',
        controller: 'PostsCtrl',
        resolve: {
          auth: R.requireSignIn(),
          auth2: R.requireServerAuth('/:locale/posts/:id/edit.json'),
          initialData: ['$stateParams', 'Post', function ($stateParams, Post) {
            return Post.edit({ postId: $stateParams.id }).$promise;
          }]
        }
      })


      // Report routes
      .state('app.reports', {
        abstract: true,
        url: '/reports',
        template: '<div ui-view></div>',
        resolve: {
          initialData: angular.noop
        }
      })
      .state('app.reports.index', {
        url: '',
        templateUrl: 'client/controllers/reports/index.html',
        controller: 'ReportsCtrl'
      })
      .state('app.reports.new', {
        url: '/new',
        templateUrl: 'client/controllers/reports/new.html',
        controller: 'ReportsCtrl',
        resolve: {
          auth: R.requireSignIn(),
          initialData: ['Report', function (Report) {
            // It is good practice to initialize to non-null values
            return new Report({ meetings_attended: '' });
          }]
        }
      })
      .state('app.reports.show', {
        url: '/:id',
        templateUrl: 'client/controllers/reports/show.html',
        controller: 'ReportsCtrl',
        resolve: {
          initialData: ['$stateParams', 'Report', function ($stateParams, Report) {
            return Report.get({ reportId: $stateParams.id }).$promise;
          }]
        }
      })
      .state('app.reports.edit', {
        url: '/:id/edit',
        templateUrl: 'client/controllers/reports/edit.html',
        controller: 'ReportsCtrl',
        resolve: {
          auth: R.requireSignIn(),
          auth2: R.requireServerAuth('/:locale/reports/:id/edit.json'),
          initialData: ['$stateParams', 'Report', function ($stateParams, Report) {
            return Report.edit({ reportId: $stateParams.id }).$promise;
          }]
        }
      })

      // Punctuality routes
      .state('app.punctuality', {
        abstract: true,
        url: '/punctuality',
        template: '<div ui-view></div>',
        resolve: {
          initialData: angular.noop
        }
      })
      .state('app.punctuality.index', {
        url: '',
        templateUrl: 'client/controllers/punctuality/index.html',
        controller: 'PunctualityCtrl'
      })

      // Attachment routes
      .state('app.attachments', {
        abstract: true,
        url: '/attachments',
        template: '<div ui-view></div>',
        resolve: {
          auth: R.requireSignIn(),
          initialData: angular.noop
        }
      })
      .state('app.attachments.show', {
        url: '/:id',
        templateUrl: 'client/controllers/attachments/show.html',
        controller: 'AttachmentsCtrl',
        resolve: {
          auth2: R.requireServerAuth('/:locale/attachments/:id.json'),
          initialData: [
            '$stateParams', 'Attachment',
            function ($stateParams, Attachment) {
              return Attachment.get({ attachmentId: $stateParams.id }).$promise;
            }]
        }
      })

      // Error routes
      .state('401', {
        url: '/401',
        templateUrl: 'shared/401.html'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'shared/404.html'
      })
      .state('500', {
        url: '/500',
        templateUrl: 'shared/500.html'
      })
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'shared/sandbox.html'
      });


  }]);

app.run([
  '$injector', 'ROUTE_UTILS',
  function ($injector, ROUTE_UTILS) {
    $injector.invoke(ROUTE_UTILS.onAppRun);
  }]);
