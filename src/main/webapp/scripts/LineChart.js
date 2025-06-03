/* Class to build LineChart */

import { SummaryStats } from "./SummaryStats.js";
import { Point } from "./Point.js";
import {Line} from "./Line.js";
import { Rectangle } from "./Rectangle.js";

class LineChart {
selYears;
selMonths;
selStation;
responseOnly;
byCat;
graph;
width;
height;
gMax;
xyMap;
xCount;

  constructor(dataSupplier,stat) {
    this.graph = this.setGraph(dataSupplier.cW, 100);
    this.frameW = this.setframeW(dataSupplier.cW, dataSupplier.scW);
    this.frameH = this.setframeH(this.graph.height, dataSupplier.scH);
    this.fWOffset = this.setfWOffset(dataSupplier.cW, dataSupplier.scW);
    this.fHOffset = this.setfHOffset(this.graph.height, dataSupplier.scH);
    this.selYears = [...dataSupplier.yearsSet];
    this.selMonths = [...dataSupplier.monthSet];
    this.selStation = [...dataSupplier.stationSet];
    this.byCat = this.setByCat(dataSupplier.fbyCat);
    this.responseOnly = dataSupplier.arrayOfResponseOnly; 
    this.xyMap = this.setMap(dataSupplier,stat);
    this.xCount = this.setXCount(this.xyMap);  
 
    const paint = this.graph.getContext("2d");

    //new Rectangle(paint,this.fWOffset,this.fHOffset,this.frameW,this.frameH,"yellow");

  const it = this.xyMap;

  var n = [];

  for (const i of it){
    n.push(i.stat);
  }

    const stats = new SummaryStats(n);
    const avg = stats.getMean();

    new Line(paint,.5,1,"black",this.fWOffset,this.fWOffset + this.frameW,this.graph.height/2,1,0,0);
    new Line(paint,.5,0,"black",this.fWOffset + 15 ,this.fWOffset + 15,0,1,-15,-this.graph.height + 15);

    paint.fillText(`Average(${stat}) = ${avg.toFixed(1)}`,this.fWOffset/3,this.graph.height/2,100);
    paint.fillText(`LineChart for ${stat}`,10,10,100);

          let xStart = this.frameW/(this.byCat.length + 1) + this.fWOffset;
          let xStep =  this.frameW/(this.byCat.length + 1);

          var lastPoint = (this.xyMap[this.byCat.length - 1].stat - avg)*5;

        for (let j = 0; j < this.byCat.length; j++) {
          
          var deltaToMean;
          var deltaToMeanNext;
          var point; 
          var nextPoint;

          if (this.byCat.length - j != 1){
            
          deltaToMean = this.xyMap[j].stat - avg;
          deltaToMeanNext = this.xyMap[j+1].stat - avg;
          point = deltaToMean*5;
          nextPoint = deltaToMeanNext*5;

            new Line(paint,2,0,"red",xStart + xStep*(j),xStart + xStep*(j+1),(this.graph.height/2),1,point,nextPoint);
          } else {
                      deltaToMean = this.xyMap[j].stat - avg;
                      point = deltaToMean*5;

                       new Line(paint,2,0,"red",xStart + xStep*(j),xStart + xStep*(j),(this.graph.height/2),1,point,lastPoint);
          }
     
          new Point(paint,xStart + xStep*(j),(this.graph.height/2)-point,4,0,j); 
          
   }
   

  }

  setMap(dataSupplier,stat){

    var map = [];

    if (stat == "Max"){
      map = dataSupplier.getkeyValuePairMax();
    } else if (stat == "Q3") {
      map = dataSupplier.getkeyValuePairQ3();
    } else if (stat == "Median") {
      map = dataSupplier.getkeyValuePairMedian();
    } else if (stat == "Q1") {
      map = dataSupplier.getkeyValuePairQ1();
    } else if (stat == "Min") {
      map = dataSupplier.getkeyValuePairMin();
    } else if (stat == "Mean") {
      map = dataSupplier.getkeyValuePairMean();
    } else if (stat = "Stdev") {
      map = dataSupplier.getkeyValuePairStdev();
    }
    return map;
  }
  
  setXCount(map){
    var count = map.size;
    return count;
  }

  getXCount(){
    return this.xCount;
  }

  setGlobalMax(resp) {
    this.gMax = Math.max(...resp);
  }

    setframeW(w, sw) {
    let fW = w * sw;
    return fW;
  }

  setframeH(h, sh) {
    let fH = h * sh;
    return fH;
  }

    setfWOffset(w, sW) {
    const wOffset = (w * (1 - sW)) / 2;
    return wOffset;
  }

  setfHOffset(h, sH) {
    const hOffset = (h * (1 - sH)) / 2;
    return hOffset;
  }

  setGraph(width,height){
     let a = document.createElement("canvas");
     a.id = "Line";
     a.width = width;
     a.height = height;
     return a;
  }

  getGraph(){
    return this.graph;
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

}

export { LineChart }
