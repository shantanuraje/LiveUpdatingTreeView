let myApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages', 'ngAnimate']);

myApp.controller('MainController', mainController);
myApp.controller('newFactoryController', newFactoryController);
myApp.controller('updateFactoryController', updateFactoryController);

function mainController($scope, $http, $mdDialog, socket) {

  socket.on("error:validation", function (error) {
    $scope.validationFailed = error.message;
    console.log(error);
  })
  socket.on('initialization', function (docs) {
    console.log('initialization', docs);
    $scope.tree = {
      name: 'Root',
      factories: docs
    }
    $scope.factoryNames = []
    $scope.tree.factories.forEach(element => {
      // console.log("Names:", element.name)
      $scope.factoryNames.push(element.name);
    });
    console.log("Tree", $scope.tree);    
  })

  socket.on('send:factory', function (factory) {
    console.log('send:factory', factory);    
    $scope.tree.factories.push(factory);
    console.log("Tree", $scope.tree);    
  })
  
  socket.on("remove:factory", function (index) {
    console.log("remove:factory", index);
    $scope.tree.factories.splice(index, 1);
    console.log("Tree", $scope.tree);
  })

  socket.on("send:updated factory", function (result) {
    console.log("send:updated factory", result);
    $scope.tree.factories[result.index] = result.factory;
    
  })
  
  // $scope.getFactoryNames = function () {
  //   let factoryNames = []
  //   $scope.tree.factories.forEach(element => {
  //     console.log("Names:", element.name)
  //   });
  // }

  // $scope.getFactoryNames();

  $scope.showDialog = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    let factory;
    $mdDialog.show({
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      controller: newFactoryController,
      targetEvent: ev,
      locals: { factory: factory, factoryNames: $scope.factoryNames },
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (answer) {
        let factory = new Factory(answer.name, answer.numOfChildren, answer.lowerBound, answer.upperBound);
        console.log("add factory", factory);
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
      locals: { index: index, factory: factory, factoryNames: $scope.factoryNames },
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

    })
      .then(function (result) {
        console.log("update factory", result);
        let id = result.factory._id;
        let factory = new Factory(result.factory.name, result.factory.numOfChildren, result.factory.lowerBound, result.factory.upperBound);
        console.log(factory)
        socket.emit("update:factory", {'index': result.index,'id': id, 'factory': factory});
        // console.log(factory);
        
        // $scope.tree.factories[result.index] = factory;

      }, function () {
        $scope.newFactoryData = 'You cancelled the dialog.';
      });
  };

  $scope.deleteFactory = function (index, event, factory) {
    event.stopPropagation();
    socket.emit('delete:factory', {'index': index, 'factory': factory});
  }

}