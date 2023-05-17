"use strict";

const globalObject = {};

const funcAddHeader = async function()
{
    globalObject.message = document.getElementById("message");

    const funcInsertHTML = function(strHTML, divElement)
    {
        divElement.insertAdjacentHTML("afterbegin", strHTML);
    };

    const funcHandleHeaderClickEvent = function(event)
    {
        const flexTarget = event.target.closest(".flexitem");
        if (flexTarget)
        {
            const strText = flexTarget.firstChild.innerText;
            globalObject.message.innerText = strText;
        }
    };

    const funcMapHTMLToPromise = async function(divInclude) 
    {
            const response = await fetch(divInclude.dataset.htmlFile);
            if (!response.ok) throw new Error("Error: File not found.");

            const strResponse = await response.text();

            funcInsertHTML(strResponse, divInclude);
            divInclude.removeAttribute("data-html-file");
            return Promise.resolve("Resolved");
    };

    const funcResolveIncludePromises = async function(arrIncludes)
    {
        const arrPromises = arrIncludes.map(funcMapHTMLToPromise);
        return Promise.all(arrPromises);
    };
    
    const arrIncludes = 
        [...document.getElementsByClassName("include-html-section")];

    try 
    {
        await funcResolveIncludePromises(arrIncludes);
        globalObject.header = document.querySelector(".flexbox");
        globalObject.header.addEventListener("click", 
            funcHandleHeaderClickEvent);
        log("Header loaded.");
    }
    catch (error)
    {
        log(error.message);
    }
    finally 
    {
        log("Script finished.");
    }
}

document.addEventListener("DOMContentLoaded", funcAddHeader);