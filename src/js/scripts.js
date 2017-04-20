angular.module('calcApp', [])
.controller('CalcController', function() {
    var calc = this;
    calc.operands = ['',''];
    calc.operator = '';
    calc.result = '0';
    calc.eqHitLast = false;


    calc.operandsInsert = function(number) {
        if(calc.result == "error"){
            return;
        }

        if(calc.operator == '!'){
            return;
        }
        if(calc.eqHitLast == true) {
            calc.operands[1] = '';
            calc.eqHitLast = false;
        }
    	calc.operands[1] = calc.operands[1] + number;
        calc.result = calc.operands[1];
    }

    calc.equalsHit = function() {
        if(calc.result == "error"){
            return;
        }

        if (calc.operands[0] != '' && calc.operands[1] != '') {
            //calc.operands[1] = eval(calc.operands[0] + calc.operator + calc.operands[1]);
            calc.operands[1] = calc.eval(Number(calc.operands[0]),Number(calc.operands[1]),calc.operator);
            calc.operands[0] = '';
            calc.result = calc.operands[1];
        } else if (calc.operator == '!' && calc.operands[0] != '') {
            calc.operands[1] = calc.eval(Number(calc.operands[0]),Number(calc.operands[1]),calc.operator);
            calc.operands[0] = '';
            calc.result = calc.operands[1];
        }
        else {
            calc.result = calc.operands[1];
        }
        calc.eqHitLast = true;
        calc.operator = '';

        if(calc.result == "Infinity"){
            calc.operands[0] = '';
            calc.operands[1] = '';
        }
    }
    
    calc.operatorHit = function(operator) {
        if(calc.result == "error"){
            return;
        }

        if (calc.operands[0] != '' && calc.operands[1] != '') {
            //calc.operands[0] = eval(calc.operands[0] + calc.operator + calc.operands[1]);
            calc.operands[0] = calc.eval(Number(calc.operands[0]),Number(calc.operands[1]),calc.operator);
            calc.result = calc.operands[0];
            calc.operands[1] = '';
        } else if(calc.operands[0] == '' && calc.operands[1] == ''){
            return; //nejde zasat operator kdyz neni zadan operand
        } else if (calc.operands[0] == '') {
            calc.operands.shift();
            calc.operands[1] = '';
        }
        calc.operator = operator;
    }

    calc.plusMinusHit = function(){
        if(calc.result == "error"){
            return;
        }

        calc.operands[1] = Number(calc.operands[1] * (-1));
        calc.result = calc.operands[1];
    }

    calc.clearHit = function(operator) {
        calc.operands = ['',''];
        calc.operator = '';
        calc.result = '';
    }

    calc.delHit = function(operator) {
        if(calc.result == "error"){
            return;
        }

        calc.operands[1] = String(calc.operands[1]).substring(0,String(calc.operands[1]).length - 1);
        calc.result = calc.operands[1];
    }

    calc.eval = function(op1, op2, operator) {
        switch(calc.operator) {          
                case '+': 
                    return  calc.operands[1] = math_lib.add(op1, op2);
                case '-': 
                    return  calc.operands[1] = math_lib.sub(op1, op2); 
                case '*': 
                    return  calc.operands[1] = math_lib.mul(op1, op2); 
                case '/': 
                    return  calc.operands[1] = math_lib.div(op1, op2);
                case '^':
                    return  calc.operands[1] = math_lib.pow(op1, op2);
                case 's':
                    return  calc.operands[1] = math_lib.sqrt(op2, op1); 
                case 'mod':
                    return  calc.operands[1] = math_lib.mod(op1, op2);
                case '!':
                    return  calc.operands[1] = math_lib.fact(op1); 
                default:
                    return 'error';    
            }
    }

});

//konkatenace spatna kdyz 3+3=44 napr.