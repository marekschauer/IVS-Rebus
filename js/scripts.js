angular.module('todoApp', [])
.controller('TodoListController', function() {
    var todoList = this;
    todoList.operands = ['',''];
    todoList.operator = '';
    todoList.result = '';
    todoList.eqHitLast = false;


    todoList.operandsInsert = function(number) {
        if(todoList.eqHitLast == true) {
            todoList.operands[1] = '';
            todoList.eqHitLast = false;
        }
    	todoList.operands[1] = todoList.operands[1] + number;
    }

    todoList.equalsHit = function() {
        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            //todoList.operands[1] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.operands[1] = todoList.eval(Number(todoList.operands[0]),Number(todoList.operands[1]),todoList.operator);
            todoList.operands[0] = '';
            todoList.result = todoList.operands[1];
        } else {
            todoList.result = todoList.operands[1];
        }
        todoList.eqHitLast = true;
    }
    
    todoList.operatorHit = function(operator) {
        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            //todoList.operands[0] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.operands[0] = todoList.eval(Number(todoList.operands[0]),Number(todoList.operands[1]),todoList.operator);
            todoList.result = todoList.operands[0];
            todoList.operands[1] = '';
        } else if (todoList.operands[0] == '') {
            todoList.operands.shift();
            todoList.operands[1] = '';
        }

        todoList.operator = operator;
    }

    todoList.eval = function(op1, op2, operator) {
        switch(todoList.operator) {          
                case '+': 
                    return  todoList.operands[1] = math_lib.add(op1, op2);
                case '-': 
                    return  todoList.operands[1] = math_lib.sub(op1, op2); 
                case '*': 
                    return  todoList.operands[1] = math_lib.mul(op1, op2); 
                case '/': 
                    return  todoList.operands[1] = math_lib.div(op1, op2);
                default:
                    return 'error';    
            }
    }

});

//konkatenace spatna kdyz 3+3=44 napr.