const Vector2 = (() => 
{
    const Vector2 = function(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    Vector2.prototype.set = function(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Vector2.prototype.clone = function()
    {
        return new Vector2(this.x, this.y);
    }

    Vector2.prototype.toString = function()
    {
        return `Vector2 (${this.x}, ${this.y})`;
    }
    return Vector2;
})();

