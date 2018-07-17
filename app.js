let myApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages']);


myApp.controller('MainController', mainController);
myApp.controller('dialogController', dialogController);


function mainController($scope, $mdDialog) {
  $scope.tree = {
    name: 'Root',
    factories: [{ name: 'Leah', children: getRandomArbitraryNumbers(0,100,8) },
    { name: 'Suzanne', children: getRandomArbitraryNumbers(23,67,10) },
    { name: 'Roberto', children: getRandomArbitraryNumbers(33,90,9) },
    { name: 'Greg', children: getRandomArbitraryNumbers(12,999,2) },
    { name: 'Lynn', children: getRandomArbitraryNumbers(89,9999,15) }]
  };
  console.log($scope.tree.factories);
  

  $scope.showDialog = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: dialogController,
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (answer) {
        let newFactoryData = { name: answer.factoryName, children: getRandomArbitraryNumbers(answer.lowerBound, answer.upperBound, answer.numOfChildren) };
        $scope.tree.factories.push(newFactoryData);
      }, function () {
        $scope.newFactoryData = 'You cancelled the dialog.';
      });
  };
}

function dialogController($scope, $mdDialog) {
  //$mdDialog.show()
  $scope.newFactoryData = {
    factoryName: '',
    numOfChildren: '',
    lowerBound: '',
    upperBound: ''
  }

  console.log("hey");
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



function getRandomArbitraryNumbers(min, max, numOfChildren) {
  let result = [];
  while(numOfChildren > 0){
      let num = Math.floor(Math.random() * (max - min) + min)
      if(!result.includes(num)){
        result.push(num);
        numOfChildren--;
      }

  }
  return result;
}
