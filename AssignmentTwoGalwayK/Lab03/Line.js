"use strict";

class Line 
{
    constructor(x1=0, y1=0, x2=0, y2=0)
    {
        this.point = new Vector2(x1, y1);
        this.direction = new Vector2(x2 - x1, y2 - y1);
    }

    set(x1, y1, x2, y2)
    {
        this.point.set(x1, y1);
        this.direction.set(x2 - x1, y2 - y1);
        return this;
    }

    toString()
    {
        return `Line: ${this.getParametricForm()}`;
    }

    getParametricForm()
    {
        return `(${this.point.getFixedX()}, ${this.point.getFixedY()}) ` + 
            `+ t(${this.direction.getFixedX()}, ${this.direction.getFixedY()})`;
    }

    getStandardForm()
    {
        return `${this.getFixedA()}x + ${this.getFixedB()}y = ${this.getFixedC()}`;
    }

    getSlopeForm()
    {
        return `${this.getFixedA()}x + ${this.getFixedB()}y - ${this.getFixedC()} = ${this.a * this.point.x + this.b * this.point.y - this.c}`;
    }   

    getFixedA(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.a * numDivide) / numDivide; 
    }

    getFixedB(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.b * numDivide) / numDivide; 
    }

    getFixedC(numDecimal=3)
    {
        const numDivide = Math.pow(10, numDecimal);
        return Math.round(this.c * numDivide) / numDivide; 
    }

    get a()
    {
        return this.direction.y;
    }

    get b()
    {
        return -this.direction.x;
    }

    get c()
    {
        return this.direction.y * this.point.x - this.direction.x * this.point.y;
    }

    intersect(that)
    {
        // let a = this.direction.y;
        // let b = -this.direction.x;
        // let c = this.direction.y * this.point.x - this.direction.x * this.point.y;
        let a = this.a;
        let b = this.b;
        let c = this.c;
        // log(`Equation One Version 1: ${a}x + ${b}y = ${c}`);
        // log(`Point: ${this.point}`);
        // log(`Direction: ${this.direction}\n`);

        // let d = that.direction.y;
        // let e = -that.direction.x;
        // let f = that.direction.y * that.point.x - that.direction.x * that.point.y;
        let d = that.a;
        let e = that.b;
        let f = that.c;
        // log(`Equation Two: ${d}x + ${e}y = ${f}`);
        // log(`Point: ${that.point}`);
        // log(`Direction: ${that.direction}`);

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

    getPointX(y)
    {
        let t = (y - this.point.y) / this.direction.y;

        let x = this.point.x + t * this.direction.x;

        return x;
    }

    getPointY(x)
    {
        let t = (x - this.point.x) / this.direction.x;

        let y = this.point.y + t * this.direction.y;

        return y;
    }
}