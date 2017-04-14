angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = "";
    todoList.operands = ['0','1'];
 
    todoList.addTodo = function() {
      todoList.todos = eval(todoList.todoText); //eval(todoList.todoText);
      todoList.todoText = '';
    };

    todoList.operandsInsert = function(number) {
    	// todoList.operands.shift();
    	todoList.operands[1] = todoList.operands[1] + number;
    }

    todoList.operandsInsert = function() {
    	// todoList.operands.shift();
    	todoList.operands[1] = todoList.operands[1] + number;
    }
 
    // todoList.remaining = function() {
    //   var count = 0;
    //   angular.forEach(todoList.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };
 
    // todoList.archive = function() {
    //   var oldTodos = todoList.todos;
    //   todoList.todos = [];
    //   angular.forEach(oldTodos, function(todo) {
    //     if (!todo.done) todoList.todos.push(todo);
    //   });
    // };
  });