import { SummaryStats } from "./SummaryStats.js";

class Supplier {
    arrayOfObservations;
    arrayOfObservationsFiltered;
    arrayOfResponseOnly;
    keyValuePairMax;
    keyValuePairQ3;
    keyValuePairMedian;
    keyValuePairQ1;
    keyValuePairMin;
    keyValuePairMean;
    keyValuePairStdev;
    fResponse;
    yearsSet;
    stationSet;
    monthSet;
    bySet;
    cW;
    cH;
    scW;
    scH;
    hisBarCount;
    fbyCat;
  
    constructor(arrayOfObservations, fResponse, fYear, fStation, fMonth, fbyCat, cW, cH,scW,scH) {
      this.arrayOfObservations = arrayOfObservations;
      this.fResponse = fResponse;
      this.yearsSet = fYear;
      this.stationSet = fStation;
      this.monthSet = fMonth;
      this.cW = cW;
      this.cH = cH;
      this.scW = scW;
      this.scH = scH;
      this.hisBarCount = 7;
      this.fbyCat = fbyCat;
      this.bySet = this.setBySet(); 
      this.arrayOfObservationsFiltered = this.setArrayOfObservationsFiltered(
        this.arrayOfObservations,
        this.fResponse,
        this.yearsSet,
        this.stationSet,
        this.monthSet
      );

      this.arrayOfResponseOnly = this.setArrayOfResponseOnly(this.arrayOfObservationsFiltered,this.fResponse);

      this.keyValuePairMax = this.setkeyValuePairMax(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairQ3 = this.setkeyValuePairQ3(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairMedian = this.setkeyValuePairMedian(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairQ1 = this.setkeyValuePairQ1(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairMin = this.setkeyValuePairMin(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairMean = this.setkeyValuePairMean(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);
      this.keyValuePairStdev = this.setkeyValuePairStdev(this.arrayOfObservationsFiltered,this.bySet,this.fResponse);

    }

    setArrayOfResponseOnly(array,fResponse){
      var tempA = [...array];
      var respA = [];
      for (let i = 0; i < tempA.length; i++) {
        respA.push(Number(tempA[i][fResponse].toFixed(1)));
      }
      return respA;
    } 
    
    setArrayOfObservationsFiltered(oArray, resp, year, station, month) {
      //Filter by years
      const nArray = [];
      const yearKeys = year.keys();

      for (const n of yearKeys) {
        // n times
        const p = oArray.filter((a) => a.year == n);
        for (const b of p) {
          // n times
          nArray.push(b);
        }
      } // O(n^2)
  
      //Filter by station
      const nArra = [];
      const stationKeys = station.keys();

      for (const s of stationKeys) {
        // n times
        const q = nArray.filter((c) => c.station == s);
        for (const d of q) {
          // n times
          nArra.push(d);
        }
      } // O(n^2)
  
      //Filter by month
      const nArr = [];
      const monthKeys = month.keys();

      for (const m of monthKeys) {
        // n times
        const r = nArra.filter((e) => e.month == m);
        for (const g of r) {
          // n times
          nArr.push(g);
        } // O(n^2)
      }
      return nArr;
    }

    setBySet(){
      var keys = [];

      if (this.fbyCat == "0") {
        keys = this.yearsSet;

      } else if (this.fbyCat == "1") {
        keys = this.monthSet;
      }
        else if (this.fbyCat == "2") {
        keys = this.stationSet;
        }
        return keys;
      }
    
    setkeyValuePairMax(array,cat,fResp){

      const keys = cat.keys();

      if (this.fbyCat === "0") {
        var scr = "e.year";
      } else if (this.fbyCat === "1") {
        var scr = "e.month";
      } else {
        var scr = "e.station";
      }

      var pair = [];

      for (const k of keys) {
        // n times
        var nArray = [];

          const r = array.filter((e) => eval(scr) == k);

          for (const g of r) {
            // n times
            nArray.push(g);
          }

          var tempA = [...nArray];
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][fResp].toFixed(1)));
          }

          var result = new SummaryStats(respA);
          var max = result.getMax();

          const obj = {key: k, stat: max}
          
          pair.push(obj);

      }  
      
      return pair;
    }

    getkeyValuePairMax(){
      return this.keyValuePairMax;
    }

    setkeyValuePairQ3(array,cat,fResp){
      const keys = cat.keys();

      if (this.fbyCat === "0") {
        var scr = "e.year";
      } else if (this.fbyCat === "1") {
        var scr = "e.month";
      } else {
        var scr = "e.station";
      }

      var pair = [];

      for (const k of keys) {
        // n times
        var nArray = [];

          const r = array.filter((e) => eval(scr) == k);

          for (const g of r) {
            // n times
            nArray.push(g);
          }

          var tempA = [...nArray];
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][fResp].toFixed(1)));
          }

          var result = new SummaryStats(respA);
          var Q3 = result.get75thP();
          
          const obj = {key: k, stat: Q3}
          
          pair.push(obj);
      }  
      
      return pair;
    }

    getkeyValuePairQ3(){
      return this.keyValuePairQ3;
    }    

    setkeyValuePairMedian(array,cat,fResp){
      const keys = cat.keys();

      if (this.fbyCat === "0") {
        var scr = "e.year";
      } else if (this.fbyCat === "1") {
        var scr = "e.month";
      } else {
        var scr = "e.station";
      }

      var pair = [];

      for (const k of keys) {
        // n times
        var nArray = [];

          const r = array.filter((e) => eval(scr) == k);

          for (const g of r) {
            // n times
            nArray.push(g);
          }

          var tempA = [...nArray];
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][fResp].toFixed(1)));
          }

          var result = new SummaryStats(respA);
          var median = result.getMedian();

          const obj = {key: k, stat: median}
          
          pair.push(obj);

      }  
      
      return pair;
    }

    getkeyValuePairMedian(){
      return this.keyValuePairMedian;
    }    

    setkeyValuePairQ1(array,cat,fResp){
      const keys = cat.keys();

      if (this.fbyCat === "0") {
        var scr = "e.year";
      } else if (this.fbyCat === "1") {
        var scr = "e.month";
      } else {
        var scr = "e.station";
      }

      var pair = [];

      for (const k of keys) {
        // n times
        var nArray = [];

          const r = array.filter((e) => eval(scr) == k);

          for (const g of r) {
            // n times
            nArray.push(g);
          }

          var tempA = [...nArray];
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][fResp].toFixed(1)));
          }

          var result = new SummaryStats(respA);
          var Q1 = result.get25thP();

          const obj = {key: k, stat: Q1}
          
          pair.push(obj);


      }  
      
      return pair;      
    }

    getkeyValuePairQ1(){
      return this.keyValuePairQ1;
    }

    setkeyValuePairMin(array,cat,fResp){
      const keys = cat.keys();

      if (this.fbyCat === "0") {
        var scr = "e.year";
      } else if (this.fbyCat === "1") {
        var scr = "e.month";
      } else {
        var scr = "e.station";
      }

      var pair = [];

      for (const k of keys) {
        // n times
        var nArray = [];

          const r = array.filter((e) => eval(scr) == k);

          for (const g of r) {
            // n times
            nArray.push(g);
          }

          var tempA = [...nArray];
          var respA = [];
          for (let i = 0; i < tempA.length; i++) {
            respA.push(Number(tempA[i][fResp].toFixed(1)));
          }

          var result = new SummaryStats(respA);
          var min = result.getMin();

          const obj = {key: k, stat: min}
          
          pair.push(obj);

      }  
      
      return pair;
    }

    getkeyValuePairMin(){
      return this.keyValuePairMin;
    }    

    setkeyValuePairMean(array,cat){
    
    }  
    
    getkeyValuePairMean(){
      return this.keyValuePairMean;
    }    

    setkeyValuePairStdev(array,cat){
     
    }

    getkeyValuePairStdev(){
      return this.keyValuePairStdev;
    }     

  }
  
  export {Supplier}