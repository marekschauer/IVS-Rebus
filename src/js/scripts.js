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

        //reset pocitani pokud bylo pred tim stisknuto rovna se
        if(calc.eqHitLast == true) {
            calc.operands[1] = '';
            calc.eqHitLast = false;
        }

        //hledani tecky
        dot = false;
        for(i = 0; i < calc.operands[1].length; i++){
            if(calc.operands[1][i] == '.'){
                dot = true;
            }
        }
        //uzivatel muze zadat pouze jednu tecku
        if(number == '.' && dot){
            return;
        }
        //tecka jako prvni prida implicitně nulu před
        if((calc.operands[1] == "" || calc.operands[1] == "0") && number == '.'){
            calc.operands[1] = "0.";
            calc.result = calc.operands[1];
            return;
        }

        if(calc.operands[1] == "0"){
            calc.operands[1] = number;  
        }
        else{
    	   calc.operands[1] = calc.operands[1] + number;
        }
        calc.result = calc.operands[1];
    }

    calc.equalsHit = function() {
        if(calc.result == "error" || calc.result == "NaN"){
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
        }else if(calc.operator == 'sqrt' && calc.operands[0] != ''){
            calc.operands[1] = "";
            calc.operands[0] = "";
            calc.result = "NaN";
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
        if(calc.result == "error" || calc.result == "NaN"){
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
        calc.result = "";
    }

    calc.plusMinusHit = function(){
        if(calc.result == "error" || calc.result == "NaN"){
            return;
        }
        
        calc.eqHitLast = false;
        //pridani nebo odebrani unarniho minus pokud je řetězec prazdny či obsahuje pouze minus
        if(calc.operands[1] == ""){
            calc.operands[1] = "-";
            calc.result = calc.operands[1];
            return;
        } else if (calc.operands[1] == "-") {
            calc.operands[1] = "";
            calc.result = calc.operands[1];
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
        if(calc.result == "error" || calc.result == "NaN"){
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
                case 'sqrt':
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