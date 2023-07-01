document.addEventListener("DOMContentLoaded", initializePage);

const globalObject = new Map();

class TestClass
{
    static field3 = "This is a static field";
    #field1;
    _field2;

    constructor(field1, field2)
    {
        this.Field1 = field1;
        this.Field2 = field2;
    }

    get Field1()
    {
        return this.#field1;
    }
    set Field1(field1)
    {
        this.#field1 = field1;
    }

    get Field2()
    {
        return this._field2;
    }
    set Field2(value)
    {
        this._field2 = value;
    }

    toString()
    {
        return `Field One: ${this.Field1} Field: Two: ${this.Field2} Field Three: ${TestClass.field3}`;
    }
}

const testClass = new TestClass("Field One", "Field Two");
console.log(testClass.toString());


function initializePage()
{
    const body = document.querySelector("body");
    const table = document.querySelector("table");
    const url = "students_2023.json";
    const radioButtons = [...document.querySelectorAll("input[type=radio]")];
    const radioDiv = document.querySelector(".radioDiv");

    const loadedButtons = JSON.parse(localStorage.getItem("radioButtons"));

    loadedButtons 
        ? radioButtons[0].checked = true
        : radioButtons[1].checked = true;

    console.log(loadedButtons);

    main();
}

async function main()
{
    const body = document.querySelector("body");
    const table = document.querySelector("table");
    const url = "students_2023.json";
    const radioButtons = [...document.querySelectorAll("input[type=radio]")];
    const radioDiv = document.querySelector(".radioDiv");

    let addStudentsToTable = function(arrStudents)
    {
        function addStudentToTable(objStudent, numIndex)
        {
            const rowStudent = document.createElement("tr");
            const columnNumber = document.createElement("td");
            const columnStudent = document.createElement("td");

            columnNumber.textContent = numIndex;
            columnStudent.textContent = radioButtons[0].checked 
                ? objStudent.firstName
                : objStudent.lastName;
            rowStudent.insertAdjacentElement("beforeend", columnNumber);
            rowStudent.insertAdjacentElement("beforeend", columnStudent);

            globalObject.set("students", arrStudents);
            table.insertAdjacentElement("beforeend", rowStudent);
        }
        arrStudents.forEach(addStudentToTable);
        console.dir(table);
    }

    let clearTable = () => 
    {
        const arrRows = table.querySelectorAll("tr:not(.header)");
        for (row of arrRows)
        {
            row.remove();
        }
    }
    function handleRadioButtonChange(event)
    {
        console.log(event.target);
        clearTable();
        addStudentsToTable(globalObject.get("students"));

        localStorage.setItem("radioButtons", radioButtons[0].checked);
    }

    const addEventListeners = () => 
    {
        radioDiv.addEventListener("change", handleRadioButtonChange);
        console.dir(radioDiv);
        console.log(radioButtons);
    };

    function getJSONResponse(url)
    {
        function getPromise(resolve, reject)
        {
            let httpQuest = new XMLHttpRequest();
            console.log(url);
            httpQuest.open("GET", url, true);
            //httpQuest.responseType = "json";
            httpQuest.send();

            function getJSON()
            {
                if (httpQuest.status == 200)
                {
                    resolve(httpQuest.response);
                }
                else 
                {
                    reject(`Error: ${httpQuest.status}`);
                }
            }

            httpQuest.addEventListener("load", getJSON);
            httpQuest.addEventListener("error", () => reject("Error!"));
        } 

        const promiseJSON = new Promise(getPromise);
        return promiseJSON;
    }

    getJSONResponse(url)
        .then((response) => JSON.parse(response))
        .then(addStudentsToTable)
        .catch((error) => console.error(error.message))
        .finally(() => addEventListeners());

    // fetch(url)
    //     .then((response) => response.json())
    //     .then(addStudentsToTable)
    //     .catch((error) => console.log(error.message))
    //     .finally(function(){ console.log("All done!") });

    // const getResponseJSON = function(response)
    // {
    //     return response.json();
    // }

//     let response = await fetch(url);
//     response = await getResponseJSON(response);
//     addStudentsToTable(response);
//     console.log("All done!");
}
