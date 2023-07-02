"use strict";

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

globalObject.arrPoints = ["P1", "P2", "Q1", "Q2"];
globalObject.arrColors = ["#000000", "#999999", "#ff0000", "#0000ff", "#00ff00", "#00ffff", "#ffff00", "#ff00ff"];


document.addEventListener("DOMContentLoaded", main);

function main()
{
    console.log("Application loaded!");
    initializeGrid();
}

function initializeGrid()
{
    globalObject.grid = document.querySelector(".grid");
    globalObject.main = document.querySelector("main");

    window.addEventListener("resize", handleResize);

    handleResize();
    initializeControls();
}

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
    }

    updateControls();
}

function updateControls()
{
    for (const point of globalObject.arrPoints)
    {
        globalObject[point].labels.x.innerText = `${globalObject[point].sliders.x.value}`;
        globalObject[point].x = parseFloat(globalObject[point].sliders.x.value);
        globalObject[point].labels.y.innerText = `${globalObject[point].sliders.y.value}`;
        globalObject[point].y = parseFloat(globalObject[point].sliders.y.value);

        console.log(globalObject[point]);
    }
    draw();
}

function handleResize()
{
    console.log("Handling Resize!");

    globalObject.grid.width = globalObject.grid.clientWidth;
    globalObject.grid.height = globalObject.grid.width;

    console.log(window.innerHeight);
    console.log(window.innerWidth);

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
        console.log("Whoops!");
        return;
    }

    globalObject.aspectRatio = globalObject.grid.width / globalObject.grid.height; 

    globalObject.dimScale = globalObject.grid.height / (DIM * 2);
    globalObject.dimTransX = DIM * globalObject.aspectRatio;
    globalObject.dimTransY = DIM;

    draw();
}

function draw()
{
    console.log("Drawing grid!");
    let context = globalObject.grid.getContext("2d");

    context.clearRect(0, 0, globalObject.grid.width, globalObject.grid.height);

    context.save();

    context.scale(globalObject.dimScale, -globalObject.dimScale);    
    context.translate(globalObject.dimTransX, -globalObject.dimTransY);

    drawGrid(context);

    drawAxis(context);

    drawPoints(context);

    drawText(context);

    context.restore();
}

function drawGrid(context)
{
    const MAX_X = Math.ceil(globalObject.dimTransX);
    const MAX_Y = Math.ceil(globalObject.dimTransY);
    context.lineWidth = 0.5 / globalObject.dimScale;

   
    let numLines = 2;
    for(let y = -MAX_Y; y <= MAX_Y; ++y)
    {
        context.beginPath();

        if(y % 5 == 0)
            context.strokeStyle = globalObject.arrColors[numLines++];
        else
            context.strokeStyle = globalObject.arrColors[1];

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

function drawPoints(context)
{
    const R = 0.5;  
    let numPoints = 1;

    for (const point of globalObject.arrPoints)
    {
        const strColor = numPoints++ < 3 
            ? globalObject.arrColors[2]
            : globalObject.arrColors[3];
            
        console.log(globalObject[point]);
        context.beginPath();
        context.fillStyle = strColor;
        context.arc(globalObject[point].x, globalObject[point].y, R, 0, Math.PI * 2);
        context.fill();
    }
    
}