function updateFactoryController($scope, $mdDialog, index, factory) {
    console.log(index,factory)
    $scope.newFactoryData = factory
    console.log("updateFactoryController");
    $scope.hide = function () {
      $mdDialog.hide();
    };
  
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  
    $scope.answer = function () {
      $mdDialog.hide({index: index, factory: factory});
    };
  
  }