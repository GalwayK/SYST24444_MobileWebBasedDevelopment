class Line 
{
    constructor(x1 = 0, x2 = 0, y1 = 0, y2 = 0)
    {
        this.point = new Vector2(x1, y2);
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
        return `Line (${this.point.x}, ${this.point.y}) `
           + `t(${this.direction.x}, ${this.direction.y})`;
    }
}