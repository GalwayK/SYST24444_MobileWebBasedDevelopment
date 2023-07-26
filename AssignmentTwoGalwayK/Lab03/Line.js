"use strict";

/*
Name: Kyle Galway 
Email: galwayk@sheridancollege.ca
Date: June 7th, 2023
Description: This script provides the Line class for the main class. This script 
must be loaded after the Vector2 script and before the main script. 
*/

class Line 
{
    // Constructor for Line objects.
    constructor(x1=0, y1=0, x2=0, y2=0)
    {
        this.point = new Vector2(x1, y1);
        this.direction = new Vector2(x2 - x1, y2 - y1);
    }

    // Set method for change points. 
    set(x1, y1, x2, y2)
    {
        this.point.set(x1, y1);
        this.direction.set(x2 - x1, y2 - y1);
        return this;
    }

    // Return toString of Line as default parametric form.
    toString()
    {
        return `Line: ${this.getParametricForm()}`;
    }

    // Return string of Line as parametric form.
    getParametricForm()
    {
        return `(${this.point.getFixedX()}, ${this.point.getFixedY()}) ` + 
            `+ t(${this.direction.getFixedX()}, ${this.direction.getFixedY()})`;
    }

    // Return string of Line in standard form.
    getStandardForm()
    {
        return `${this.getFixedA()}x + ${this.getFixedB()}y = ${this.getFixedC()}`;
    }

    // Return string of Line in slope-intersect form.
    getSlopeForm()
    {
        return `${this.getFixedA()}x + ${this.getFixedB()}y - ${this.getFixedC()} = ${this.a * this.point.x + this.b * this.point.y - this.c}`;
    }   

    // Get A of standard form rounded to 3 decimal places by default. 
    getFixedA(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.a * numDivide) / numDivide; 
    }

    // Get B of standard form rounded to 3 decimal places by default.
    getFixedB(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.b * numDivide) / numDivide; 
    }

    // Get C of standard form rounded to 3 decimal places by default.
    getFixedC(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.c * numDivide) / numDivide; 
    }

    // Get A of standad form with no rounding.
    get a()
    {
        return this.direction.y;
    }

    // Get B of standard form with no rounding.
    get b()
    {
        return -this.direction.x;
    }

    // Get C of standard form with no rounding.
    get c()
    {
        return this.direction.y * this.point.x - this.direction.x * this.point.y;
    }

    // Calculate intersect point and return as Vector2 point. 
    intersect(that)
    {
        let a = this.a;
        let b = this.b;
        let c = this.c;
      
        let d = that.a;
        let e = that.b;
        let f = that.c;

        let det = a * e - b * d;

        if (det != 0)
        {
            let x = (c * e - b * f) / det;
            let y = (a * f - c * d) / det;
            return new Vector2(x, y);
        }
        else 
        {
            return new Vector2(NaN, NaN);
        }
    }

    // Return whether Line intersect with another Line object as boolean.
    isIntersect(that)
    {
        let a = this.direction.y;
        let b = -this.direction.x;
        let c = this.direction.y * this.point.x - this.direction.x * this.point.y;

        let d = that.direction.y;
        let e = -that.direction.x;
        let f = that.direction.y * that.point.x - that.direction.x * that.point.y;

        let det = a * e - b * d;

        return det != 0;
    }

    // Get X point from given Y point.
    getPointX(y)
    {
        let t = (y - this.point.y) / this.direction.y;

        let x = this.point.x + t * this.direction.x;

        return x;
    }

    // Get Y point from given X point.
    getPointY(x)
    {
        let t = (x - this.point.x) / this.direction.x;

        let y = this.point.y + t * this.direction.y;

        return y;
    }
}