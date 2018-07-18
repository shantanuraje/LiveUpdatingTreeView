function newFactoryController($scope, $mdDialog) {
    $scope.newFactoryData = {
      name: '',
      numOfChildren: '',
      lowerBound: '',
      upperBound: '',
      children: []
    }

    console.log("newFactoryController");
    $scope.hide = function () {
      $mdDialog.hide();
    };
  
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  
    $scope.answer = function () {
      $mdDialog.hide($scope.newFactoryData);
    };
  
  }