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
        do{
            if(x < y){
                return x;
            }else{
                x = x - y;
            }
        }while(1);
    }
}