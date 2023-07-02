"use strict";

class Vector2 
{
    x;
    y; 

    constructor(x=0, y=0)
    {
        this.x = x;
        this.y = y;
    }

    set(x, y)
    {
        this.x = x;
        this.y = y;
        return this;
    }

    clone()
    {
        return new Vector2(this.x, this.y);
    }

    toString()
    {
        return `Coordinates: (${this.x.toFixed(3)}, ${this.y.toFixed(3)})`;
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
    }

    subtract(that)
    {
        const differenceX = this.x - that.x;
        const differenceY = this.y - that.y;

        this.set(differenceX, differenceY);
    }

    scale(scalar)
    {
        const productX = this.x * scalar;
        const productY = this.y * scalar;

        this.set(productX, productY);
    }

    divide(divisor)
    {
        const reciprocal = 1.0 / divisor

        this.scale(reciprocal);
    }

    normalize()
    {
        const normalizedX = this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const normalizedY = this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        this.set(normalizedX, normalizedY);
    }
}