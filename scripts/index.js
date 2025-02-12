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
   
      const filter5 = document.getElementById("by").value;

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
  sample.src = "/firstspringbootapi/images/sample.png";

  document.getElementById("charts").appendChild(sample);

  updateProgressBar(0);

  setTimeout(() => {
    getMonth("month");
  }, 0);

  setTimeout(() => {
    getStation("station");
  }, 5000);

  setTimeout(() => {
    getYear("year");
  }, 10000);

  setTimeout(() => {
    getResponse("response");
  }, 15000);

  setTimeout(() => {
    getData();
  }, 20000);
};

async function getData() {
  results = await fetch("http://localhost:8080/data", {
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then((data) => data.json());

  for (const result of results) {
    console.log(result);
  }

  var cur = document.getElementById("progress").value;
  updateProgressBar(cur + 20);

  document.getElementById("container").style.visibility = "visible";
  document.getElementById("outer").style.visibility = "hidden";
}
