angular.module('todoApp', [])
.controller('TodoListController', function() {
    var todoList = this;
    todoList.operands = ['',''];
    todoList.operator = '';
    todoList.result = '0';
    todoList.eqHitLast = false;


    todoList.operandsInsert = function(number) {
        if(todoList.result == "error"){
            return;
        }

        if(todoList.operator == '!'){
            return;
        }
        if(todoList.eqHitLast == true) {
            todoList.operands[1] = '';
            todoList.eqHitLast = false;
        }
    	todoList.operands[1] = todoList.operands[1] + number;
        todoList.result = todoList.operands[1];
    }

    todoList.equalsHit = function() {
        if(todoList.result == "error"){
            return;
        }

        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            //todoList.operands[1] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.operands[1] = todoList.eval(Number(todoList.operands[0]),Number(todoList.operands[1]),todoList.operator);
            todoList.operands[0] = '';
            todoList.result = todoList.operands[1];
        } else if (todoList.operator == '!' && todoList.operands[0] != '') {
            todoList.operands[1] = todoList.eval(Number(todoList.operands[0]),Number(todoList.operands[1]),todoList.operator);
            todoList.operands[0] = '';
            todoList.result = todoList.operands[1];
        }
        else {
            todoList.result = todoList.operands[1];
        }
        todoList.eqHitLast = true;
        todoList.operator = '';

        if(todoList.result == "Infinity"){
            todoList.operands[0] = '';
            todoList.operands[1] = '';
        }
    }
    
    todoList.operatorHit = function(operator) {
        if(todoList.result == "error"){
            return;
        }

        if (todoList.operands[0] != '' && todoList.operands[1] != '') {
            //todoList.operands[0] = eval(todoList.operands[0] + todoList.operator + todoList.operands[1]);
            todoList.operands[0] = todoList.eval(Number(todoList.operands[0]),Number(todoList.operands[1]),todoList.operator);
            todoList.result = todoList.operands[0];
            todoList.operands[1] = '';
        } else if(todoList.operands[0] == '' && todoList.operands[1] == ''){
            return; //nejde zasat operator kdyz neni zadan operand
        } else if (todoList.operands[0] == '') {
            todoList.operands.shift();
            todoList.operands[1] = '';
        }
        todoList.operator = operator;
    }

    todoList.plusMinusHit = function(){
        if(todoList.result == "error"){
            return;
        }

        todoList.operands[1] = Number(todoList.operands[1] * (-1));
        todoList.result = todoList.operands[1];
    }

    todoList.clearHit = function(operator) {
        todoList.operands = ['',''];
        todoList.operator = '';
        todoList.result = '';
    }

    todoList.delHit = function(operator) {
        if(todoList.result == "error"){
            return;
        }

        todoList.operands[1] = String(todoList.operands[1]).substring(0,String(todoList.operands[1]).length - 1);
        todoList.result = todoList.operands[1];
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
                case '^':
                    return  todoList.operands[1] = math_lib.pow(op1, op2);
                case 's':
                    return  todoList.operands[1] = math_lib.sqrt(op2, op1); 
                case 'mod':
                    return  todoList.operands[1] = math_lib.mod(op1, op2);
                case '!':
                    return  todoList.operands[1] = math_lib.fact(op1); 
                default:
                    return 'error';    
            }
    }

});

//konkatenace spatna kdyz 3+3=44 napr.