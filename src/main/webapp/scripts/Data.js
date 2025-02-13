import { updateProgressBar } from "./Update.js";

var results = [];
export { results }

export async function getData() {
   
     results = await fetch("http://localhost:8080/data", {
      mode: "cors",
      cache: "reload",
    }).then((data) => data.json());
  
    for (const result of results) {
      console.log(result);
    }
  
    var cur = document.getElementById("progress").value;
    updateProgressBar(cur + 20);
  
    document.getElementById("container").style.visibility = "visible";
    document.getElementById("outer").style.visibility = "hidden";
  }

  