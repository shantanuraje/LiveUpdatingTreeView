let myApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages']);


myApp.controller('MainController', mainController);
myApp.controller('newFactoryController', newFactoryController);
myApp.controller('updateFactoryController', updateFactoryController);


function mainController($scope, $mdDialog) {
  $scope.tree = {
    name: 'Root',
    factories: []
  };
  console.log($scope.tree.factories);
  

  $scope.showDialog = function (factory) {
    console.log(factory);
    
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: newFactoryController,
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      locals: {factory: factory},
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (answer) {
        let factory = new Factory(answer.name, answer.numOfChildren, answer.lowerBound, answer.upperBound);
        $scope.tree.factories.push(factory);
        
      }, function () {
        $scope.newFactoryData = 'You cancelled the dialog.';
      });
  };

  $scope.updateDialog = function (index, factory) {
    console.log(index, factory);
    
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: updateFactoryController,
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      locals: { index: index, factory: factory},
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (result) {
        console.log(result);
        
        let factory = new Factory(result.factory.name, result.factory.numOfChildren, result.factory.lowerBound, result.factory.upperBound);
        $scope.tree.factories[result.index] = factory;
        
      }, function () {
        $scope.newFactoryData = 'You cancelled the dialog.';
      });
  };

}



// { name: 'Leah', children: getRandomArbitraryNumbers(0,100,8) },
//     { name: 'Suzanne', children: getRandomArbitraryNumbers(23,67,10) },
//     { name: 'Roberto', children: getRandomArbitraryNumbers(33,90,9) },
//     { name: 'Greg', children: getRandomArbitraryNumbers(12,999,2) },
//     { name: 'Lynn', children: getRandomArbitraryNumbers(89,9999,15) }