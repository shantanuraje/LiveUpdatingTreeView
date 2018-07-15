let treeViewApp = angular.module('TreeViewApp', []);

treeViewApp.controller('TreeViewController', function ($scope) {
    $scope.tree = {name: 'Root', 
                    factories: [{name: 'Leah', children: []},
                                {name: 'Suzanne', children: []},
                                {name: 'Roberto', children: []},
                                {name: 'Greg', children: []},
                                {name: 'Lynn', children: []}]};

    $scope.arr = getRandomArbitraryNumbers(10,100,10);
    console.log($scope.arr);
    $scope.addFactory = function () {
        var dialog = document.querySelector('dialog');
        console.log(dialog);
        dialog.showModal();
        
        let newFactoryName = dialog.querySelector('#factory_name');
        let numOfChildren = dialog.querySelector('#number_of_children');
        let lowerBound = dialog.querySelector('#lower_bound');
        let upperBound = dialog.querySelector('#upper_bound');

        console.log(newFactoryName, numOfChildren, lowerBound, upperBound);

        dialog.querySelector('.ok').addEventListener('click', function () {
            console.log(newFactoryName.value, numOfChildren.value, lowerBound.value, upperBound.value);
            let newFactory = {name: newFactoryName.value, children: getRandomArbitraryNumbers(lowerBound.value, upperBound.value, numOfChildren.value)};
            $scope.tree.factories.push(newFactory);
            console.log($scope.tree);
            dialog.close();
        });


        dialog.querySelector('.close').addEventListener('click', function() {
          dialog.close();
        });
        console.log($scope.tree);
    }

    
});


// $scope.tree = {name: 'Root', 
// factories: [{factoryName: 'Leah', children: []},
//             {factoryName: 'Suzanne', children: []},
//             {factoryName: 'Roberto', children: []},
//             {factoryName: 'Greg', children: []},
//             {factoryName: 'Lynn', children: []}]};

function getRandomArbitraryNumbers(min, max, numOfChildren) {
    let result = [];
    while(numOfChildren > 0){
        result.push( Math.floor(Math.random() * (max - min) + min));
        numOfChildren--;

    }
    return result;
  }

// function addFactory(factoryName, numOfChildren, lowerBound, upperBound){

// }