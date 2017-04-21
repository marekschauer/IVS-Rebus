/**
 * Třída implementující matematickou knihovnu.
 */
class math_lib{

    /**
     * Funkce pro výpočet součtu.
     *
     * @param      Number  x       Sčítanec
     * @param      Number  y       Sčítanec
     * @return      Součet
     */
    static add(x, y) {
    	return x + y;
    }

    /**
     * Funkce pro výpočet rozdílu.
     *
     * @param      Number  x       Menšenec
     * @param      Number  y       Menšitel
     * @return       Rozdíl
     */
    static sub(x, y){
    	return x - y;
    }

    /**
     * Funkce pro výpočet násobení.
     *
     * @param      Number  x       Činitel
     * @param      Number  y       Činitel
     * @return       Součin
     */
    static mul(x, y){
    	return x * y;
    }

    /**
     * Funkce pro výpočet dělení.
     *
     * @param      Number  x       Dělenec
     * @param      Number  y       Dělitel
     * @return       Podíl
     */
    static div(x, y){
    	return x / y;
    }

    /**
     * Funkce pro výpočet mocniny.
     *
     * @param      Number  x       Základ
     * @param      Number  y       Mocnina
     * @return      Umocněné číslo.
     */
    static pow(x,y){
        return Math.pow(x,y);
    }

    /**
     * Funkce pro výpočet odmocniny.
     *
     * @param      Number  x      Odmocnina
     * @param      Number y       Základ
     * @return      Odmocněné číslo.
     */
    static sqrt(x,y){
        return Math.pow(x,1/y);
    }

    /**
     * Funkce pro výpočet zbytku po dělení.
     *
     * @param      Number           x       Dělenec
     * @param      Number           y       Dělitel
     * @return     Zbytek po dělení nebo NaN pokud je dělitel 0.
     */
    static mod(x,y){
        if(y == 0){
            return "NaN";
        }
        
        return x % y;
    }

    /**
     * Funkce pro výpočet faktoriálu.
     *
     * @param      Number           x       Základ
     * @return     Faktoriál
     */
    static fact(x){
        //nad 1000 uz cislo tak velke ze se vypise Infinity
        if(x > 1000){
            return "Infinity";
        }
        //na desetine cislo nejde udelat faktorial
        if(!Number.isInteger(x) || x < 0){
            return "NaN";
        }

        if((x == 0) || (x == 1)){
            return 1;
        }
        else{
            return (x * math_lib.fact(x-1));        
        }
    }
}