function newFactoryController($scope, $mdDialog, factoryNames) {  
  console.log("newFactoryController");
  //define a blank factory to be filled by user
  $scope.newFactoryData = {
    name: '',
    numOfChildren: '',
    lowerBound: '',
    upperBound: '',
    children: []
  }
  //function to hide dialog box
  $scope.hide = function () {
    $mdDialog.hide();
  };
  
  //function to cancel dialog box
  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  //function to check for duplicate names
  $scope.checkDuplicateFactoryName = function () {
    if (factoryNames.includes($scope.newFactoryData.name)) {
      $scope.duplicateFactoryName = true;
      return true;
      
    } else {
      $scope.duplicateFactoryName = false;
      return false;      
    }
  };

  //function to validate factory name
  $scope.validateFactoryName = function () {
    if ($scope.newFactoryData.name == "" || $scope.newFactoryData.name.match(/[^a-zA-Z0-9 ]/)) {
      $scope.factoryNameInValid = true;
      $scope.duplicateFactoryName = false;
      return false;      
    } else {
      $scope.factoryNameInValid = false;
      return true;      
    }
  };

  //function to validate number of children
  $scope.validateNumOfChildren = function () {
    if (typeof parseInt($scope.newFactoryData.numOfChildren) != 'number'  || $scope.newFactoryData.numOfChildren < 1 || $scope.newFactoryData.numOfChildren > 15 || isNaN(parseInt($scope.newFactoryData.numOfChildren))) {
      $scope.numOfChildrenInValid = true;
      return false;      
    } else {
      $scope.numOfChildrenInValid = false;
      return true;
    }
  };

  //function to validate lower bound
  $scope.validateLowerBound = function name() {
    if (typeof parseFloat($scope.newFactoryData.lowerBound) === 'number' && $scope.newFactoryData.lowerBound !== undefined && !isNaN(parseFloat($scope.newFactoryData.lowerBound)) && isFinite(parseFloat($scope.newFactoryData.lowerBound))) {
      $scope.lowerBoundInValid = false;
      return true;
    } else {
      $scope.lowerBoundInValid = true;
      return false;
    }
  };

  //function to validate upper bound
  $scope.validateUpperBound = function name() {
    if (typeof parseFloat($scope.newFactoryData.upperBound) === 'number' && $scope.newFactoryData.upperBound !== undefined && !isNaN(parseFloat($scope.newFactoryData.upperBound)) && isFinite(parseFloat($scope.newFactoryData.upperBound))) {
      $scope.upperBoundInValid = false;
      return true;
    } else {
      $scope.upperBoundInValid = true;
      return false;
    }
  };

  //function to validate if lower bound is less than upperbound
  $scope.validateLowerLessThanUpper = function () {
    if (parseInt($scope.newFactoryData.lowerBound) >= parseInt($scope.newFactoryData.upperBound)) {
      $scope.lowerNotLessThanUpper = true;
      return false;      
    } else {
      $scope.lowerNotLessThanUpper = false;
      return true;      
    }
  };

  //function to run when the user clicks ok to add new factory
  $scope.answer = function () {
    //make sure all fields are validated
    if ($scope.validateFactoryName() && !$scope.checkDuplicateFactoryName() && $scope.validateNumOfChildren() && $scope.validateLowerBound() && $scope.validateUpperBound() ) {
      if ($scope.validateLowerLessThanUpper()) {
        $mdDialog.hide($scope.newFactoryData);        
      }
    }else{
      console.log("Something went wrong. Please check factory details");
    }
  };
}