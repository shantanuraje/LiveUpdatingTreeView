let myApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages']);


myApp.controller('MainController', mainController);
myApp.controller('newFactoryController', newFactoryController);
myApp.controller('updateFactoryController', updateFactoryController);

// let socket = io();


function mainController($scope, $http, $mdDialog, socket) {
  $scope.tree = {
    name: 'Root',
    factories: []
  };
  socket.on('initialization', function (docs) {
    console.log(docs);
    // $scope.tree.factories = [];
    $scope.tree.factories = $scope.tree.factories.concat(docs);
    console.log($scope.tree);
    
  })

  socket.on('send:factory', function (factory) {
    console.log(factory);
    
    $scope.tree.factories.push(factory);
    console.log($scope.tree.factories);
    
    
  })

  socket.on("remove:factory", function (index) {
    $scope.tree.factories.splice(index, 1);
  })
  
  console.log($scope.tree.factories);



  $scope.showDialog = function (factory) {
    console.log(factory);

    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: newFactoryController,
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      locals: { factory: factory },
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (answer) {
        let factory = new Factory(answer.name, answer.numOfChildren, answer.lowerBound, answer.upperBound);
        console.log(factory);

        socket.emit('add:factory', factory);


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
      locals: { index: index, factory: factory },
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

  $scope.deleteFactory = function (index, event, factory) {
    event.stopPropagation();
    socket.emit('delete:factory', {'index': index, 'factory': factory});
    // socket.broadcast.emit('delete:factory', {'index': index, 'factory': factory});
    $scope.tree.factories.splice(index, 1);
    console.log(index);

  }

}