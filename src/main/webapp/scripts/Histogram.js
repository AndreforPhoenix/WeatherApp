class Histogram {
    constructor(q) {
      this.cH = q.cH;
      this.cW = q.cW;
      this.dArray = q.dpColReduced;
      this.cId = q.canvasId1;
      this.binCount = q.hisBarCount;
      this.f1 = q.fResponse;
  
      //    const myTarget2 = document.getElementById("row2");
      //    myTarget2.innerHTML =
      //      '<canvas id="boxplot" width="280" height="210"></canvas><canvas id="linechart" width="280" height="210"></canvas>';
  
      // const canvas = document.getElementById(this.cId);
      // const paint = canvas.getContext("2d");
      // paint.fillStyle = "yellow";
  
      const canvas = document.createElement("canvas");
      canvas.id = "histogram";
      canvas.width = this.cW;
      canvas.height = this.cH;
      document.getElementById("charts").appendChild(canvas);
  
      const paint = canvas.getContext("2d");
      paint.fillStyle = "yellow";
  
      const scW = 0.7;
      const scH = 0.7;
      const frameW = this.cW * scW;
      const frameH = this.cH * scH;
      const barW = frameW / this.binCount;
      const fWOffset = (this.cW * (1 - scW)) / 2;
      const fHOffset = (this.cH * (1 - scH)) / 2;
      var sum = 0;
      const locArray = [];
      const bins = [];
      const freqArray = [];
      const binsMid = [];
  
      //Manipulate data based on filter selection
      for (let i = 0; i < this.dArray.length; i++) {
        locArray.push(this.dArray[i][this.f1]);
      }
  
      const max = Math.max(...locArray);
      const min = Math.min(...locArray);
      const range = max - min;
      const binSize = range / this.binCount;
      let start = 0;
  
      //Create data bins for sorting response variable
      for (let i = 0; i < this.binCount; i++) {
        start = min;
  
        bins.push([
          (start + i * binSize).toFixed(0),
          (start + (i + 1) * binSize).toFixed(0),
        ]);
  
        binsMid.push(
          (
            (Number(start + i * binSize) + Number(start + (i + 1) * binSize)) /
            2
          ).toFixed(2)
        );
      }
      paint.fillStyle = "yellow";
  
      //Sort response variable into bins needed for histogram
      for (let i = 0; i < bins.length; i++) {
        let freq = 0;
  
        for (let j = 0; j < locArray.length; j++) {
          if (locArray[j] >= bins[i][0] && locArray[j] < bins[i][1]) {
            freq += 1;
          } else {
          }
        }
        freqArray.push(freq);
      }
  
      paint.translate(0, frameH);
  
      //Scale factor for histogram bars
      let sFactor = frameH / Math.max(...freqArray);
  
      //Draw histogram bar
      for (let i = 0; i < freqArray.length; i++) {
        paint.fillRect(
          fWOffset + i * barW,
          fHOffset,
          barW,
          -freqArray[i] * sFactor
        );
  
        paint.strokeRect(
          fWOffset + i * barW,
          fHOffset,
          barW,
          -freqArray[i] * sFactor
        );
      }
  
      paint.rect(fWOffset, fHOffset, frameW, -frameH);
      paint.stroke();
  
      paint.fillStyle = "black";
  
      paint.beginPath();
      for (let i = 0; i < binsMid.length; i++) {
        //Draw x-labels
        paint.font = "15px sans serif";
        paint.fillText(
          binsMid[i],
          fWOffset + (i * barW + barW / 4),
          fHOffset + 30,
          this.cW
        );
        paint.moveTo(fWOffset + (i * barW + barW / 2), fHOffset);
        paint.lineTo(fWOffset + (i * barW + barW / 2), fHOffset + 5);
      }
  
      paint.closePath();
      paint.stroke();
  
      //Draw y-axis
      paint.beginPath();
      const mm = Math.max(...freqArray);
  
      for (let i = 0; i < 11; i++) {
        paint.moveTo(fWOffset, fHOffset - i * (frameH / 10));
        paint.lineTo(fWOffset - 5, fHOffset - i * (frameH / 10));
        paint.fillText(
          (i * (mm / 10)).toFixed(0),
          fWOffset - 30,
          fHOffset - i * (frameH / 10),
          20
        );
      }
      paint.closePath();
      paint.stroke();
  
      paint.font = "18px sans serif";
  
      //Draw chart title
      paint.fillText(
        "   " + this.cId + " for " + this.f1 + " (freq) ",
        fWOffset + 80,
        -frameH + fHOffset - 20,
        frameW
      );
    }
  }

  export {Histogram}
  