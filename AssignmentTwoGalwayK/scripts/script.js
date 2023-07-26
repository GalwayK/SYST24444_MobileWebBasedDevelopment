"use strict";

/*
Name: Kyle Galway 
Email: galwayk@sheridancollege.ca
Date: June 7th, 2023
Description: This file provides the main logic for the assignment. It 
initializes the components of the page and attaches the event listeners to 
redraw the grid and lines whenever one of the sliders is updated or the page 
is reset. 
*/
const globalObject = {};

const DIM = 10;

globalObject.P1 = {};
globalObject.P2 = {};
globalObject.Q1 = {};
globalObject.Q2 = {};

globalObject.P1.labels = {};
globalObject.P2.labels = {};
globalObject.Q1.labels = {};
globalObject.Q2.labels = {};

globalObject.P1.sliders = {};
globalObject.P2.sliders = {};
globalObject.Q1.sliders = {};
globalObject.Q2.sliders = {};

globalObject.arrLines= [];
globalObject.arrForms = [];

globalObject.P1.line = new Line();

globalObject.arrPoints = ["P1", "P2", "Q1", "Q2"];
globalObject.arrColors = ["#000000", "#999999", "#ff0000", "#0000ff", "#00ff00", 
    "#00ffff", "#ffff00", "#ff00ff"];

globalObject.P1.defaultX = -8;
globalObject.P1.defaultY = -4;

globalObject.P2.defaultX = 7;
globalObject.P2.defaultY = 6;

globalObject.Q1.defaultX = -2;
globalObject.Q1.defaultY = 8;

globalObject.Q2.defaultX = 6;
globalObject.Q2.defaultY = -8;

document.addEventListener("DOMContentLoaded", main);

// Main entry point for application on page load. 
function main()
{
    console.log("Application loaded!");

    globalObject.grid = document.querySelector(".grid");
    globalObject.main = document.querySelector("main");
    globalObject.btnReset = document.querySelector(".btnReset");

    globalObject.btnReset.addEventListener("click", initializeGrid);
    window.addEventListener("resize", handleResize);

    initializeGrid();
}

// Function to initialize grid on page load. 
function initializeGrid()
{
    initializeControls();
    handleResize();
}

// Function to initialize the line objects when the page on page load. 
function initializeLines()
{
    const P1 = globalObject.P1.sliders;
    const P2 = globalObject.P2.sliders;
    const Q1 = globalObject.Q1.sliders;
    const Q2 = globalObject.Q2.sliders;

    const lineOne = new Line(P1.x.value, P1.y.value, P2.x.value, P2.y.value);
    const lineTwo = new Line(Q1.x.value, Q1.y.value, Q2.x.value, Q2.x.value);

    globalObject.arrForms[0] = {};
    globalObject.arrForms[0].parametric = document.querySelector(".line-1-parametric");
    globalObject.arrForms[0].slope = document.querySelector(".line-1-slope");
    globalObject.arrForms[0].standard = document.querySelector(".line-1-standard");

    globalObject.arrForms[1] = {};
    globalObject.arrForms[1].parametric = document.querySelector(".line-2-parametric");
    globalObject.arrForms[1].slope = document.querySelector(".line-2-slope");
    globalObject.arrForms[1].standard = document.querySelector(".line-2-standard");

    globalObject.arrLines[0] = lineOne;
    globalObject.arrLines[1] = lineTwo;
}

// Function to initialize the menu controls on page load. 
function initializeControls()
{
    for (const point of globalObject.arrPoints)
    {
        globalObject[point].labels.x = document.getElementById(`xLab${point}`);
        globalObject[point].labels.y = document.getElementById(`yLab${point}`);

        globalObject[point].sliders.x = document.getElementById(`xCor${point}`);
        globalObject[point].sliders.y = document.getElementById(`yCor${point}`);

        globalObject[point].sliders.x.addEventListener("input", updateControls);
        globalObject[point].sliders.y.addEventListener("input", updateControls);

        globalObject[point].sliders.x.value = globalObject[point].defaultX;
        globalObject[point].sliders.y.value = globalObject[point].defaultY;
    }

    initializeLines();
    initializeIntersect();
    updateControls();
}

// Function to initialize the intersect label on page load. 
function initializeIntersect()
{
    globalObject.intersect = document.querySelector(".intersection");
}

// Function to update the Line objects whenever a slider is altered.
function updateLines()
{
    const P1 = globalObject.P1.sliders;
    const P2 = globalObject.P2.sliders;
    const Q1 = globalObject.Q1.sliders;
    const Q2 = globalObject.Q2.sliders;

    globalObject.arrLines[0].set(P1.x.value, P1.y.value, P2.x.value, P2.y.value);
    globalObject.arrLines[1].set(Q1.x.value, Q1.y.value, Q2.x.value, Q2.y.value);
}

// Function to update a control label when a slider is altered. 
function updateControls()
{
    for (const point of globalObject.arrPoints)
    {
        globalObject[point].labels.x.innerText = `${globalObject[point].sliders.x.value}`;
        globalObject[point].x = parseFloat(globalObject[point].sliders.x.value);
        globalObject[point].labels.y.innerText = `${globalObject[point].sliders.y.value}`;
        globalObject[point].y = parseFloat(globalObject[point].sliders.y.value);
    }
    updateLines();
    updateForms();
    updateIntersect();
    handleResize();
}

// Function to update the Line form displays when a slider is altered. 
function updateForms()
{
    const lineOne = globalObject.arrLines[0];
    const lineTwo = globalObject.arrLines[1];

    const formsOne = globalObject.arrForms[0];
    const formsTwo = globalObject.arrForms[1];

    formsOne.parametric.textContent = lineOne.getParametricForm();
    formsOne.slope.textContent = lineOne.getSlopeForm();
    formsOne.standard.textContent = lineOne.getStandardForm();

    formsTwo.parametric.textContent = lineTwo.getParametricForm();
    formsTwo.slope.textContent = lineTwo.getSlopeForm();
    formsTwo.standard.textContent = lineTwo.getStandardForm();
}

// Function to update the intersect point label when a slider is altered.
function updateIntersect()
{
    globalObject.intersect.textContent = 
        globalObject.arrLines[0].intersect(globalObject.arrLines[1]);
}

// Function to handle a resize when the size of the page is changed. 
function handleResize()
{
    globalObject.grid.width = globalObject.grid.clientWidth;
    globalObject.grid.height = globalObject.grid.width;

    if (window.innerWidth > window.innerHeight)
    {
        globalObject.main.style["flex-direction"] = "row";
    }
    else 
    {
        globalObject.main.style["flex-direction"] = "column";
    }

    if(globalObject.grid.width === 0 || globalObject.grid.height === 0)
    {
        return;
    }

    globalObject.aspectRatio = globalObject.grid.width / globalObject.grid.height; 

    globalObject.dimScale = globalObject.grid.height / (DIM * 2);
    globalObject.dimTransX = DIM * globalObject.aspectRatio;
    globalObject.dimTransY = DIM;

    draw();
}

// Function to draw the grid and grid elements when the page or lines change
function draw()
{
    let context = globalObject.grid.getContext("2d");

    context.clearRect(0, 0, globalObject.grid.width, globalObject.grid.height);

    context.save();

    context.scale(globalObject.dimScale, -globalObject.dimScale);    
    context.translate(globalObject.dimTransX, -globalObject.dimTransY);

    drawGrid(context);

    drawAxis(context);

    drawText(context);

    drawLines(context);

    drawPoints(context);

    drawIntersect(context);

    context.restore();
}

// Function to draw the grid and grid lines.
function drawGrid(context)
{
    const MAX_X = Math.ceil(globalObject.dimTransX);
    const MAX_Y = Math.ceil(globalObject.dimTransY);
    context.lineWidth = .5 / globalObject.dimScale;

    let numLines = 2;
    for(let y = -MAX_Y; y <= MAX_Y; ++y)
    {
        context.beginPath();

        if(y % 5 == 0)
        {
            context.strokeStyle = globalObject.arrColors[numLines++];
        }
        else
        {
            context.strokeStyle = globalObject.arrColors[1];
        }

        context.moveTo(-MAX_X, y);
        context.lineTo(MAX_X, y);
        context.stroke();
    }

    for(let x = -MAX_X; x <= MAX_X; ++x)
    {
        context.beginPath();

        if(x % 5 == 0)
            context.strokeStyle = globalObject.arrColors[numLines--];
        else
            context.strokeStyle = globalObject.arrColors[1];

        context.moveTo(x, -MAX_Y);
        context.lineTo(x,  MAX_Y);
        context.stroke();
    }
}

// Function to draw the grid axis with custom colors. 
function drawAxis(context)
{
    const X = globalObject.dimTransX;
    const Y = globalObject.dimTransY;

    context.beginPath();
    context.strokeStyle = globalObject.arrColors[7];
    context.lineWidth = 2 / globalObject.dimScale;
    context.moveTo(-X, 0);    
    context.lineTo(X, 0);

    context.moveTo(X-0.3, -0.2);
    context.lineTo(X, 0);
    context.lineTo(X-0.3, 0.2);
    context.stroke();

    context.beginPath();
    context.strokeStyle = globalObject.arrColors[4];
    context.moveTo(0,  Y);    
    context.lineTo(0, -Y);

    context.moveTo(-0.2, Y-0.3);
    context.lineTo(0, Y);
    context.lineTo(0.2, Y-0.3);
    context.stroke();
}

// Function to draw the text on the grid. 
function drawText(context)
{
    context.save();

    context.scale(1, -1);   
    context.font = "0.8px sans-serif";
    context.fillStyle = "#000000";
    context.fillText("0", 0.2, 0.8);
    context.fillText("x", globalObject.dimTransX-0.5, 0.8);
    context.fillText("y", 0.2, -globalObject.dimTransY+0.6);

    context.restore();
}

// Function to draw the Vector2 points on the grid.
function drawPoints(context)
{
    const R = 0.5;  
    let numPoints = 1;

    for (const point of globalObject.arrPoints)
    {
        const strColor = numPoints++ < 3 
            ? globalObject.arrColors[2]
            : globalObject.arrColors[3];
            
        context.beginPath();
        context.fillStyle = strColor;
        context.arc(globalObject[point].x, globalObject[point].y, R, 0, Math.PI * 2);
        context.fill();

        context.save();

        context.scale(1, -1);   
        context.font = "0.8px verdana";
        context.fillText(point, globalObject[point].x - .5, -globalObject[point].y + 1.2);

        context.restore();
    }
}

// Function to draw the intersection point on the grid.
function drawIntersect(context)
{
    const lineOne = globalObject.arrLines[0];
    const lineTwo = globalObject.arrLines[1];

    const R = 0.5;  

    if (lineOne.isIntersect(lineTwo))
    {
        const intersectPoint = lineOne.intersect(lineTwo);
        const strColor = globalObject.arrColors[7];
            
        context.beginPath();
        context.fillStyle = strColor;
        context.arc(intersectPoint.x, intersectPoint.y, R, 0, Math.PI * 2);
        context.fill();
    }
}

// Function to draw the Line objects on the grid. 
function drawLines(context)
{
    let S = 300;

    let lineOne = globalObject.arrLines[0];
    let lineTwo = globalObject.arrLines[1];

    function drawLine(line, strColor)
    {
        let v = line.direction.clone().normalize();
        let P1 = line.point.clone().add(v.clone().scale(S));
        let P2 = line.point.clone().add(v.clone().scale(-S));

        context.beginPath();

        context.strokeStyle = strColor;

        context.moveTo(P1.x, P1.y);
        context.lineTo(P2.x, P2.y);

        context.stroke();
    }

    drawLine(lineOne, globalObject.arrColors[2]);
    drawLine(lineTwo, globalObject.arrColors[5]);
}