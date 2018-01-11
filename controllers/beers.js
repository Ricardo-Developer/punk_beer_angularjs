angular.module('BeerControllers', [])
    .controller('BeersController', ['$scope', '$http', '$location', '$routeParams', '$log', '$window', '$state', '$rootScope', function($scope, $http, $location, $routeParams, $log, $window, $state, $rootScope) {
        console.log('BeersController loaded...displaying List...');

        $scope.beers = [];
        $scope.next_page = null;
        var in_progress = true;

        $http.get('https://api.punkapi.com/v2/beers?&per_page=20')
            .then(function(response) {
                $scope.beers = response.data;
                $log.info(response);
            },
            function errorCallback(response) {
                $window.alert("There seems to be a Problem with the Server...");
                $window.alert("Please check your Internet Connection...");
            }),
        $scope.sortby = 'name';            
    }])
    

    .controller('ModalController', ['$rootScope', '$uibModal', '$state', '$stateParams', '$window', '$scope', function($rootScope, $uibModal, $state, $stateParams, $window, $scope) {

        var modalInstance = $uibModal.open({
            size: 'lg',
            windowClass: 'modal-css',
            templateUrl: '/views/beer_details.htm',
            controller: function(id, name, image_url, tagline, description, ibu, abv, ebc) {
                this.id = id;
                this.name = name
                this.image_url = image_url
                this.tagline = tagline
                this.description = description
                this.ibu = ibu
                this.abv = abv
                this.ebc = ebc
            },
            controllerAs: '$ctrl',
            resolve: {
                id: function() {
                    return $stateParams.id
                },
                name: function() {
                    return $stateParams.name
                },
                image_url: function() {
                    return $stateParams.image_url
                },
                tagline: function() {
                    return $stateParams.tagline
                },
                description: function() {
                    return $stateParams.description
                },
                ibu: function() {
                    return $stateParams.ibu
                },
                abv: function() {
                    return $stateParams.abv
                },
                ebc: function() {
                    return $stateParams.ebc
                }
            }
        })
        $scope.state = $state.current
        $scope.params = $stateParams;   

        modalInstance.result.then(function() {
          // Value sumitted
        }, function() {
          // Modal dismissed. 
          if ($rootScope.previousState === '') {
            // No previous state to go? Go to list page
            $state.go('beers');
          } else {
            // Back to previous state if any
            $window.history.back();
          }
        })
    }]);



/*  
.controller('BeerDetailController', ['$scope', '$routeParams', '$http', '$log', '$location', function($scope, $routeParams, $http, $log, $location) {
    $http.get('https://api.punkapi.com/v2/beers/' + $routeParams.beerName)
        .then(function(response) {
            $scope.beers = response.data;
            console.log('BeerDetailController loaded...');
            $log.info(response.data);
        });
}]);


.controller('BeerDetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.beerId = $routeParams.beerId;
    }])



    modalInstance.result.then(function (selectedItem) {
          $ctrl.selected = selectedItem;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
          console.log($stateParams.id);
        });
*/