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

  $scope.validateFactoryName = function () {
    if ($scope.newFactoryData.name == "" || $scope.newFactoryData.name.match(/[^a-zA-Z0-9 ]/)) {
      $scope.factoryNameInValid = true;
      console.log("not valid");
      return false;
      
    } else {
      $scope.factoryNameInValid = false;
      console.log("valid");
      return true;
      
    }
  }

  $scope.validateNumOfChildren = function () {
    if (typeof parseInt($scope.newFactoryData.numOfChildren) != 'number'  || $scope.newFactoryData.numOfChildren < 1 || $scope.newFactoryData.numOfChildren > 15 || isNaN(parseInt($scope.newFactoryData.numOfChildren))) {
      $scope.numOfChildrenInValid = true;
      console.log("numOfChildren not valid");
      return false;
      
    } else {
      $scope.numOfChildrenInValid = false;
      console.log("numOfChildren is a number");
      return true;
    }
  }

  $scope.validateLowerBound = function name() {
    console.log($scope.newFactoryData.lowerBound, typeof $scope.newFactoryData.lowerBound);
    if (typeof parseFloat($scope.newFactoryData.lowerBound) === 'number' && $scope.newFactoryData.lowerBound !== undefined && !isNaN(parseFloat($scope.newFactoryData.lowerBound)) && isFinite(parseFloat($scope.newFactoryData.lowerBound))) {
      $scope.lowerBoundInValid = false;
      console.log("lowerBound is valid");
      return true;
    } else {
      $scope.lowerBoundInValid = true;
      console.log("lowerBound not valid");
      return false;
    }
  }

  $scope.validateUpperBound = function name() {
    console.log($scope.newFactoryData.upperBound, typeof $scope.newFactoryData.upperBound);
    if (typeof parseFloat($scope.newFactoryData.upperBound) === 'number' && $scope.newFactoryData.upperBound !== undefined && !isNaN(parseFloat($scope.newFactoryData.upperBound)) && isFinite(parseFloat($scope.newFactoryData.upperBound))) {
      $scope.upperBoundInValid = false;
      console.log("upperBound is valid");
      return true;
    } else {
      $scope.upperBoundInValid = true;
      console.log("upperBound not valid");
      return false;
    }
  }

  $scope.validateLowerLessThanUpper = function () {
    if (parseInt($scope.newFactoryData.lowerBound) >= parseInt($scope.newFactoryData.upperBound)) {
      $scope.lowerNotLessThanUpper = true;
      console.log("lower bound greater than or equal to upperbound: invalid");
      return false;
      
    } else {
      $scope.lowerNotLessThanUpper = false;
      console.log("lower bound less than upperbound: valid");
      return true;
      
    }
  }

  $scope.answer = function () {
    if ($scope.validateFactoryName() && $scope.validateNumOfChildren() && $scope.validateLowerBound() && $scope.validateUpperBound()) {
      if ($scope.validateLowerLessThanUpper()) {
          $mdDialog.hide($scope.newFactoryData);
          console.log("awesome");
          
      }
    }else{
      console.log("something went wrong");
    }
  };

}