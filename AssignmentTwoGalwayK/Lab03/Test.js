"use strict";

const globalLab = {};

document.addEventListener("DOMContentLoaded", mainLabThree);

function mainLabThree(event)
{
    globalLab.message = document.querySelector(".header-message");

    // testVector2();
    // testLine();

    // const lineOne = new Line(1, 2, 3, 4);
    // const lineTwo = new Line(5, 6, 7, 8);

    // lineOne.set(1, 2, 3, 4);
    // log(`Point: ${line.point}`);
    // log(`Direction: ${line.direction}`);
    // log(line);
    // Logger.open();

    // globalLab.message.textContent = "Line successfully loaded!";

    // Logger.open();
}

function testLine()
{
    const lineOne = new Line(-2, 2, 2, -2);
    const lineTwo = new Line(-2, -2, 2, 2);
    const lineThree = new Line(-10, -1, 10, -1);
    const lineFour = new Line(-4, 2, 0, -2);

    // testToString();
    // testIsIntersect();
    // testIntersect();
    // testGetPointX();
    // testGetPointY();

    function testToString()
    {
        log("One: " + lineOne);
        log(lineTwo);
    }

    function testIsIntersect()
    {
        log("\nIntersection Test One");
        log(lineOne.isIntersect(lineTwo));
        log("\nIntersection Test Two");
        log(lineOne.isIntersect(lineThree));
        log("\nIntersection Test Three");
        log(lineOne.isIntersect(lineFour));
    }

    function testIntersect()
    {
        log("\nIntersection Test One");
        log(lineOne.intersect(lineTwo));
        log("\nIntersection Test Two");
        log(lineOne.intersect(lineThree));
        log("\nIntersection Test Three");
        log(lineOne.intersect(lineFour));
    }

    function testGetPointX()
    {
        log(lineOne.getPointX(10));
        log(lineTwo.getPointX(10));
        log(lineThree.getPointX(10));
        log(lineFour.getPointX(10));
    }

    function testGetPointY()
    {
        log(lineOne);
        log(lineOne.getPointY(10));
        log(lineTwo.getPointY(10));
        log(lineThree.getPointY(100));
        log(lineFour.getPointY(10));
    }
}

function testVector2()
{
    const vectorOne = new Vector2(2, 4);
    const vectorTwo = new Vector2(3, 4);

    log(vectorOne);
    log(vectorTwo);

    // testClone();
    // testAdd();
    // testSubtract();
    // testScale();
    // testDivide();
    // testNormalize();

    function testClone()
    {
        let vectorClone = vectorOne.clone();
        log(vectorClone);

        vectorClone = vectorTwo.clone();
        log(vectorClone);
    }

    function testAdd()
    {
        let vectorClone = vectorOne.clone();
        vectorClone.add(vectorTwo);
        log(vectorClone);
    }

    function testSubtract()
    {
        let vectorClone = vectorOne.clone();
        vectorClone.subtract(vectorTwo);
        log(vectorClone);
    }

    function testScale()
    {
        let vectorClone = vectorOne.clone();
        vectorClone.scale(2);
        log(vectorClone);
    }

    function testDivide()
    {
        let vectorClone = vectorOne.clone();
        vectorClone.divide(2);
        log(vectorClone);
    }

    function testNormalize()
    {
        log("Testing normalization!");
        let vectorClone = vectorOne.clone();
        vectorClone.normalize();
        log(`Normalized: ${vectorClone}.`);
    }
}