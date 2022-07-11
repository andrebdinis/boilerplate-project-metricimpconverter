const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  //SUITE: INPUT NUMBER
  suite("Input Number. convertHandler.getNum():", function() {
    
    test("#1 should read a whole number", function(){
      assert.strictEqual(convertHandler.getNum("10"), 10);
    });
    test("#2 should read a decimal number", function(){
      assert.strictEqual(convertHandler.getNum("10.22"), 10.22);
    });
    test("#3 should read a fractional number", function(){
      assert.strictEqual(convertHandler.getNum("1/2"), 1/2);
    });
    test("#4 should read a fractional number with a decimal", function(){
      assert.strictEqual(convertHandler.getNum("1.5/2.5"), 1.5/2.5);
    });
    test("#5 should return an error on a double-fraction", function(){
      assert.strictEqual(convertHandler.getNum("4/3/2"), "invalid number");
    });
    test("#6 should default to a numerical input of 1 when no numerical input is provided", function(){
      assert.strictEqual(convertHandler.getNum(""), 1);
      assert.strictEqual(convertHandler.getNum("gal"), 1);
    });
  });

  // SUITE: INPUT UNIT
  suite("Input Unit. convertHandler.getUnit():", function(){

    test("#7 should read each valid input unit", function(){
      assert.equal(convertHandler.getUnit("GAL"), "gal");
      assert.equal(convertHandler.getUnit("l"), "L");
      assert.equal(convertHandler.getUnit("MI"), "mi");
      assert.equal(convertHandler.getUnit("KM"), "km");
      assert.equal(convertHandler.getUnit("LBS"), "lbs");
      assert.strictEqual(convertHandler.getUnit("KG"), "kg");
    });

    test("#8 should return an error for an invalid input unit", function(){
      assert.strictEqual(convertHandler.getUnit("fm"), "invalid unit");
    });
  });

  //SUITE: RETURN UNIT
  suite("Return Unit. convertHandler.getReturnUnit():", function(){
    test("#9 should return the correct return unit for each valid input unit", 
 function(){
      assert.strictEqual(convertHandler.getReturnUnit("GAL"), "L");
   assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
   assert.strictEqual(convertHandler.getReturnUnit("MI"), "km");
   assert.strictEqual(convertHandler.getReturnUnit("KM"), "mi");
   assert.strictEqual(convertHandler.getReturnUnit("LBS"), "kg");
   assert.strictEqual(convertHandler.getReturnUnit("KG"), "lbs");
    });
  });

  //SUITE: SPELL OUT UNIT
  suite("Spell Out Unit. convertHandler.spellOutUnit():", function(){
    test("#10 should correctly return the spelled-out string unit for each valid input unit", 
 function(){
      assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
   assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
   assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
   assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
   assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
   assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
   });
 });

  //SUITE: CONVERT
  suite("Convert. convertHandler.convert():", function(){

    const galToL = 3.78541; // 1 gallon = 3.78541 L
    const miToKm = 1.60934; // 1 mile = 1.60934 km
    const lbsToKg = 0.453592; // 1 pound = 0.453592 kg
    
    test("#11 should correctly convert gal to L", 
 function(){
      assert.strictEqual(convertHandler.convert(5, "gal"), Number((5 * galToL).toFixed(5)) );
   });
    test("#12 should correctly convert L to gal", 
 function(){
   assert.strictEqual(convertHandler.convert(5, "L"), Number((5 / galToL).toFixed(5)) );
 });
    test("#13 should correctly convert mi to km", 
 function(){
   assert.strictEqual(convertHandler.convert(5, "mi"), Number((5 * miToKm).toFixed(5)) );
 });
    test("#14 should correctly convert km to mi", 
 function(){
   assert.strictEqual(convertHandler.convert(5, "km"), Number((5 / miToKm).toFixed(5)) );
 });
    test("#15 should correctly convert lbs to kg", 
 function(){
   assert.strictEqual(convertHandler.convert(5, "lbs"), Number((5 * lbsToKg).toFixed(5)) );
 });
    test("#16 should correctly convert kg to lbs", 
 function(){
   assert.strictEqual(convertHandler.convert(5, "kg"), Number((5 / lbsToKg).toFixed(5)) );
 });
});
  
});