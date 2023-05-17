const globalObject = {};

globalObject.colOne = document.querySelector(".colOne");
globalObject.colTwo = document.querySelector(".colTwo");
globalObject.dimOne = document.getElementById("dimOne");
globalObject.dimTwo = document.getElementById("dimTwo");

const funcHandleResize = function()
{
    globalObject.dimOne.innerText = 
        `${globalObject.colOne.clientWidth} x ${globalObject.colOne.clientHeight}`;
    globalObject.dimTwo.innerText = 
        `${globalObject.colTwo.clientWidth} x ${globalObject.colTwo.clientHeight}`;

}

funcHandleResize();

window.addEventListener("resize", funcHandleResize);

