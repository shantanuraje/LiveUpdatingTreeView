let myApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages']);


myApp.controller('MainController', mainController);
myApp.controller('newFactoryController', newFactoryController);
myApp.controller('updateFactoryController', updateFactoryController);

// let socket = io();

myApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

function mainController($scope, $http, $mdDialog, socket) {
  $scope.tree = {
    name: 'Root',
    factories: []
  };
  socket.on('all factories', function (factories) {
    console.log(factories);
    
    $scope.tree.factories = $scope.tree.factories.concat(factories);
    console.log($scope.tree);
    
  });
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

        $scope.tree.factories.push(factory);
        socket.emit('new factory', factory);

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

  $scope.deleteFactory = function (index, event) {
    event.stopPropagation();
    $scope.tree.factories.splice(index, 1);
    console.log(index);

  }

}