function updateFactoryController($scope, $mdDialog, index, factory) {

  $scope.factoryNameInValid = false;
  $scope.numOfChildrenInValid = false;
  $scope.lowerBoundInValid = false;
  $scope.upperBoundInValid = false;

  console.log(index, factory)
  $scope.newFactoryData = factory
  console.log("updateFactoryController");
  $scope.hide = function () {
    $mdDialog.hide();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.validateFactory = function () {
    if ($scope.newFactoryData.name == "") {
      $scope.factoryNameInValid = true;
    }else{
      $scope.factoryNameInValid = false;
    }
    if (typeof $scope.newFactoryData.numOfChildren != 'number'|| $scope.newFactoryData.numOfChildren < 1 || $scope.newFactoryData.numOfChildren > 15) {
      $scope.numOfChildrenInValid = true;
    }else{
      $scope.numOfChildrenInValid = false;
    }
    if ((typeof $scope.newFactoryData.lowerBound != 'number') || ($scope.newFactoryData.lowerBound > $scope.newFactoryData.upperBound)) {
      $scope.lowerBoundInValid = true;
    }else{
      $scope.lowerBoundInValid = false;
    }
    if((typeof $scope.newFactoryData.upperBound != 'number') || ($scope.newFactoryData.upperBound < $scope.newFactoryData.upperBound)){
      $scope.upperBoundInValid = true;
    }else{
      $scope.upperBoundInValid = false;
    }
    return $scope.factoryNameInValid || $scope.numOfChildrenInValid || $scope.lowerBoundInValid || $scope.upperBoundInValid;

  }
  
  $scope.answer = function () {
    // if (!$scope.validateFactory()) {
    // }
    $mdDialog.hide({ index: index, factory: factory });
  };

}