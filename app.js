angular.module('TreeView', []).
controller('TreeViewController', ['$scope', function ($scope) {
    $scope.tree = {name: 'Root', 
                    factories: [{factoryName: 'Leah', children: []},
                                {factoryName: 'Suzanne', children: []},
                                {factoryName: 'Roberto', children: []},
                                {factoryName: 'Greg', children: []},
                                {factoryName: 'Lynn', children: []}]};
}]);
