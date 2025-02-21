/* Class to build Boxplot */

import { SummaryStats } from "./SummaryStats.js";
import { getStationName } from "./StationName.js";

class Boxplot {
  cH; cW; scW; scH; selYears; selMonth; selStation; byCat; frameW;
  frameH; fWOffset;fHOffset; cId; dArr; f1; by; gMax; gMin;gMedian;

  constructor(q) {
    this.cH = q.cH;
    this.cW = q.cW;
    this.scW = 0.7;
    this.scH = 0.7;
    this.selYears = [...q.yearsSet];
    this.selMonths = [...q.monthSet];
    this.selStation = [...q.stationSet];
    this.byCat = this.setByCat(q.fbyCat);
    this.frameW = this.setframeW(this.cW, this.scW);
    this.frameH = this.setframeH(this.cH, this.scH);
    this.fWOffset = this.setfWOffset(this.cW, this.scW);
    this.fHOffset = this.setfHOffset(this.cH, this.scH);
    this.cId = q.canvasId3;
    this.dArr = this.setArray(q.dpColReduced);
    this.f1 = q.fResponse;
    this.by = this.setBy(q.fbyCat);
    this.gMax = this.setGlobalMax([3, 1]);
    this.gMin = this.setGlobalMin([3, 1]);

        //Create canvas object
        const canvas = document.createElement("canvas");
        canvas.id = this.cId;
        canvas.width = this.cW;
        canvas.height = this.cH;
    
        //Create canvas object
        const canvas2 = document.createElement("canvas");
        canvas2.id = "Summary";
        canvas2.width = this.cW;
        canvas2.height = 125;
    
        const paint = canvas.getContext("2d");
        const paint2 = canvas2.getContext("2d");
    
        paint.translate(0, this.frameH);
        paint2.translate(0, this.frameH);
    
        //Draw picture frame
        paint.rect(this.fWOffset, this.fHOffset, this.frameW, -this.frameH);
        paint.lineWidth = 1;
        paint.stroke();
    
        paint2.rect(this.fWOffset, -100, this.frameW, -100);
        paint2.lineWidth = 1;
        paint2.stroke();
    
        paint.font = "20px serif";
        paint.fillStyle = "black";
        paint2.font = "11px serif";
        paint2.textAlign = "center";
    
        //Draw chart title
        paint.fillText(
          "   " + this.cId + " for " + this.f1 + " by " + this.by,
          this.frameW/2,
          -this.frameH + this.fHOffset - 20,
          this.frameW
        );
    
        //Filter selection labels
          paint.fillText("Month: " + this.selMonths, this.fWOffset + 10, this.fHOffset - 40)
          paint.fillText("Station: " + this.selStation, this.fWOffset + 10, this.fHOffset - 20)
    
        //Summary label
        paint2.fillText("N:", this.fWOffset - 40, -185, this.frameW);
        paint2.fillText("Max:", this.fWOffset - 40, -170, this.frameW);
        paint2.fillText("Q3:", this.fWOffset - 40, -155, this.frameW);
        paint2.fillText("Median:", this.fWOffset - 40, -140, this.frameW);
        paint2.fillText("Q1:", this.fWOffset - 40, -125, this.frameW);
        paint2.fillText("Min:", this.fWOffset - 40, -110, this.frameW);
    
        try {
        for (let j = 0; j < this.byCat.length; j++) {
          if (q.fbyCat === "0") {
            var scr = "a.year";
          } else if (q.fbyCat === "1") {
            var scr = "a.month";
          } else {
            var scr = "a.station";
          }
    
          var tempA = this.dArr;
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][this.f1].toFixed(1)));
          }
    
          this.setGlobalMedian(respA);
          this.setGlobalMax(respA);
          this.setGlobalMin(respA);

          var temp = this.dArr.filter((a) => eval(scr) == this.byCat[j]);
          var resp = [];
          
          for (let i = 0; i < temp.length; i++) {
            resp.push(Number(temp[i][this.f1].toFixed(1)));
          }

        
          var N = temp.length;
    
          const fiveN = new SummaryStats(resp);
            var max = fiveN.getMax();
            var p75 = fiveN.get75thP();
            var med = fiveN.getMedian();
            var p25 = fiveN.get25thP();
            var min = fiveN.getMin();
      
          paint2.fillText(
            N.toFixed(0),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -185,
            this.frameW
          );
          paint2.fillText(
            max.toFixed(1),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -170,
            this.frameW
          );
          paint2.fillText(
            p75.toFixed(1),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -155,
            this.frameW
          );
          paint2.fillText(
            med.toFixed(1),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -140,
            this.frameW
          );
          paint2.fillText(
            p25.toFixed(1),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -125,
            this.frameW
          );
          paint2.fillText(
            min.toFixed(1),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            -110,
            this.frameW
          );
    
          var scale = 2.5;
           // (this.gmax * (this.frameH / this.gmax) -
            //  this.gmin * (this.frameH / this.gmax)) /
            //this.gmax;

          var hOffset = this.gMedian - (this.frameH/2.5);            
          console.log(this.gMedian, this.frameH, this.frameH/2, hOffset);
    
          //plot points
          for (let i = 0; i < temp.length; i++) {
            paint.beginPath();
            paint.lineWidth = 0.75;
            paint.strokeStyle = "red";
            paint.arc(
              this.fWOffset +
                (j + 1) * (this.frameW / (this.byCat.length + 1)) +
                Math.random() * ((-1) ** i * 10),
              (this.fHOffset*scale) - (temp[i][this.f1] * scale) + hOffset,
              1.5,
              0,
              3 * Math.PI
            );
    
            paint.stroke();
            paint.closePath();
          }
    
          //plot interquartile range (IQR)
          paint.beginPath();
          paint.lineWidth = 1.5;
          paint.strokeStyle = "black";
          paint.globalAlpha = 0.5;
          paint.fillStyle = "yellow";
          paint.fillRect(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 15,
            (this.fHOffset*scale) - (p25 * scale) + hOffset,
            30,
            -(p75 - p25) * scale
          );
          paint.rect(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 15,
            (this.fHOffset*scale) - (p25 * scale) + hOffset,
            30,
            -(p75 - p25) * scale
          );
          paint.stroke();
          paint.closePath();
    
          //Draw median
          paint.beginPath();
          paint.moveTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 15,
            (this.fHOffset*scale) - (med * scale) + hOffset
          );
          paint.lineTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) + 15,
            (this.fHOffset*scale) - (med * scale) + hOffset
          );
          paint.stroke();
          paint.closePath();
    
          //Draw whiskers
          paint.beginPath();
          paint.moveTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            (this.fHOffset*scale) - (min * scale) + hOffset
          );
          paint.lineTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            (this.fHOffset*scale) - (p25 * scale) + hOffset
          );
          paint.stroke();
          paint.closePath();
    
          paint.beginPath();
          paint.moveTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            (this.fHOffset*scale) - (max * scale) + hOffset
          );
          paint.lineTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)),
            (this.fHOffset*scale) - (p75 * scale) + hOffset
          );
          paint.stroke();
          paint.closePath();
    
          paint.beginPath();
          paint.moveTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 10,
            (this.fHOffset*scale) - (min * scale) + hOffset
          );
          paint.lineTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) + 10,
            (this.fHOffset*scale) - (min * scale) + hOffset
          );
          paint.stroke();
          paint.closePath();
    
          paint.beginPath();
          paint.moveTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 10,
            (this.fHOffset*scale) - (max * scale) + hOffset
          );
          paint.lineTo(
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) + 10,
            (this.fHOffset*scale) - (max * scale) + hOffset
          );
          paint.stroke();
          paint.closePath();
    
          //Draw x-axis labels
          paint.font = "12px serif";
          paint.fillStyle = "black";
          
          if (q.fbyCat === "2"){
          paint.fillText(
            getStationName(this.byCat[j]),
            this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 5,
            this.fHOffset + 20,
            30
          );} else {
            paint.fillText(
              this.byCat[j],
              this.fWOffset + (j + 1) * (this.frameW / (this.byCat.length + 1)) - 5,
              this.fHOffset + 20,
              30
            );

          }
          paint.stroke();
        }

        document.getElementById("check").appendChild(canvas);
        document.getElementById("charts").appendChild(canvas2);
      } catch (e) {console.error();
      };
      
  }

  setGlobalMax(resp) {
    this.gMax = Math.max(...resp);
  }

  setGlobalMin(resp) {
    this.gMin = Math.min(...resp);
  }

  getGlobalMedian(){
    return this.gMedian;
  }

  setGlobalMedian(resp) {
    if (resp.length % 2 === 0) {
      //There's an even number of data points
      var a = resp.length / 2;
      var b = resp.length / 2 + 1;
      this.gMedian = (resp[a] + resp[b]) / 2;
    } else if (resp.length % 2 != 0) {
      //There's an odd number of data points
      var c = (resp.length + 1) / 2;
      this.gMedian = resp[c];
    } else {
    }

  }


  setBy(value) {
    switch (value) {
      case "0":
        return "Year";
        break;
      case "1":
        return "Month";
        break;
      case "2":
        return "Station";
        break;

      default:
    }
  }

  setByCat(value) {
    switch (value) {
      case "0":
        return this.selYears;
        break;
      case "1":
        return this.selMonths;
        break;
      case "2":
        return this.selStation;
        break;

      default:
    }
  }

  setframeW(w, sw) {
    let fW = w * sw;
    return fW;
  }

  setframeH(h, sh) {
    let fH = h * sh;
    return fH;
  }

  setXTicks(w, num) {
    let xDelta = w / num;
    return xDelta;
  }

  setYTicks(h, max) {
    let yDelta = max / h;
    return yDelta;
  }

  setfWOffset(w, sW) {
    const wOffset = (w * (1 - sW)) / 2;
    return wOffset;
  }

  setfHOffset(h, sH) {
    const hOffset = (h * (1 - sH)) / 2;
    return hOffset;
  }

  setArray(dAr) {
    return [...dAr];
  }

  setVarMax(dAr) {
    let max = 0;
    for (let i = 0; i < dAr.length; i++) {
      max = max + dAr[i][this.f1];
    }
    return max;
  }

  getdArray() {
    return this.dArr;
  }

}



export { Boxplot };
