"use strict";

class Vector2 
{
    x;
    y; 

    constructor(x=0, y=0)
    {
        x = parseFloat(x);
        y = parseFloat(y);
        this.x = x;
        this.y = y;
    }

    set(x, y)
    {
        x = parseFloat(x);
        y = parseFloat(y);
        this.x = x;
        this.y = y;
        return this;
    }

    getFixedX(numDecimal=3)
    {
        return this.x.toPrecision(numDecimal);
    }

    getFixedY(numDecimal=3)
    {
        return this.y.toPrecision(numDecimal);
    }

    toString()
    {
        return `Coordinates: ${this.coordinates}`;
    }

    get coordinates()
    {
        return `(${this.getFixedX()}, ${this.getFixedY()})`;
    }

    length()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    distance(that)
    {
        return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2));
    }

    dot(that)
    {
        let dot = NaN;
        if (that instanceof Vector2)
        {
            dot = this.x * that.x + this.y * that.y;
        }
        return dot;
    }

    clone()
    {
        const copyX = this.x;
        const copyY = this.y;
        const copyVector2 = new Vector2(copyX, copyY);
        return copyVector2;
    }

    add(that)
    {
        const sumX = this.x + that.x;
        const sumY = this.y + that.y;

        this.set(sumX, sumY);
        return this;
    }

    subtract(that)
    {
        const differenceX = this.x - that.x;
        const differenceY = this.y - that.y;

        this.set(differenceX, differenceY);
        return this;
    }

    scale(scalar)
    {
        const productX = this.x * scalar;
        const productY = this.y * scalar;

        this.set(productX, productY);
        return this;
    }

    divide(divisor)
    {
        const reciprocal = 1.0 / divisor

        this.scale(reciprocal);

        return this;
    }

    normalize()
    {
        const normalizedX = this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const normalizedY = this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        this.set(normalizedX, normalizedY);
        return this;
    }
}