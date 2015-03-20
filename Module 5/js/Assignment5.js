function Menuchoice()
{
    if (document.getElementById("menu").value == "Display Customer List")
    
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Get Customer Order History")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Orders Placed by a Customer")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    
}

// SECTION ONE

function GetCustList()
{
    var objRequest = new XMLHttpRequest();  //Create AJAX request object
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    //url += document.getElementById("custid").value;
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
            //Initiate the server request
            objRequest.open("GET", url, true);
            objRequest.send();
}
function GenerateOutput(result)
{   var count = 0;
    var displaytext = "";
    displaytext += "<table>";
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        
        displaytext += "<tr>";
            displaytext += "<td>" + result.GetAllCustomersResult[count].CustomerID + "</td>";
            displaytext += "<td>" + result.GetAllCustomersResult[count].CompanyName + "</td>";
            displaytext += "<td>" + result.GetAllCustomersResult[count].City + "</td>";
        displaytext += "</tr>";
    }
    displaytext += "</table>";
    document.getElementById("custlistdisplay").innerHTML = displaytext;
}

// SECTION TWO


function GetOrderHistory()
{
    var objRequest = new XMLHttpRequest();  //Create AJAX request object
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custid").value;
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput_2(output);
        }
    }
            //Initiate the server request
            objRequest.open("GET", url, true);
            objRequest.send();
}
function GenerateOutput_2(result)
{
    var count = 0;
    var displaytext = "";
    displaytext += "<table>";
    //Loop to extract data from the response object
    for (count = 0; count < result.getCustomerOrderHistory.length; count++)
    {
        
        displaytext += "<tr>";
            displaytext += "<td>" + result.getCustomerOrderHistory[count].ProductName + "</td>";
            displaytext += "<td>" + result.getCustomerOrderHistory[count].Total + "</td>";
        displaytext += "</tr>";
    }
    displaytext += "</table>";
    document.getElementById("orderhistorydisplay").innerHTML = displaytext;
}