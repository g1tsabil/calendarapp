var monthNames = ["Jan","Feb","Mar","Apr","May","June",
"July","Aug","Sept","Oct","Nov","Dec"];

var yearByDate = [];

var monthByDate = [];

var events = [];

var slotId = 0;

var currDate = new Date();

var weekJump = 0;

//allocate slots to store dates and year
function allocateSlots()
{
    var count = 0;
    //variable to keep track of date slot offset
    var offset = 42;

    var doc = document.getElementById("dates");

    //allocate date slots
    while (count != 7)
    {
        var rec = document.createElement("div");;

        rec.setAttribute("style", "position:absolute;width:180px;height:120px;background-color:white;margin-left:" + offset +"px;margin-top:5px;text-align:center;");
        rec.setAttribute("id", "slot" + slotId);

        doc.appendChild(rec);
        
        count++;
        slotId++;
        offset = offset + 190;
    }

    //allocate present year slot
    var yr = document.createElement("div");

    yr.setAttribute("style", "position:absolute;width:650px;height:70px;margin-top:140px;margin-left:372px;border:3px;border-style:solid;border-radius:20px;text-align:center;background-color:#87CEEB");
    yr.setAttribute("id", "year");
    doc.appendChild(yr);
}

//allocate dates in their respective slots
function allocateDates()
{
    var d = new Date();
    var prevDate = new Date(d);
    var nextDate = new Date(d);

    var currDay = d.getDay();
    var date = d.getDate();

    //check difference of current day from 6
    var daysAway = 6 - currDay;
    var dayDiff = 6 - daysAway;

    weekJump = 0;
    
    for (var i = 0; i <= 6; i++)
    {
        var doc = document.getElementById("slot" + i);
        var para = document.createElement("p");
        para.setAttribute("style", "font-size:50px;margin-top:30px;");

        if (i < currDay)
        {
            prevDate.setDate(date-dayDiff);
            yearByDate.push(prevDate.getFullYear());
            monthByDate.push(monthNames[prevDate.getMonth()]);
            var detail = document.createTextNode(prevDate.getDate());
            dayDiff--;
            para.appendChild(detail);
            doc.appendChild(para);
        }
        else if (i > currDay)
        {
            nextDate.setDate(nextDate.getDate()+dayDiff);
            yearByDate.push(nextDate.getFullYear());
            monthByDate.push(monthNames[nextDate.getMonth()]);
            var detail = document.createTextNode(nextDate.getDate());
            para.appendChild(detail);
            doc.appendChild(para);
        }
        else
        {
            yearByDate.push(d.getFullYear());
            monthByDate.push(monthNames[d.getMonth()]);
            var detail = document.createTextNode(date);
            dayDiff++;
            para.appendChild(detail);
            doc.appendChild(para);
            doc.style.backgroundColor = "rgb(65, 237, 197, 0.811)";
        }
    }
}

function allocateYear()
{
    var yrBox = document.getElementById("year");
    var yrText = document.createElement("p");
    yrText.setAttribute("style", "font-size:60px;margin-top:2px;");
    if (monthByDate[0] == monthByDate[6])
    {
        var detail = document.createTextNode(monthByDate[0] + " " + yearByDate[0]);
        yrText.appendChild(detail);
        yrBox.appendChild(yrText);
    }
    else
    {
        var detail = document.createTextNode(monthByDate[0] + " " + yearByDate[0] + " - " + monthByDate[6] + " " + yearByDate[6]);
        yrText.appendChild(detail);
        yrBox.appendChild(yrText);
    }
}

function updateYear()
{
    var yrBox = document.getElementById("year");
    yrBox.removeChild(yrBox.firstChild);
    allocateYear();
}

function allocateButton()
{
    var doc = document.getElementById("dates");

    var nextBtn = document.createElement("button");
    nextBtn.setAttribute("onclick", "iterateNext();");
    nextBtn.setAttribute("style","position:absolute;background-color:#FFEBCD;color:black;padding:10px 28px;text-align:center;font-size:20px;cursor:pointer;font-weight:bold;margin-top:150px;margin-left:1195px;width:200px;");
    nextBtn.innerHTML = "NEXT";
    doc.appendChild(nextBtn);

    var previousBtn = document.createElement("button");
    previousBtn.setAttribute("onclick", "iteratePrevious();");
    previousBtn.setAttribute("style","position:absolute;background-color:#FFEBCD;color:black;padding:10px 28px;text-align:center;font-size:20px;cursor:pointer;font-weight:bold;margin-top:150px;margin-left:5px;width:200px;");
    previousBtn.innerHTML = "PREVIOUS";
    doc.appendChild(previousBtn);
}

function iterateNext()
{
    weekJump = weekJump + 7;
    iterate();
}

function iteratePrevious()
{
    weekJump = weekJump - 7;
    iterate();
}

function iterate()
{
    var d = new Date();
    yearByDate = [];
    monthByDate = [];
    d.setDate(d.getDate() + weekJump);
    var prevDate = new Date(d);
    var nextDate = new Date(d);

    var currDay = d.getDay();
    var date = d.getDate();

    //check difference of current day from 6
    var daysAway = 6 - currDay;
    var dayDiff = 6 - daysAway;
    
    var count = 0;

    while (count != 7)
    {
        doc = document.getElementById("slot" + count);
        doc.removeChild(doc.firstChild);
        count++;
    }
    
    if (weekJump != 0)
    {
        for (var i = 0; i <= 6; i++)
        {
            var doc = document.getElementById("slot" + i);
            var para = document.createElement("p");
            para.setAttribute("style", "font-size:50px;margin-top:30px;");
    
            if (i < currDay)
            {
                prevDate.setDate(date-dayDiff);
                yearByDate.push(prevDate.getFullYear());
                monthByDate.push(monthNames[prevDate.getMonth()]);
                var detail = document.createTextNode(prevDate.getDate());
                dayDiff--;
                para.appendChild(detail);
                doc.appendChild(para);
            }
            else if (i > currDay)
            {
                nextDate.setDate(nextDate.getDate()+dayDiff);
                yearByDate.push(nextDate.getFullYear());
                monthByDate.push(monthNames[nextDate.getMonth()]);
                var detail = document.createTextNode(nextDate.getDate());
                para.appendChild(detail);
                doc.appendChild(para);
            }
            else
            {
                yearByDate.push(d.getFullYear());
                monthByDate.push(monthNames[d.getMonth()]);
                var detail = document.createTextNode(date);
                dayDiff++;
                para.appendChild(detail);
                doc.appendChild(para);
                doc.style.backgroundColor = "white";
            }
        }
    }
    else
    {
        allocateDates();
    }
    updateYear();
}

function addEvent()
{
    var remTimeDate = document.getElementById("dateTimeReminder").value + ":00";
    var currD = new Date();

    var offsetHour = document.getElementById("offset").value;
    var offSetHourMS = parseInt(offsetHour * 60 * 60 * 1000);

    var offsetMin = document.getElementById("offset2").value;
    var offSetMinMS = parseInt(offsetMin * 60 * 1000);

    var newDate = new Date(remTimeDate);
    var remNote = document.getElementById("noteReminder").value;

    //get date in milliseconds
    var currMS = currD.getTime();
    var newMS = newDate.getTime();

    if (remTimeDate == "" || remNote == "" || offsetHour == "" || offsetMin == "")
    {
        alert("Please fill in all the fields correctly!");
    }
    else
    {
        if (newMS < currMS)
        {
            alert("Please enter a date and time later than current time!");
        }
        else
        {
            var remMessage;
            var reminderTimer = newMS - offSetHourMS - offSetMinMS - currMS;
            remMessage = setTimeout(function(){alertMessage(remNote)},reminderTimer);
            var lst = document.getElementById("reminderList");
            var elm = document.createElement("ul");
            elm.setAttribute("style","font-weight:bold;font-size:25px;margin-left:-50px;");
            elm.innerHTML = monthNames[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear() + " | " + newDate.getHours() + ":" + newDate.getMinutes() + " | " + remNote;
            lst.appendChild(elm);
        }
    }

}

function clear()
{
    var remTimeDate = document.getElementById("dateTimeReminder");
    var offsetHr = document.getElementById("offset");
    var offsetMn = document.getElementById("offset2");
    var remNote = document.getElementById("noteReminder");

    remTimeDate.value = null;
    offsetHr.value = "";
    offsetMn.value = "";
    remNote.value = "";
}

function alertMessage(note)
{
    alert("Reminder for: " + note);
}