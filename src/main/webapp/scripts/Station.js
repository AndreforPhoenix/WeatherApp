import { updateProgressBar } from "./Update.js";
import { getStationName} from "./StationName.js";

export async function getStation(station) {
    const a = await fetch("https://azmetapp-cdfqh3f3azapewbf.canadacentral-01.azurewebsites.net/station", {
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        "Cache-control": "no-cache",
    },
    }).then((data) => data.json());
  
    console.log("Get station promise resolved...");
  
    var select3 = document.getElementById(station);

    const sta = new Set();
    const mp = new Map();
  
    for (const b of a) {
      console.log("Creating station options...");
      mp.set(getStationName(b),b);
    }

    const arr = mp.keys();

    for (const ar of arr){
    var option3 = document.createElement("OPTION");

    if (!(ar === "")) {
      option3.text = ar;
      option3.value = mp.get(ar);
    select3.appendChild(option3);
    } else {}
    }

 

  
    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
  }