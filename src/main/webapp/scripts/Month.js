import { updateProgressBar } from "./Update.js";

export function getMonth(month) {
 
  const months = '["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"]'
  const myArray = JSON.parse(months);

  var select4 = document.getElementById(month);
  
  for (const y of myArray) {

    var option4 = document.createElement("OPTION");
    option4.text = y
    option4.value = y;

    select4.appendChild(option4);
}
  var cur = document.getElementById("progress").value;
  updateProgressBar(cur + 20);
  
}