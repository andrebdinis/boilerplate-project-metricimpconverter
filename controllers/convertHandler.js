const unitArray = ["gal", "l", "mi", "km", "lbs", "kg"];
const regex = {
  onlyLetters: /^[A-Za-z]{1,3}$/i,
  lettersToTheLeft: /[A-Za-z]+[\d/.]/i,
  doubleDivision: /[/].*[/]/i,
  doubleDots: /[.][\d]*[.]/i,
  firstNumber: /^[\d]+[.]*[\d]*/i,
  secondNumber: /(?<=^[\d]+[.]*[\d]*[/])[\d]+([.][\d])*/i,
  fraction: /(?<=^[\d]+[.]*[\d]*)[/]/i,
  unit: /[A-Za-z]{1,3}$/i
};
  

function ConvertHandler() {
  
  this.isUnitValid = function(unit) {
    return unitArray.indexOf(unit.toLowerCase()) !== -1;
  }; // added
  
  
  this.getNum = function(input) {
    let result = 0;
    
    // only letters on input OR empty string ?
    if(regex.onlyLetters.test(input) || !input) {
      return 1;
      // letters are a valid unit ?
      //if(this.isUnitValid(input)) { return 1 }
        //else { return "invalid unit" };
    }
    
    // double division ?
    if(regex.doubleDivision.test(input)) return "invalid number";

    // double dots ?
    if(regex.doubleDots.test(input)) return "invalid number";

    // letters to the left ?
    if(regex.lettersToTheLeft.test(input)) return "invalid number";
  
    const firstNumberTest = input.match(regex.firstNumber);
    const secondNumberTest = input.match(regex.secondNumber);
    const fraction = regex.fraction.test(input);

    // is there a first number ?
    if(firstNumberTest) { result = Number(firstNumberTest[0]); }
    else { return "invalid number"; }

    // is it a fraction number (second number and division symbol)?
    secondNumberTest && fraction ? result /= Number(secondNumberTest[0]):0;

    // result rounds up to 5 decimals if is float number
    result = Number.isInteger(result) ? result : Number(result.toFixed(5));
    
    return result;
  };

  this.getUnit = function(input) {
    
    const unitTest = input.match(regex.unit);
    if(unitTest){
      if(!this.isUnitValid(unitTest[0])) return "invalid unit";
      
      // "l" to "L" case
      if(unitTest[0]=="l" || unitTest[0]=="L") {return unitTest[0].toUpperCase();}
      else {return unitTest[0].toLowerCase();}
    }
    else {
      return "invalid unit";
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toLowerCase()) {
      case "gal": return "L";   // gallons to liters
      case "l":   return "gal";
      case "mi":  return "km";  // miles to kilometers
      case "km":  return "mi";
      case "lbs": return "kg";  // pounds to kilograms
      case "kg": return "lbs";
      default: return null;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit.toLowerCase()) {
      case "gal": return "gallons";
      case "l":   return "liters";
      case "mi":  return "miles";
      case "km":  return "kilometers";
      case "lbs": return "pounds";
      case "kg": return "kilograms";
      default: return null;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541; // 1 gallon = 3.78541 L
    const miToKm = 1.60934; // 1 mile = 1.60934 km
    const lbsToKg = 0.453592; // 1 pound = 0.453592 kg
    let result = null;

    switch(initUnit.toLowerCase()) {
      case "gal": result = initNum * galToL;   break; // gallons to liters
      case "l":   result = initNum / galToL;   break;
      case "mi":  result = initNum * miToKm;   break;  // miles to kilometers
      case "km":  result = initNum / miToKm;   break;
      case "lbs": result = initNum * lbsToKg;  break;  // pounds to kilograms
      case "kg":  result = initNum / lbsToKg;  break;
      default:    return null;
    }

    result = Number.isInteger(result) ? result : Number(result.toFixed(5));
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(initNum && initUnit && returnNum && returnUnit)
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return null;
  };

  
  this.isThereErrorsInObject = function(obj) {
    const errorArray = [];
    for (let i in obj){
      //console.log(i, obj[i]);
      if(String(obj[i]).includes("invalid")){
        if(!errorArray.includes(String(obj[i])))
          errorArray.push(obj[i]);
      }
    }
    //console.log("\nERROR ARRAY:", errorArray);
    let errorString = "";
    if(errorArray.length === 1)
      errorString = errorArray[0];
    if(errorArray.length === 2)
      errorString = "invalid number and unit"
    //console.log(errorString);
    return errorString;
  }; // added
  
  this.isObjectValid = function(obj) {

    const errorString = this.isThereErrorsInObject(obj);

    if(errorString)
      return errorString
    else
      return obj
  } // added
  
  this.getObjectWithAllValues = function(input) {
    const initNum = this.getNum(input);//console.log("initNum:", initNum)
    
    const initUnit = this.getUnit(input);//console.log("initUnit:", initUnit)
    
    const returnNum = this.convert(initNum, initUnit); //console.log("returnNum:", returnNum)
    
    const returnUnit = this.getReturnUnit(initUnit); //console.log("returnUnit:", returnUnit)
    
    const string = this.getString(initNum, initUnit, returnNum, returnUnit); //console.log("string:", string)
    const object = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    };

    return object;
  } // added
  
}

module.exports = ConvertHandler;
