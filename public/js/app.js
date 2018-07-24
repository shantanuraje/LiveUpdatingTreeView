//Define main angular application
let treeViewApp = angular.module('TreeViewApp', ['ngMaterial', 'ngMessages', 'ngAnimate']);

//specify all controllers used
treeViewApp.controller('MainController', mainController); //main controller used to handle actions and events on the main page
treeViewApp.controller('newFactoryController', newFactoryController); //factory controller for modal used to handle addition of new factory
treeViewApp.controller('updateFactoryController', updateFactoryController); //factory controller for modal used to handle updating of existing factory

//definition of main controller used to handle actions and events on the main page
//services to handle dialog and socket connections are injected in to the controller
function mainController($scope, $mdDialog, socket) {

  //INITIALIZATION: receive all documents from server
  socket.on('initialization', function (docs) {
    console.log('initialization', docs);
    //set the retrieved factories into $scope.tree.factories variable
    $scope.tree = {
      name: 'Root',
      factories: docs
    };
    //get all factory names in an array, used to check for duplicate factory names
    $scope.factoryNames = [];
    $scope.tree.factories.forEach(element => {
      $scope.factoryNames.push(element.name);
    });
    //print the main tree object
    console.log("Tree", $scope.tree);
  });

  //ADD FACTORY: listener event to handle when a new factory is added on the server
  socket.on('send:factory', function (factory) {
    //print the new factory
    console.log('send:factory', factory);
    //push the new factory into the main tree
    $scope.tree.factories.push(factory);
  });

  //DELETE FACTORY: listener event to handle when a factory is deleted on the server
  socket.on("remove:factory", function (id) {
    console.log("remove:factory", id);
    //get index of the factory to be deleted using the unique _id field
    let i = $scope.tree.factories.findIndex(function (factory) {
      return id === factory._id;
    });
    //remove this factory from the main tree using the index found matching the id
    $scope.tree.factories.splice(i, 1);
  });

  //UPDATE FACTORY: listener event to handle when a factory is updated on the server
  socket.on("send:updated factory", function (result) {
    console.log("send:updated factory", result);
    //get index of the factory to be update using the unique _id field
    let i = $scope.tree.factories.findIndex(function (factory) {
      return result._id === factory._id;
    });
    //update this factory from the main tree using the index found matching the id
    $scope.tree.factories[i] = result;

  });

  //SERVER VALIDATION ERROR: listener event to receive server validation error messages 
  socket.on("error:validation", function (error) {
    $scope.validationFailed = error.message;
    //print the error to console
    console.log(error);
  });

  //function to display dialog to add a new factory
  $scope.showDialog = function (ev) {
    let factory; //undefined
    $mdDialog.show({
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      controller: newFactoryController,
      targetEvent: ev,
      locals: { factory: factory, factoryNames: $scope.factoryNames },//attach undefined factory object and existing factory names to check for duplicates
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    })
      .then(function (newFactory) {
        //this functions runs when the user clicks OK to add new factory
        //intialize factory object using the new factory values        
        let factory = new Factory(null, newFactory.name, newFactory.numOfChildren, newFactory.lowerBound, newFactory.upperBound);
        //log the new factory to console        
        console.log("add factory", factory);
        //emit socket event to add new factory to database
        socket.emit('add:factory', factory);
      }, function () {
        $scope.cancelled = 'You cancelled add a new factory.';
      });
  };

  //function to display dialog to update an existing factory
  $scope.updateDialog = function (oldFactory) {
    //create a temporary factory object
    let tempFactory = {
      _id: oldFactory._id,
      name: oldFactory.name,
      numOfChildren: oldFactory.numOfChildren,
      lowerBound: oldFactory.lowerBound,
      upperBound: oldFactory.upperBound,
      children: oldFactory.children
    }
    //get all factory names in an array, used to check for duplicate factory names
    let factoryNames = []
    $scope.tree.factories.forEach(element => {
      if (element.name !== oldFactory.name) {
        factoryNames.push(element.name);
      }
    });

    $mdDialog.show({
      controller: updateFactoryController,
      templateUrl: 'add-factory-dialog.html',
      parent: angular.element(document.body),
      // targetEvent: ev,
      locals: { factory: tempFactory, factoryNames: factoryNames },//attach existing factory object and existing factory names to check for duplicates
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    })
      .then(function (factory) {
        //this functions runs when the user clicks OK to update an existing factory
        let id = factory._id;
        let updatedFactory = factory;
        //if values other than name are changed, create new factory with new children and updated values
        if (oldFactory.lowerBound != updatedFactory.lowerBound || oldFactory.upperBound != updatedFactory.upperBound || oldFactory.numOfChildren != updatedFactory.numOfChildren)
          updatedFactory = new Factory(id, updatedFactory.name, updatedFactory.numOfChildren, updatedFactory.lowerBound, updatedFactory.upperBound);
        //emit updated factory to server
        socket.emit("update:factory", updatedFactory);
      }, function () {
        $scope.cancelled = 'You cancelled updating an existing factory.';
      });
  };

  //function to delete an existing factory
  $scope.deleteFactory = function (factory) {
    event.stopPropagation();
    //emit deleted factory to server
    socket.emit('delete:factory', factory);
  }

}