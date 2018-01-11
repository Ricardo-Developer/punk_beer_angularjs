var beerApp = angular.module('beerGuru', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'BeerControllers'
])


.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      '**',
      'https://api.punkapi.com/v2/**'
    ]);
}])