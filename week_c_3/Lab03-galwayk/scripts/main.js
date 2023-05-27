document.addEventListener("DOMContentLoaded", mainFunction);

function mainFunction()
{
    const line = new Line(1, 2, 3, 4);
    line.set(1, 2, 3, 4);
    log(`Point: ${line.point}`);
    log(`Direction: ${line.direction}`);
    log(line);
    Logger.open();

    const divMessage = document.getElementById("message");
    divMessage.innerText = line;
}