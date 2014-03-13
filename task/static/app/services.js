var todoServices  = angular.module('todoServices', ['ngResource']);

todoServices.factory('Todo', ['$resource', function($resource){
    return $resource('/tasks/:id', {}, {
        'update': { method:'PUT' }})
}]);
