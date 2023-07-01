"use strict";

document.addEventListener("DOMContentLoaded", mainFunction);
const globalObject = new Map();

async function mainFunction()
{
    globalObject.set("strStudentsURL", "./students_2023.json");
    globalObject.set("listStudents", document.getElementById("listStudents"));

    const convertTextToJSON = (strResponse) => strResponse.json();
        
    const loadContent = function(jsonStudents)
    {
        for (const objStudent of jsonStudents)
        {
            let strStudentHTML = `<li> ${objStudent.firstName} `
                + `${objStudent.lastName} </li>`;
            globalObject.get("listStudents")
                .insertAdjacentHTML('beforeend', strStudentHTML);
        }
    };

    function catchError(error)
    {
        Console.log(`An error has occured:\n${error.message}`);
    }

    function loadStudentsFetch()
    {
        fetch(globalObject.get("strStudentsURL"))
            .then(convertTextToJSON)
            .then(loadContent)
            .catch(catchError);
    }

    async function loadStudentsAsync()
    {
        try 
        {
            const strStudents = await fetch(globalObject.get("strStudentsURL"));
            const jsonStudents = await convertTextToJSON(strStudents);
            loadContent(jsonStudents);
        }
        catch (error)
        {
            catchError(error);
        }
    }

    async function loadStudentsJSONP()
    {
        const script = document.createElement("script");
        script.src = "scripts/jsonp.js";
        script.type = "text/javascript";

        document.body.appendChild(script);
    }

    // loadStudentsFetch();
    // loadStudentsAsync();

    loadStudentsJSONP();


}