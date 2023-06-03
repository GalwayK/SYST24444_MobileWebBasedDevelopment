"use strict";

/*
File: assignment_one.js
Student: Kyle Galway 
Student Number: 991418738
Description: This file contains all of the JavaScript used in this application. 
This includes the dynamic loading of HTML template pages, and some DOM 
manipulation for advanced display and layouts.
*/

const globalVariables = new Map();

document.addEventListener("DOMContentLoaded", mainFunction);

async function mainFunction()
{
    const loadTemplateSections = async function()
    {
        const funcInsertHtml = function(divInclude, strResponse)
        {
            divInclude.insertAdjacentHTML("afterBegin", strResponse);
        };

        const funcMapHTMLToPromiseArray = async function(divInclude)
        {
            if (!divInclude) return null;

            const fetchResponse = await fetch(divInclude.dataset.href);

            if (!fetchResponse.ok) throw new Error("Error, file not found!");

            const strResponse = await fetchResponse.text();

            funcInsertHtml(divInclude, strResponse);
            divInclude.removeAttribute(divInclude.dataset.href);
            return Promise.resolve("Resolved");
        };

        const funcResolveIncludePromises = async function(arrIncludes)
        {
            const arrPromises = await arrIncludes.map(funcMapHTMLToPromiseArray);
            return Promise.all(arrPromises);
        };

        const arrIncludes = [...document.getElementsByClassName("include")];

        await funcResolveIncludePromises(arrIncludes); 
    }


    const mapGlobalVariables = function()
    {
        globalVariables.headerNav = document.querySelector(".header-links");
        globalVariables.footer = document.querySelector("footer");
        globalVariables.header = document.querySelector("header");
        globalVariables.slider = document.querySelector(".projects");
        globalVariables.sliderDots = document.querySelector(".dots");
        globalVariables.contactsNav = document.querySelector(".contacts");
        globalVariables.contactsContainer = document.querySelector(".contacts-container");
    }

    const implementHeaderEffects = function()
    {
        const handleMouseOverEvent = function(event)
        {
            changeHeaderLinkFocus.call(this, event, "0.3");
        };

        const handleMouseOutEvent = function(event)
        {
            changeHeaderLinkFocus.apply(this, [event, "1.0"]);
        };

        const changeHeaderLinkFocus = function(event, strFocus)
        {
            console.log("Altering focus!");

            const targetLink = event.target?.closest(".header-button"); 

            console.dir(event.target.closest(".header-button"));

            if (targetLink)
            {
                console.log("Altering focus!");
                const filterLinkSiblings = (linkSibling) => 
                    linkSibling != targetLink;

                const alterLinkOpacity = (linkSibling) => 
                    linkSibling.style.opacity = strFocus;

                [...globalVariables.headerNav.querySelectorAll(".header-button")]
                    .filter(filterLinkSiblings)
                    .forEach(alterLinkOpacity);
            }
        };

        globalVariables.headerNav.addEventListener("mouseover", handleMouseOverEvent);
        globalVariables.headerNav.addEventListener("mouseout", handleMouseOutEvent);
    };

    const implementProjectSliders = function()
    {
        if (!globalVariables.slider)
        {
            console.log("Not on slider page.");
            return null;
        }
        let currentSlide = 0;

        const createDots = function(projectDiv, numIndex)
        {
            globalVariables.sliderDots.insertAdjacentHTML("beforeend", 
                `<button class = "dot" data-slide = "${numIndex}"></button>`);
        };

        const slideProjects = function(event)
        {
            [...globalVariables.sliderDots.children].forEach(updateDots);

            arrSlides.forEach((divSlide, numIndex) => 
            {
                console.log(`Sliding: ${100 * (numIndex - currentSlide)}`);
                console.log(divSlide)
                divSlide.style.transform = `translateX(${130 * (numIndex - 
                    currentSlide)}%)`;
            })
        };

        const slideRight = function(event)
        {
            console.log(`Sliding: ${currentSlide}`);
            currentSlide = currentSlide === arrSlides.length - 1 
                ? 0
                : currentSlide + 1;
            slideProjects();
        };

        const slideLeft = function(event)
        {
            console.log(`Sliding: ${currentSlide}`);

            currentSlide = currentSlide === 0
                ? arrSlides.length - 1
                : currentSlide - 1;
            slideProjects();
        };

        const handleKeyEvent = function(event)
        {
            console.log("Handling key");
            event.key === "ArrowRight" 
                ? slideRight(event)
                : event.key === "ArrowLeft" && slideLeft(event);
        };

        const updateDots = function(buttonDot)
        {
            console.log(buttonDot);
            parseInt(buttonDot.dataset.slide) !== currentSlide
                ? buttonDot.style.backgroundColor = "rgba(255, 255, 255, 0.733)"
                : buttonDot.style.backgroundColor = "#054A91";
                
        };

        const handleDotClick = function(event)
        {
            if (event.target.classList.contains("dot"))
            {
                currentSlide = parseInt(event.target.dataset.slide);
                slideProjects();
            }
        }

        const arrSlides = document.querySelectorAll(".project");
        arrSlides.forEach(createDots);
        slideProjects();

        document.addEventListener("keydown", handleKeyEvent);
        globalVariables.sliderDots.addEventListener("click", handleDotClick);
    };

    const implementContactTabs = function()
    {
        if (!globalVariables.contactsNav)
        {
            return null;
        }

        const handleTabChange = function(event)
        {
            const target = event.target?.closest(".contact-header");
            if (target)
            {
                [...target.parentElement.children].forEach(sibling => 
                    sibling.classList.remove("contact-header-active"));

                target.classList.add("contact-header-active");

                const numContact = parseInt(target.dataset.contact);
                
                const arrContacts =  
                    [...globalVariables.contactsContainer.children];

                arrContacts.forEach(hideAllContacts);

                arrContacts[numContact].classList.add("contact-active");
            }
            else 
            {
                return null;
            }
        }

        const hideAllContacts = function(divContact)
        {
            divContact.classList.remove("contact-active");
        }

        console.log("Implementing tabs.");
        
        globalVariables.contactsNav.addEventListener("click", handleTabChange);
    };

    await loadTemplateSections();

    mapGlobalVariables();

    implementHeaderEffects();

    implementProjectSliders();

    implementContactTabs();
}


// TODO LIST 

// 1. Decide font sizes and font weights for headers 
// 2. Implement sliders in projects page. 
// 3. Implement tabs in contact page. 
// 4. Implement media queries to alter header direction.
// 4. Implement media queries to alter main direction.