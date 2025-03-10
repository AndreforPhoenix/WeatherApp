import { updateProgressBar } from "./Update.js";

export async function getMonth(month) {
  const file = './config/monthConfig.txt';
  const response = await fetch(file)
  .then((data) => data.json());
  
  var select4 = document.getElementById(month);
  
  for (const element of response) {

    var option4 = document.createElement("OPTION");
    option4.text = element
    option4.value = element;

    select4.appendChild(option4);
}
  var cur = document.getElementById("progress").value;
  updateProgressBar(cur + 20);
  
}