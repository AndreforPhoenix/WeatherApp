import { updateProgressBar } from "./Update.js";
import { getResponseName } from "./ResponseName.js";

export async function getResponse(response) {
    const r = await fetch("https://azmetapp-cdfqh3f3azapewbf.canadacentral-01.azurewebsites.net/response", {
        mode: "cors",
        cache: "no-cache",
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          "Cache-control": "no-cache",
      },
    }).then((data) => data.json());
  
    console.log("Get response promise resolved...");
  
    var select1 = document.getElementById(response);
  
    const resp = new Set();

    for (const s of r) {
      console.log("Creating response options...");
      resp.add(s);

    }
      const iter = resp.keys();

      for (const it of iter){

        var option1 = document.createElement("OPTION");
        option1.text = getResponseName(it);
        option1.value = option1.text;

        if (!(option1.text === "")) {
        select1.appendChild(option1);
        } else {}
      }
    
    
    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
  }
  