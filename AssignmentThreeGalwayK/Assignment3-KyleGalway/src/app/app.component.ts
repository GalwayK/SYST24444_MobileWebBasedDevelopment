import { Component } from '@angular/core';

/*
  Name: Kyle Galway 
  Email: galwayk@sheridancollege.ca
  Date: July 26th, 2023
  Description: This is the main component file that handles the application logic.
  */

const CONVERSION_FACTOR: number = 2.54;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arrMetricNames = ["Millimeters", "Centimeters", "Meters"];
  arrMetricUnits = [10, 1, .01];
  arrMetricShort = ["mm", "cm", "m"];
  
  numCurrentMetric = 1;
  numCurrentUnits: number = this.arrMetricUnits[this.numCurrentMetric];
  txtCurrentUnit: string = this.arrMetricNames[this.numCurrentMetric];
  txtCurrentShort: string = this.arrMetricShort[this.numCurrentMetric];
  
  txtInches: string = "0";
  numMetric: number = 0.0;
  arrTableData: Array<any> = [];
  isSimplified: boolean = false;
  isFraction: boolean = true;
  baseNumber: number = 16;

  constructor()
  {
    this.printTestFractionConverter();
    this.printTestDecimalConverter();
    this.constructConversionTable();
  }

  get numCentimeters(): number
  {
    return this.numMetric / this.numCurrentUnits;
  }

  set numCentimeters(value)
  {
    this.numMetric = this.roundDecimal(value * this.numCurrentUnits);
  }

  constructConversionTable()
  {
    this.arrTableData = [];
    for (let numFraction = 1; numFraction <= this.baseNumber; numFraction++)
    {
      let strFraction = `${numFraction}/${this.baseNumber}`;
      const numInches = this.toDecimal(strFraction);

      let strSimplified = this.simplifyFraction(strFraction);

      strFraction = strFraction == strSimplified
        ? strFraction
        : `${strFraction} or ${strSimplified}`;

      const numMetric = this.convertInchToCentimeters(numInches) * this.numCurrentUnits;

      const objData = 
      {
        fraction: strFraction, 
        decimal: numInches, 
        metric: this.roundDecimal(numMetric, 4)
      }
      this.arrTableData.push(objData);
    }
  }

  printTestFractionConverter()
  {
    console.log("\nTesting Fraction Converter");
    const arrTestDecimals: Array<number> = [1, 0.1, 1.2, 1.5, 1.96, 1.97];
    for (const testDecimal of arrTestDecimals)
    {
      const strFraction = this.toFraction(testDecimal);
      const numCentimeters = this.convertInchToCentimeters(testDecimal);

      console.log(`toFraction(${testDecimal}) -> "${strFraction}" (${numCentimeters} cm)`);
    }
}

  printTestDecimalConverter()
  {
    console.log("\nTesting Decimal Conveter!");
    const arrTestFractions: Array<string> = ["1", "1.2", "1/2", "1/16", "3/2", "1 2/3"];
    for (const testFraction of arrTestFractions)
    {
      const decimalValue = this.toDecimal(testFraction);
      const numCentimeters = this.convertInchToCentimeters(decimalValue);

      console.log(`toDecimal("${testFraction}") -> ${this.roundDecimal(decimalValue)} (${this.roundDecimal(this.roundDecimal(numCentimeters))} cm)`);
    }
  }

  convertInchToCentimeters(numInches: number): number
  {
    return numInches * CONVERSION_FACTOR;
  }

  convertCentimetersToInches(numCentimeters: number): number
  {
    return numCentimeters / CONVERSION_FACTOR;
  }

  roundDecimal(numDecimal: number, numPlace: number = 4)
  {
    const factor = Math.pow(10, numPlace);

    return Math.round(numDecimal * factor) / factor;
  }

  toDecimal(strFraction: string): number
  {
    let numDecimal = NaN;
    const arrTokens = strFraction.trim().split(" ");

    if (arrTokens.length == 1)
    {
      const arrParts = arrTokens[0].split("/");

      if (arrParts.length == 1)
      {
        numDecimal = parseFloat(arrParts[0]);
      }
      else if (arrParts.length == 2)
      {
        let numOne = parseFloat(arrParts[0]);
        let numTwo = parseFloat(arrParts[1]);
        numDecimal = numOne / numTwo;
      }
    }
    else if (arrTokens.length == 2)
    {
      numDecimal = parseFloat(arrTokens[0]);

      const arrParts = arrTokens[1].split("/");

      numDecimal = arrParts.length != 2 
        ? NaN 
        : numDecimal;

      if (!Number.isNaN(numDecimal))
      {
        let numOne = parseFloat(arrParts[0]);
        let numTwo = parseFloat(arrParts[1]);
        numDecimal = numDecimal + (numOne / numTwo);
      }
    }
    else 
    {
      console.error("Error, fraction is not a number!");
    }

    return numDecimal;
  }

  toFraction(numDecimal: number) : string 
  {
    let strFraction: string = "NaN";

    if (numDecimal == 0)
    {
      strFraction = "0";
    }
    else if (!Number.isNaN(numDecimal))
    {
      let integer = Math.trunc(numDecimal);

      let numerator = (numDecimal - integer) * this.baseNumber;

      if (!Number.isInteger(numerator))
      {
        numerator = Math.round(numerator);
      }

      if (numerator == this.baseNumber)
      {
        strFraction = `${integer + 1}`;
      }
      else 
      {
        if (integer == 0)
        {
          strFraction = `${numerator}/${this.baseNumber}`;
        }
        else if (numerator == 0)
        {
          strFraction = `${integer}`;
        }
        else 
        {
          strFraction = `${integer} ${numerator}/${this.baseNumber}`;
        }
      }
    }

    return strFraction;
  }

  simplifyFraction(txtFraction: string): string
  {
    let arrTokens = txtFraction.split(" ");
    let strUnit = "";
    let arrParts;

    if (Number(txtFraction) || txtFraction == "0")
    {
      return txtFraction;
    }

    if (arrTokens.length == 1)
    {
      arrParts = arrTokens[0].split("/");
    }
    else if (arrTokens.length == 2)
    {
      strUnit = `${arrTokens[0]} `;
      arrParts = arrTokens[1].split("/");
    }
    else 
    {
      return txtFraction;
    }

    let numOne = parseInt(arrParts[0]);
    let numTwo = parseInt(arrParts[1]);

    if (numOne == numTwo)
    {
      return `${numOne / numTwo}`;
    }
    else if (numOne % 2 == 0 && numTwo % 2 == 0)
    {
      return this.simplifyFraction(`${strUnit}${numOne / 2}/${numTwo / 2}`);
    }
    return `${strUnit}${numOne}/${numTwo}`;
  }

  
  handleInchesUpdated()
  {
    let numInches = this.toDecimal(this.txtInches);
    if (Number.isNaN(numInches))
    {
      return;
    }
    this.numCentimeters = this.convertInchToCentimeters(numInches);
  }
  
  handleCentimetersUpdated()
  {
    let numInches = this.convertCentimetersToInches(this.numCentimeters);

    let txtInches = `${this.roundDecimal(numInches)}`;
    if (this.isFraction)
    {
      txtInches = this.toFraction(numInches);
      if (this.isSimplified)
      {
        txtInches = this.simplifyFraction(txtInches);
      }
    }
    
    if (txtInches == "NaN")
    {
      return;
    }
    this.txtInches = txtInches;
  }

  refreshApplicationData()
  {
    this.constructConversionTable();
    this.handleInchesUpdated();
  }

  handleBaseNumberChanged()
  {
    this.refreshApplicationData();
  }

  handleMetricUnitChanged()
  {
    let centimeters = this.numCentimeters;
    this.numCurrentUnits = this.arrMetricUnits[this.numCurrentMetric];
    this.txtCurrentUnit = this.arrMetricNames[this.numCurrentMetric];
    this.txtCurrentShort = this.arrMetricShort[this.numCurrentMetric];
    this.numMetric = this.roundDecimal(centimeters * this.numCurrentUnits);

    this.refreshApplicationData();
  }
}
