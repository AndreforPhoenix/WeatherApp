import { updateProgressBar } from "./Update.js";

export function getResponse(response) {
  
    const responseOption = '["atmaxDegF","atminDegF","atmeanDegF","preciptotal"]';
    const respArray = JSON.parse(responseOption);

    var select1 = document.getElementById(response);
  
    for (const resp of respArray) {
  
        var option1 = document.createElement("OPTION");
        option1.text = resp;
        option1.value = resp;

        select1.appendChild(option1);
   
      }
    
    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
  }
  