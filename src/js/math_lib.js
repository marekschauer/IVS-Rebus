class math_lib{

    static add(x, y) {
    	return x + y;
    }

    static sub(x, y){
    	return x - y;
    }

    static mul(x, y){
    	return x * y;
    }

    static div(x, y){
    	return x / y;
    }

    static pow(x,y){
        return Math.pow(x,y);
    }

    static sqrt(x,y){
        return Math.pow(x,1/y);
    }

    static mod(x,y){
        if(y == 0){
            return "NaN";
        }
        
        return x % y;
    }

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