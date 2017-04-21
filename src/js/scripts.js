/**
 * Modul zajišťující zpracování akcí při stisknutí jednotlivých kláves.
 */
angular.module('calcApp', [])
.controller('CalcController', function() {
    var calc = this;
    calc.operands = ["",""];
    calc.operator = "";
    calc.result = '0';
    calc.eqHitLast = false;
    calc.showMenu = false;

    /**
     * Zajišťuje vkládání operandů.
     *
     * @param      String  number  Operand zadaný na klávesnici.
     */
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
        } else {
    	    calc.operands[1] = "" + calc.operands[1] + number;
        }
        calc.result = calc.operands[1];
    }

    /**
     * Zajišťuje výpočet v případě že bylo zmáčknuto rovná se.
     */
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
    
    /**
     * Řeší situaci zadání operátoru a případný mezivýpočet.
     *
     * @param      String  operator  Operátor
     */
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

    /**
     * Při stisku tlačítka +/- změní znaménko operandu.
     */
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

    /**
     * Resetuje kalkulačku
     */
    calc.clearHit = function() {
        calc.operands = ['',''];
        calc.operator = '';
        calc.result = '';
    }

    /**
     * Smaže jeden znak operandu.
     */
    calc.delHit = function() {
        if(calc.result == "error" || calc.result == "NaN"){
            return;
        }

        calc.operands[1] = String(calc.operands[1]).substring(0,String(calc.operands[1]).length - 1);
        calc.result = calc.operands[1];
    }

    /**
     * Funkce zajišťující vyvolání správné funkce z matematické knihovny podle operátoru.
     *
     * @param      Number  op1       První operand
     * @param      Number  op2       Druhý operand
     * @param      Number  operator  Operátor
     * @return     Výsledná hodnota po vyhodnocení operace.
     */
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

    calc.toggleMenu = function() {
        calc.showMenu = ! calc.showMenu;
    }

    calc.handleKey = function(event) {
        var keyCode = event.keyCode;
        console.log(keyCode);
        if (keyCode >= 96 && keyCode <= 105) {
            calc.operandsInsert(keyCode-96);
        } else if (keyCode >= 48 && keyCode <= 57) {
            calc.operandsInsert(number.toString(keyCode-48));
        } else if (keyCode == 107) {
            calc.operatorHit('+');
        } else if (keyCode == 109) {
            calc.operatorHit('-');
        } else if (keyCode == 106) {
            calc.operatorHit('*');
        } else if (keyCode == 111) {
            calc.operatorHit('/');
        } else if (keyCode == 13) {
            calc.equalsHit();
        } else if (keyCode == 190 || keyCode == 188 || keyCode == 110) {
            calc.operandsInsert('.');
        } else if (keyCode == 8) {
            calc.delHit();
        }
    }

});
