/* Author: Andre Williams
Begin Date: 8/3/2024 7a
*/

//import fetch from "./node-fetch";
//import { Cummulative } from "./Cummulative.js";
//import { Histogram } from "./Histogram.js";
import { Boxplot } from "./Boxplot.js";
import { Supplier } from "./Supplier.js";
import { getYear } from "./Year.js";
import { getStation } from "./Station.js";
import { getMonth } from "./Month.js";
//import { getData } from "./Data.js";
import { updateProgressBar } from "./Update.js";
import { getResponse } from "./Response.js";

var results = [];

document
  .getElementById("getFileName")
  .addEventListener("click", function analyzeData() {
    try {
      console.log("Trying to remove sample chart,");
      document.getElementById("charts").removeChild(sample);
    } catch {}

    var filter1 = document.getElementById("response").value;

    var f = document.getElementById("year");
    const filter2 = new Set();

      let i;
      for (i of f) {
        if (i.selected === true) {
          filter2.add(i.value);
          continue;
        } else {
        }
      }
  
    var h = document.getElementById("station");
    const filter3 = new Set();

    
      let g;
      for (g of h) {
        if (g.selected === true) {
          filter3.add(g.value);
          continue;
        } else {
        } 
      }

    var k = document.getElementById("month");
    const filter4 = new Set();
    let j;
   
      for (j of k) {
        if (j.selected === true) {
          filter4.add(j.value);
          continue;
        } else {
        }
      }
   
      const filter5 = document.getElementById("byCategory").value;

    const q = new Supplier(
      results,
      filter1,
      filter2,
      filter3,
      filter4,
      filter5,
      1000,
      300
    );

    new Boxplot(q);

    //const hist = new Histogram(q);
    //const cumm = new Cummulative(q);
  });


window.onload = function initform() {
  document.getElementById("container").style.visibility = "hidden";

  const sample = document.createElement("img");
  sample.width = 1000;
  sample.height = 500;
  sample.className = "sample";
  sample.alt = "This is a sample image.";
  sample.id = "sample";
  sample.src = "./images/sample.png";

  document.getElementById("charts").appendChild(sample);

  updateProgressBar(0);

  getMonth("month");
  getResponse("response");

  setTimeout(() => {
    getStation("station");
  }, 2000);

  setTimeout(() => {
    getYear("year");
  }, 4000);

  setTimeout(() => {
    getData();
  }, 6000);
};

function removeChart() {
  console.log("Remove attempted");
  }

async function getData() {
  results = await fetch("https://azmetapp-cdfqh3f3azapewbf.canadacentral-01.azurewebsites.net/data", {
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }).then((data) => data.json());

  var cur = document.getElementById("progress").value;
  updateProgressBar(cur + 20);

  document.getElementById("container").style.visibility = "visible";
  document.getElementById("outer").style.visibility = "hidden";
}
