/* Class to build Boxplot */

import { SummaryStats } from "./SummaryStats.js";
import { getStationName } from "./StationName.js";
import { Rectangle } from "./Rectangle.js";
import { Point } from "./Point.js";
import {Line} from "./Line.js";

class Boxplot {
  selYears;
  selMonth;
  selStation;
  byCat;
  graph1;
  graph2;
  frameW;
  frameH;
  fWOffset;
  fHOffset;
  dArr;
  f1;
  by;
  gMax;
  gMin;
  gMedian;

  constructor(dataSupplier) {

    this.selYears = [...dataSupplier.yearsSet];
    this.selMonths = [...dataSupplier.monthSet];
    this.selStation = [...dataSupplier.stationSet];
    this.byCat = this.setByCat(dataSupplier.fbyCat);
    this.frameW = this.setframeW(dataSupplier.cW, dataSupplier.scW);
    this.frameH = this.setframeH(dataSupplier.cH, dataSupplier.scH);
    this.fWOffset = this.setfWOffset(dataSupplier.cW, dataSupplier.scW);
    this.fHOffset = this.setfHOffset(dataSupplier.cH, dataSupplier.scH);
    this.dArr = this.setArray(dataSupplier.arrayOfObservationsFiltered);
    this.f1 = dataSupplier.fResponse;
    this.by = this.setBy(dataSupplier.fbyCat);
    this.gMax = this.setGlobalMax([3, 1]);
    this.gMin = this.setGlobalMin([3, 1]);
    this.graph1 = this.setGraph1(dataSupplier.cW, dataSupplier.cH);
    this.graph2 = this.setGraph2(dataSupplier.cW,125);


    const paint = this.graph1.getContext("2d");
    const paint2 = this.graph2.getContext("2d");

    paint.translate(0, this.frameH);
    paint2.translate(0, this.frameH);

    drawFrame(paint,paint2,this.fWOffset,this.fHOffset,this.frameW,this.frameH);
    drawTitle(paint,"Boxplot",this.f1,this.frameW,this.frameH,this.fHOffset,this.by);
    drawSelectionLabels(paint,this.selYears,this.selMonths,this.fWOffset,this.fHOffset,this.selStation);
    drawFiveNLabels(paint2, this.fWOffset, this.frameW);

    try {
      for (let j = 0; j < this.byCat.length; j++) {
        if (dataSupplier.fbyCat === "0") {
          var scr = "a.year";
        } else if (dataSupplier.fbyCat === "1") {
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
        var scale = 2.5;
        var hOffset = this.gMedian - this.frameH / 2.5;
      

        const fiveN = new SummaryStats(resp);
        var max = fiveN.getMax();
        var p75 = fiveN.get75thP();
        var med = fiveN.getMedian();
        var p25 = fiveN.get25thP();
        var min = fiveN.getMin();

        var x, y, width, height;
        
       //plot points
        for (let i = 0; i < temp.length; i++) {
          x = xPos(this.fWOffset, this.frameW, this.byCat.length, j, "point");
          y = this.fHOffset * scale - temp[i][this.f1] * scale + hOffset;
          new Point(paint, x, y, 1.5, 0, i);
        }

        //draw IQR rectangle
        x = xPos(this.fWOffset, this.frameW, this.byCat.length, j, "box");
        y = this.fHOffset * scale - p25 * scale + hOffset;
        width = boxWidth(this.byCat.length);
        height = -(p75 - p25) * scale;

        new Rectangle(paint, x, y, width, height,"yellow");

        //draw median
        x = xPos(this.fWOffset, this.frameW, this.byCat.length, j, "point");
        y = this.fHOffset * scale - med * scale + hOffset;
        drawMedian(paint, x, y, this.byCat.length);

        //draw five number data
        drawFiveN(paint2, x, N, this.frameW);
        drawFiveN(paint2, x, max, this.frameW);
        drawFiveN(paint2, x, p75, this.frameW);
        drawFiveN(paint2, x, med, this.frameW);
        drawFiveN(paint2, x, p25, this.frameW);
        drawFiveN(paint2, x, min, this.frameW);

        y = this.fHOffset * scale + hOffset;

        //draw whiskers
        drawWhiskers(paint,1.5,0, "black",x,y,scale,min,p25,p75,max);

        //Draw x-axis labels
        paint.font = "12px serif";
        paint.fillStyle = "black";

        var text = this.byCat[j];

        if (dataSupplier.fbyCat === "2") {
          paint.fillText(
            getStationName(this.byCat[j]),
            this.fWOffset +
              (j + 1) * (this.frameW / (this.byCat.length + 1)) -
              10,
            this.fHOffset + 20,
            30
          );
        } else {
          paint.fillText(
            text.slice(2,4),
            this.fWOffset +
              (j + 1) * (this.frameW / (this.byCat.length + 1)) -
              10,
            this.fHOffset + 20,
            30
          );
        }
        paint.stroke();
      }

    } catch (e) {
      console.error();
    }

    function drawWhiskers(paint, lineWidth,dash, color, x,y, scale, min,p25,p75,max ){
      new Line(paint,lineWidth,dash,color,x,x,y,scale, min,p25)
      new Line(paint,lineWidth,dash,color,x,x,y,scale,max,p75)
      new Line(paint,lineWidth,dash,color,x-7,x+7,y,scale,min,min)
      new Line(paint,lineWidth,dash,color,x-7,x+7,y,scale,max,max)
    }


    function drawFiveN(paint2, x, stat, frameW) {
      let y = 0;
      switch (stat) {
        case N:
          y = -185;
          break;
        case max:
          y = -170;
          break;
        case p75:
          y = -155;
          break;
        case med:
          y = -140;
          break;
        case p25:
          y = -125;
          break;
        case min:
          y = -110;
          break;
        default:
      }

      let dec;
      if (stat === N) {
        dec = 0;
      } else {
        dec = 1;
      }

      paint2.fillText(stat.toFixed(dec), x, y, frameW);
    }

    function drawMedian(paint, x, y, byCatLength) {
      paint.lineWidth = 1.5;
      paint.strokeStyle = "black";
      paint.beginPath();
      paint.moveTo(x - boxWidth(byCatLength) / 2, y);
      paint.lineTo(x + boxWidth(byCatLength) / 2, y);
      paint.stroke();
      paint.closePath();
    }

    function xPos(fWOffset, frameW, byCatLength, j, type) {
      let xpos = fWOffset + (j + 1) * (frameW / (byCatLength + 1));

      switch (type) {
        case "box":
          if (byCatLength < 10) {
            xpos = xpos - 15;
          } else if (byCatLength >= 10 && byCatLength < 20) {
            xpos = xpos - 10;
          } else {
            xpos = xpos - 5;
          }
          break;
        case "line":
          if (byCatLength < 10) {
            xpos = xpos - 15;
          } else if (byCatLength >= 10 && byCatLength < 20) {
            xpos = xpos - 10;
          } else {
            xpos = xpos - 5;
          }
        case "point":
          xpos;
          break;
        default:
      }

      return xpos;
    }

    function boxWidth(byCatLength) {
      let width = 0;
      if (byCatLength < 10) {
        width = 30;
      } else if (byCatLength >= 10 && byCatLength < 20) {
        width = 20;
      } else {
        width = 10;
      }
      return width;
    }

    function drawFrame(paint, paint2, fWOffset, fHOffset, frameW, frameH) {
      paint.font = "20px serif";
      paint.fillStyle = "black";
      paint2.font = "11px serif";
      paint2.textAlign = "center";

      paint.rect(fWOffset, fHOffset, frameW, -frameH);
      paint.lineWidth = 1;
      paint.stroke();

      paint2.rect(fWOffset, -100, frameW, -100);
      paint2.lineWidth = 1;
      paint2.stroke();
    }

    function board(cId, cWidth, cHeight) {
      let a = document.createElement("canvas");
      a.id = cId;
      a.width = cWidth;
      a.height = cHeight;
      return a;
    }

    function drawFiveNLabels(paint2, fWOffset, frameW) {
      paint2.fillText("N:", fWOffset - 40, -185, frameW);
      paint2.fillText("Max:", fWOffset - 40, -170, frameW);
      paint2.fillText("Q3:", fWOffset - 40, -155, frameW);
      paint2.fillText("Median:", fWOffset - 40, -140, frameW);
      paint2.fillText("Q1:", fWOffset - 40, -125, frameW);
      paint2.fillText("Min:", fWOffset - 40, -110, frameW);
    }

    function drawSelectionLabels(
      paint,
      selYears,
      selMonths,
      fWOffset,
      fHOffset,
      selStations
    ) {
      paint.fillText("Month(s): " + selMonths, fWOffset + 10, fHOffset - 40);
      paint.fillText(
        "Station(s): " + selStations,
        fWOffset + 10,
        fHOffset - 20
      );
      //paint.fillText("Year(s): " + selYears, fWOffset + 10, fHOffset);
    }

    function drawTitle(paint, cId, f1, fWidth, fHeight, fHOffset, byCat) {
      paint.fillText(
        "   " + cId + " for " + f1 + " by " + byCat,
        fWidth / 2,
        -fHeight + fHOffset - 20,
        fWidth
      );
    }
  }

    setGraph1(width,height){
     let a = document.createElement("canvas");
     a.id = "Boxplot";
     a.width = width;
     a.height = height;
     return a;
  }
    getGraph1(){
      return this.graph1;
    }

    setGraph2(width,height){
     let a = document.createElement("canvas");
     a.id = "Summary";
     a.width = width;
     a.height = height;
     return a;
  }
    getGraph2(){
      return this.graph2;
    }

  setGlobalMax(resp) {
    this.gMax = Math.max(...resp);
  }

  setGlobalMin(resp) {
    this.gMin = Math.min(...resp);
  }

  getGlobalMedian() {
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
