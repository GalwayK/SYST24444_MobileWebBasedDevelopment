"use strict";

document.addEventListener("DOMContentLoaded", main);

const go = new Map();

function main()
{
    function addElementsToGlobalObject()
    {
        go.set("table", document.querySelector("table"));
        go.set("tableHeader", document.querySelector(".tableHeader"));
        go.set("select", document.querySelector(".select-province"));
        go.set("num", document.querySelector(".numInstitutions"));
        console.log(go.get("select").value);
    }

    let addDataToPage = (dataJSON) =>
    {
        function filterProvinces(dataCollege)
        {
            return dataCollege?.Address.ProvState == go.get("select").value;
        }

        function addDataToTable(dataCollege)
        {
            let tableRow =  document.createElement("tr");
            let collegeName = document.createElement("td");
            let collegeURL = document.createElement("td");
            let collegeProv = document.createElement("td");
            let collegeCountry = document.createElement("td");

            collegeName.textContent = dataCollege.Name;
            collegeURL.textContent = dataCollege.URL;
            collegeProv.textContent = dataCollege?.Address.ProvState;
            collegeCountry.textContent = dataCollege?.Address.Country;

            tableRow.insertAdjacentElement("afterBegin", collegeName);
            tableRow.insertAdjacentElement("afterBegin", collegeProv);
            tableRow.insertAdjacentElement("afterBegin", collegeURL);
            tableRow.insertAdjacentElement("afterBegin", collegeCountry);

            go.get("tableHeader").insertAdjacentElement("afterend", tableRow);
        }

        function countLength(dataJSON)
        {
            let setJSON = new Set(dataJSON);
            return setJSON.size;
        }

        console.log(dataJSON);
        let filteredData = go.get("select").value == "All" 
            ? dataJSON
            : dataJSON.filter(filterProvinces);
        

        console.log(filteredData);

        filteredData.forEach(addDataToTable);

        go.get("num").textContent = countLength(dataJSON);

        return Promise.resolve(dataJSON);
    }

    function clearTable()
    {
        const collegeRows = go.get("table").querySelectorAll("tr:NOT(.tableHeader)");
        
        for (const row of collegeRows)
        {
            row.remove();
        }
        
        console.log(collegeRows);
    }

    function changeProvince()
    {
        clearTable();
        addDataToPage(go.get("data"));
    }

    let addEventToSelect = (dataJSON) =>
    {
        go.set("data", dataJSON);
        go.get("select").addEventListener("change", changeProvince);
    }

    addElementsToGlobalObject();

    let url = "institutions.json";
    fetch(url)
        .then((response) => response.json())
        .then(addDataToPage)
        .then(addEventToSelect);
}