/* Class to build 5 number summary */


class SummaryStats {
    max; p75th; median; p25th; min; range;
    
    constructor (resp) {
        this.max = Math.max(...resp);
        this.p75th = this.set75thP(resp);
        this.median = this.setMedian(resp);        
        this.p25th = this.set25thP(resp);
        this.min = Math.min(...resp);
        this.range = this.setRange();
    }

getMax(){
  return this.max;
}

  set75thP(resp){

    resp.sort((a,b) => b - a);

    if (resp.length % 2 === 0){ //There's an even number of data points
        var a = (resp.length/2) - 1;
        var b = Math.floor((a - 1)/2);
      return (resp[b])
    } else if (resp.length % 2 != 0){ //There's an odd number of data points
      var d = ((resp.length + 1)/2) - 1;
      var e = Math.floor((d + 1)/2);
      return resp[e];
    } else {}
  }

  get75thP(){
    return this.p75th;
  }

  setMedian(resp){

    resp.sort((a,b) => b - a);

    if (resp.length % 2 === 0){ //There's an even number of data points
      var a = (resp.length/2);
      var b = (resp.length/2) + 1;
      return (resp[a] + resp[b])/2;
    } else if (resp.length % 2 != 0){ //There's an odd number of data points
      var c = (resp.length + 1)/2;
      return resp[c];
    } else {}
   
  }

  getMedian(){
    return this.median;
  }

  set25thP(resp){

    resp.sort((a,b) => b - a);

    if (resp.length % 2 === 0){ //There's an even number of data points
      var a = (resp.length/2) + 1;
      var b = resp.length - a;
      var c = (a + 1)/2; 
      var d = Math.floor(b + c);
        return (resp[d])
  }       else if (resp.length % 2 != 0){ //There's an odd number of data points
      var e = (resp.length + 1)/2;
      var f = ((resp.length - e) + 1)/2;
      var g = Math.floor(e + f);
        return resp[g];
  } else {}

  }

  get25thP(){
    return this.p25th;
  }

  getMin(){
    return this.min;
  }

  setRange(){
    return this.max - this.min;
  }

  getRange(){
    return this.range;
  }

}

export {SummaryStats}
