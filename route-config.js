beerApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/beers');
    $locationProvider.html5Mode(true);
    
    // Classical routes naming
    $stateProvider
      .state('beers', {
        url: '/beers',
        templateUrl: '/views/beers.htm',
        controller: 'BeersController'
      })
      
      .state('beers.detail', {
        url: '/:id/:name/:image_url/:tagline/:description/:ibu/:abv/:ebc',
        controller: 'ModalController'
      })
  })
    // We really need this. All the modals should be closed when navigating to places
    .run(['$rootScope', '$uibModalStack', function($rootScope, $uibModalStack) {
        $rootScope.previousState = null;

        $rootScope.$on('$stateChangeStart', function() {
            $uibModalStack.dismissAll();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, from, fromParams) {
            $rootScope.previousState = from;
        });
    }]);