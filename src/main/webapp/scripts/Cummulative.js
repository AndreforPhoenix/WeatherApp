/* Class to build cummalative
Requirements:
Definition of cummalative graph - a analysis that takes a continuous variable, ordered
in sequence by time and displays each point on the graph as the summation of it and 
the previous points. 

*/
class Cummulative {
    constructor(q) {
      this.cH = q.cH;
      this.cW = q.cW;
      this.scW = 0.7;
      this.scH = 0.7;
      this.byMonth = [...q.monthSet];
      this.byStation = [...q.stationSet];
      this.byYear = [...q.yearsSet];
      this.frameW = this.setframeW(this.cW, this.scW);
      this.frameH = this.setframeH(this.cH, this.scH);
      this.yTicks = this.setYTicks(this.frameH, this.max);
      this.f1 = q.fResponse;
      this.f2 = q.fYear;
      this.fWOffset = this.setfWOffset(this.cW, this.scW);
      this.fHOffset = this.setfWOffset(this.cH, this.scH);
      this.cId = q.canvasId2;
      this.dArr = this.setArray(q.dpColReduced);
      this.max = this.setVarMax(q.dpColReduced);
      this.xTicks = this.setXTicks(this.frameW, this.dArr.length);
      this.byCat = this.setByCat(q.fbyCat);
      //const canvas = document.getElementById(this.cId);
  
      const canvas = document.createElement("canvas");
      canvas.id = "cummulative";
      canvas.width = this.cW;
      canvas.height = this.cH;
      document.getElementById("charts").appendChild(canvas);
  
      const paint = canvas.getContext("2d");
      paint.translate(0, this.frameH);
  
      paint.beginPath();
      paint.rect(this.fWOffset, this.fHOffset, this.frameW, -this.frameH);
      paint.lineWidth = 0.5;
      paint.stroke();
      paint.closePath();
  
      paint.font = "18px sans serif";
      for (const bs of this.byCat) {
        if (q.fbyCat === "0") {
          var scr = "a.year";
        } else if (q.fbyCat === "1") {
          var scr = "a.dayOfYear";
        } else {
          var scr = "a.station";
        }
  
        var temp = this.dArr.filter((a) => eval(scr) == bs);
        var maxValues = [];
        var sum = 0;
        const newArray = [];
        var r = Math.floor(255 * Math.random());
        var g = Math.floor(255 * Math.random());
        var b = Math.floor(255 * Math.random());
  
        var rgb = "'rgb(" + r + " " + g + " " + b + ")'";
        var ticks = this.setXTicks(this.frameW, this.frameW);
  
        for (let i = 0; i < temp.length; i++) {
          sum = sum + temp[i][this.f1];
          newArray.push([sum, i * ticks]);
        }
        maxValues.push(sum);
        var max = Math.max(maxValues);
  
        for (let i = 0; i < this.byCat.length; i++) {
          paint.fillStyle = eval(rgb);
          paint.fillText(
            this.byCat[i],
            this.fWOffset + 400,
            this.fHOffset - (100 + i * 25)
          );
        }
  
        for (let i = 0; i < temp.length; i++) {
          paint.beginPath();
          paint.lineWidth = 1;
          paint.strokeStyle = eval(rgb);
          paint.arc(
            this.fWOffset + newArray[i]["1"],
            this.fHOffset - newArray[i]["0"] * (this.frameH / max),
            2,
            0,
            2 * Math.PI
          );
  
          paint.stroke();
          paint.closePath();
        }
      }
  
      paint.strokeStyle = "black";
      paint.lineWidth = 1;
      paint.fillStyle = "black";
  
      //Draw chart title
      paint.fillText(
        "   " + this.cId + " for " + this.f1,
        this.fWOffset + 80,
        -this.frameH + this.fHOffset - 20,
        this.frameW
      );
  
      paint.font = "15px sans serif";
  
      //Draw x-labels
      for (let i = 0; i < this.byMonth.length; i++) {
        paint.fillText(
          this.byMonth[i],
          this.fWOffset + i * (this.frameW / this.byMonth.length),
          this.fHOffset + 20 + (i % 2) * 15,
          this.frameW
        );
      }
  
      //Draw y-axis
      paint.beginPath();
  
      for (let i = 0; i < 11; i++) {
        paint.moveTo(this.fWOffset, this.fHOffset - i * (this.frameH / 10));
        paint.lineTo(this.fWOffset - 5, this.fHOffset - i * (this.frameH / 10));
        paint.fillText(
          (i * (max / 10)).toFixed(0),
          this.fWOffset - 30,
          this.fHOffset - i * (this.frameH / 10),
          20
        );
      }
      paint.closePath();
      paint.stroke();
    }
  
    setByCat(value) {
      switch (value) {
        case "0":
          return this.byYear;
          break;
        case "1":
          return this.byMonth;
          break;
        case "2":
          return this.byStation;
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

  export {Cummulative}