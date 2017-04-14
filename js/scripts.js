angular.module('todoApp', [])
.controller('TodoListController', function() {
    var todoList = this;
    todoList.operands = ['',''];
    todoList.operator = '';
    todoList.result = '';


    todoList.operandsInsert = function(number) {
    	// todoList.operands.shift();
    	todoList.operands[1] = todoList.operands[1] + number;
    }

    todoList.equalsHit = function() {
    	// todoList.operands.shift();
    	// todoList.operands[1] = todoList.operands[1] + number;
        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            todoList.operands[1] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.operands[0] = '';
            todoList.result = todoList.operands[1];
        } else {

        }
    }
    
    todoList.operatorHit = function(operator) {
        // if (todoList.operands[0] == '') {
        //     todoList.operands[1].shift();
        //     alert('Som tu');
        // }
        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            todoList.operands[0] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.result = todoList.operands[0];
            todoList.operands[1] = '';
        } else if (todoList.operands[0] == '') {
            todoList.operands.shift();
            todoList.operands[1] = '';
        }

        todoList.operator = operator;
    }

});