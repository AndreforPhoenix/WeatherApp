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
import { LineChart } from "./LineChart.js";

var results = [];

document
  .getElementById("getFileName")
  .addEventListener("click", function analyzeData() {
    try {
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
      300,
      0.7,
      0.7
    );

  
    const boxP = new Boxplot(q);
    const d = boxP.getGraph1();
    const y = boxP.getGraph2();

    const maxLine = new LineChart(q,"Max");
    const max = maxLine.getGraph();

    const q3Line = new LineChart(q,"Q3");
    const q3 = q3Line.getGraph();

    const medLine = new LineChart(q,"Median");
    const media = medLine.getGraph();

    const q1Line = new LineChart(q,"Q1");
    const q1 = q1Line.getGraph();

    const minLine = new LineChart(q,"Min");
    const min = minLine.getGraph();

      const box = document.createElement("div");
      box.id = "box";

      const boxAll = document.createElement("div");
      boxAll.id = "boxAll";

      const boxside = document.createElement("div");
      boxside.id = "boxside";

      const z = document.createElement("button");
      z.id = "z";
      z.className = "z";
      z.addEventListener("click", function removeChart() {
        document.getElementById("charts").removeChild(boxAll);
      });
      z.type = "button";
      z.textContent = "Remove";

      document.getElementById("charts").appendChild(boxAll);
      box.append(d);
      box.append(y);
      box.append(max);
      box.append(q3);
      box.append(media);
      box.append(q1);
      box.append(min);
    
      boxAll.append(box);
      boxAll.append(boxside);
      boxside.append(z);

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
  getStation("station");
  getYear("year");
  getData();
 
};


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
