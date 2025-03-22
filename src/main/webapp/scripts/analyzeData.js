function analyzeData() {
    try {
      canvas.remove();
    } catch {}
    
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
  
    const dataSupplier = new Supplier(
      results,
      filter1,
      filter2,
      filter3,
      filter4,
      filter5,
      540,
      300
    );  
  
    new Boxplot(dataSupplier);
    //const hist = new Histogram(q);
    //const cumm = new Cummulative(q);
  }

  export {analyzeData}