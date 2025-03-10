/* Supplier is an object that retrieves dpCol (array of dp objects), customizes it for various customers, and when needed
delivers it to customers. */

class Supplier {
    dpCol;
    dpColReduced;
    fResponse;
    yearsSet;
    stationSet;
    monthSet;
    cW;
    cH;
    canvasId1;
    canvasId2;
    canvasId3;
    canvasId4;
    hisBarCount;
    fbyCat;
  
    constructor(dpCol, fResponse, fYear, fStation, fDayOfYear, fbyCat, cW, cH) {
      this.dpCol = dpCol;
      this.fResponse = fResponse;
      this.yearsSet = fYear;
      this.stationSet = fStation;
      this.monthSet = fDayOfYear;
      this.cW = cW;
      this.cH = cH;
      this.canvasId1 = "histogram";
      this.canvasId2 = "cummulative";
      this.canvasId3 = "boxplot";
      this.canvasId4 = "linechart";
      this.hisBarCount = 7;
      this.fbyCat = fbyCat; 
  
      this.dpColReduced = this.setDpColReduced(
        this.dpCol,
        this.fResponse,
        this.yearsSet,
        this.stationSet,
        this.monthSet
      );
    }
  
    setDpColReduced(oArray, resp, year, station, month) {
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
  }
  
  export {Supplier}