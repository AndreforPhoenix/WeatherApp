import { updateProgressBar } from "./Update.js";
import { getMonthName } from "./MonthName.js";

export async function getMonth(month) {
  const z = await fetch("https://azmetapp-cdfqh3f3azapewbf.canadacentral-01.azurewebsites.net/month", {
    mode: "cors",
    cache: "no-cache",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "Cache-control": "no-cache",
  },
  }).then((data) => data.json());

  console.log("Get month promise resolved...");

  var select4 = document.getElementById(month);

  const cal = new Set();

  for (const y of z) {
    console.log("Creating month options...");
    cal.add(y);
  }

  const iter = cal.keys();

  for (const it of iter){

    var option4 = document.createElement("OPTION");
    option4.text = getMonthName(it);
    option4.value = option4.text;

    if (!(option4.text === "")) {
      select4.appendChild(option4);
      } else {}
  }


  var cur = document.getElementById("progress").value;
  updateProgressBar(cur + 20);
}
