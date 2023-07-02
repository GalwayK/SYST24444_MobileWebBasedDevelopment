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
        return `Line: (${this.point.x}, ${this.point.y}) + t(${this.direction.x}, ${this.direction.y})`;
    }

    intersect(that)
    {
        let a = this.direction.y;
        let b = -this.direction.x;
        let c = this.direction.y * this.point.x - this.direction.x * this.point.y;
        log(`Equation One: ${a}x + ${b}y = ${c}`);
        log(`Point: ${this.point}`);
        log(`Direction: ${this.direction}\n`);

        let d = that.direction.y;
        let e = -that.direction.x;
        let f = that.direction.y * that.point.x - that.direction.x * that.point.y;
        log(`Equation Two: ${d}x + ${e}y = ${f}`);
        log(`Point: ${that.point}`);
        log(`Direction: ${that.direction}`);

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
        log(`Equation One: ${a}x + ${b}y = ${c}`);
        log(`Point: ${this.point}`);
        log(`Direction: ${this.direction}\n`);

        let d = that.direction.y;
        let e = -that.direction.x;
        let f = that.direction.y * that.point.x - that.direction.x * that.point.y;
        log(`Equation Two: ${d}x + ${e}y = ${f}`);
        log(`Point: ${that.point}`);
        log(`Direction: ${that.direction}`);

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