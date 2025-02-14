import { updateProgressBar } from "./Update.js";

export async function getYear(year) {
    const t = await fetch("https://azmetapp-cdfqh3f3azapewbf.canadacentral-01.azurewebsites.net/year", {
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    }).then((data) => data.json());
  
    console.log("Get year promise resolved...");
  
    var select2 = document.getElementById(year);
  
    const yr = new Set();

    for (const u of t) {
  
      console.log("Creating year options...");
      yr.add(u);
    
    }

    const itr = yr.keys();

    for (const it of itr){

      var option2 = document.createElement("OPTION");
      option2.text = it;
      option2.value = it;
      if (option2.value > 2000) {
        select2.appendChild(option2);
        } else {}

    }

    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
  }
  