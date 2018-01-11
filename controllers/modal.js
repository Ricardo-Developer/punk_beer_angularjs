beerApp.controller('ItemCtrl', function ($rootScope, $uibModal, $state, $stateParams, $window) {
    
  var modalInstance = $uibModal.open({
    windowClass: 'modal-center',
    templateUrl: 'item.html',
    controller: function(item) {
      this.item = item;
    },
    controllerAs: '$ctrl',
    resolve: {
      item: function () {
        return $stateParams.id
      }
    }
  })

  modalInstance.result.then(function() {
    // Value sumitted
  }, function() {
    // Modal dismissed. 
    if ($rootScope.previousState.name === '') {
      // No previous state to go? Go to list page
      $state.go('items');
    } else {
      // Back to previous state if any
      $window.history.back();
    }
  })


  })