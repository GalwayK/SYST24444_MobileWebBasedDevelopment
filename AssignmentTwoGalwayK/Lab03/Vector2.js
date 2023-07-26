"use strict";

/*
Name: Kyle Galway 
Email: galwayk@sheridancollege.ca
Date: June 7th, 2023
Description: This script provides the Vector2 class for calculate a point on a 
grid based on a pair of x and y coordinates distanced for the origin point 0.
*/

class Vector2 
{
    x;
    y; 

    // Constructor for Vector2 Objects.
    constructor(x=0, y=0)
    {
        x = parseFloat(x);
        y = parseFloat(y);
        this.x = x;
        this.y = y;
    }

    // Setter for changing Vector2 coordinates.
    set(x, y)
    {
        x = parseFloat(x);
        y = parseFloat(y);
        this.x = x;
        this.y = y;
        return this;
    }

    // Function to return X coordinate rounded to default 3 decimal places. 
    getFixedX(numDecimal=3)
    {
        return this.x.toPrecision(numDecimal);
    }

    // Function to return Y coordinate rounded to default 3 decimal places. 
    getFixedY(numDecimal=3)
    {
        return this.y.toPrecision(numDecimal);
    }

    // Return string representation of Vector2 object.
    toString()
    {
        return `Coordinates: ${this.coordinates}`;
    }

    // Return string representation of Vector2 coordinates.
    get coordinates()
    {
        return `(${this.getFixedX()}, ${this.getFixedY()})`;
    }

    // Function to return length of Vector2 object from origin.
    length()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    // Function to return distance between two Vector2 objects.
    distance(that)
    {
        return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2));
    }

    // Function to calculate dot of Vector2 object.
    dot(that)
    {
        let dot = NaN;
        if (that instanceof Vector2)
        {
            dot = this.x * that.x + this.y * that.y;
        }
        return dot;
    }

    // Function to create a shallow copy of Vector2 object.
    clone()
    {
        const copyX = this.x;
        const copyY = this.y;
        const copyVector2 = new Vector2(copyX, copyY);
        return copyVector2;
    }

    // Function to add two Vector2 objects together. 
    add(that)
    {
        const sumX = this.x + that.x;
        const sumY = this.y + that.y;

        this.set(sumX, sumY);
        return this;
    }

    // Function to subtract two Vector2 objects. 
    subtract(that)
    {
        const differenceX = this.x - that.x;
        const differenceY = this.y - that.y;

        this.set(differenceX, differenceY);
        return this;
    }

    // Function to multiply two Vector2 objects.
    scale(scalar)
    {
        const productX = this.x * scalar;
        const productY = this.y * scalar;

        this.set(productX, productY);
        return this;
    }

    // Function to divide two Vector2 objects.
    divide(divisor)
    {
        const reciprocal = 1.0 / divisor

        this.scale(reciprocal);

        return this;
    }

    // Function to normalize Vector2 object.
    normalize()
    {
        const normalizedX = this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const normalizedY = this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        this.set(normalizedX, normalizedY);
        return this;
    }
}