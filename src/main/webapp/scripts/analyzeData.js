function analyzeData() {
    try {
      canvas.remove();
    } catch {}
  
    //const myTarget = document.getElementById("charts");
    //myTarget.innerHTML ='<canvas id="histogram"></canvas>'
  
    //  const myMarget = document.getElementById("charts");
    //  myMarget.innerHTML =
    //    '<canvas id="cummulative" width= 100% height ="480"></canvas>'
  
    //const cHeight = document.getElementById("histogram");
    //const cH = cHeight.height;
    //const cWidth = document.getElementById("histogram");
    //const cW = cWidth.width;
  
    var filter1 = document.getElementById("response").value;
  
    var f = document.getElementById("year");
    const filter2 = new Set();
    let i; 
    for (i of f) {
      if (i.selected === true) {
        filter2.add(i.value);
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
  
    var k = document.getElementById("dayOfYear");
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
      540,
      300
    );  
    const box = new Boxplot(q);
    //const hist = new Histogram(q);
    //const cumm = new Cummulative(q);
  }

  export {analyzeData}