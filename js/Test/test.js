describe('math_lib', function(){

  describe('2+2=4', function(){
    it('test 2+2', function (){
      expect(4).toEqual(math_lib.add(2,2));
    });
  });

  describe('2409+23421=25830', function(){
    it('test 2409+23421', function (){
      expect(25830).toEqual(math_lib.add(2409,23421));
    });
  });

  describe('2-2=0', function(){
    it('test 2-2', function (){
      expect(0).toEqual(math_lib.sub(2,2));
    });
  });

  describe('43532-23432=20100', function(){
    it('test 43532-23432', function (){
      expect(20100).toEqual(math_lib.sub(43532,23432));
    });
  });

  describe('43532*23432=1020041824', function(){
    it('test 43532*23432', function (){
      expect(1020041824).toEqual(math_lib.mul(43532,23432));
    });
  });

  describe('2*2=4', function(){
    it('test 2*2', function (){
      expect(4).toEqual(math_lib.mul(2,2));
    });
  });
  describe('2/2=1', function(){
    it('test 2/2', function (){
      expect(1).toEqual(math_lib.div(2,2));
    });
  });

  describe('43532/2=21766', function(){
    it('test 43532/2', function (){
      expect(21766).toEqual(math_lib.div(43532,2));
    });
  });

  describe('11 mod 3=2', function(){
    it('test 11 mod 3', function (){
      expect(2).toEqual(math_lib.mod(11,3));
    });
  });

  describe('43532 mod 42=20', function(){
    it('test 43532 mod 42', function (){
      expect(20).toEqual(math_lib.mod(43532, 42));
    });
  });

  describe('5! = 120', function(){
    it('test 5!', function (){
      expect(120).toEqual(math_lib.fact(5));
    });
  });

  describe('2! = 2', function(){
    it('test 2!', function (){
      expect(2).toEqual(math_lib.fact(2));
    });
  });



});
