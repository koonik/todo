var todoApp = angular.module('todoApp', ['ngCookies','ngRoute', 'ngResource', 'todoServices'] ,function ($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");
    });

todoApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

todoApp.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
});


todoApp.controller('ToDoController', function($scope, $http, $cookies, $routeParams, filterFilter, Todo){
    var todos = $scope.todos = Todo.query();

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function(newValue, oldValue) {
        $scope.remainingCount = filterFilter(todos, {done:false}).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked =!$scope.remainingCount;

    }, true);

    $scope.$on('$routeChangeSuccess', function(){
        var status = $scope.status = $routeParams.status ||'';

        $scope.statusFilter = (status === 'active')?
            {done: false} : (status ==='done')?
            {done: true} : null;
    });

    $scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length){
		    return;
		}
        var newTask = new Todo({task: newTodo, done: false});
        newTask.$save().then(function(){
        todos = $scope.todos = Todo.query()});
		$scope.newTodo = '';

	};

    $scope.editTodo = function(task) {
        $scope.editedTodo = task;
        $scope.originalTodo = angular.extend({}, task);
    };

    $scope.doneEditing = function(task) {
        $scope.editedTodo = null;
        task.task = task.task.trim();

        if (!task.task) {
				$scope.removeTodo(task);
		}else{
        $id=task.id;
        Todo.update({id:$id}, task);

        }

    };

    $scope.revertEditing = function(task) {
        todos[todos.indexOf(task)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

    $scope.removeTodo = function(task){
        todos.splice(todos.indexOf(task), 1);
        Todo.delete({id: task.id}, {id: task.id});
    };


    $scope.markAll = function(done) {
        todos.forEach(function(task){
            task.done = !done;
            $id=task.id;
            Todo.update({id: $id}, task);
        });
    };

    $scope.checked = function(task) {
        $id=task.id;
        Todo.update({id: $id}, task);
    };

});
