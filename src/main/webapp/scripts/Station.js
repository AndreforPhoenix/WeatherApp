import { updateProgressBar } from "./Update.js";

export async function getStation(station) {  
 const file = './config/stationConfig.txt';
 const response = await fetch(file)
 .then((data) => data.json());

 var select3 = document.getElementById(station);

 for (let [key,values] of Object.entries(response)){
  var option3 = document.createElement("OPTION");
  option3.text = values;
  option3.value = key;
  select3.appendChild(option3);
 }
    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
 }