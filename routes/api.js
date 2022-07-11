'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  /*EXAMPLE USAGE:
    /api/convert?input=4gal CHECKED!
    /api/convert?input=1/2km CHECKED!
    /api/convert?input=5.4/3lbs CHECKED!
    /api/convert?input=kg CHECKED!*/

  //FUNCTIONS:
    //.isUnitValid(unit)
    //.getNum(input)
    //.getUnit(input)
    //.getReturnUnit(initUnit)
    //.spellOutUnit(unit)
    //.convert(initNum, initUnit)
    //.getString(initNum, initUnit, returnNum, returnUnit)
    //.getObjectWithAllValues(input) + .isObjectValid(object)

  app.get("/api/convert", (req, res) => {
    //console.log("\/\/----------------------------------\/\/")
    const input = req.query.input;
        //console.log("INPUT:", input, "\n");
    const obj = convertHandler.getObjectWithAllValues(input);
        //console.log("OBJ:", obj)
    const isObjValid = convertHandler.isObjectValid(obj);
        //console.log("\nISOBJVALID:", isObjValid)

    if(typeof isObjValid === typeof "error string") {
      const error = isObjValid;
      //console.log("\n", error);
      res.send(error);
    }
    else {
      //console.log("\/\/----------------------------------\/\/")
      res.send(obj);
    }
    //{"initNum":1,"initUnit":"gal","returnNum":3.78541,"returnUnit":"L","string":"1 gallons converts to 3.78541 liters"}
    
  });

};
