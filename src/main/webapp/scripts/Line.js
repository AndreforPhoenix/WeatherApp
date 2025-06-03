
class Line {
    constructor (paint, lineWidth,dash, color, xfrom, xto,y,scale, yfrom, yto) {
      if (dash === 1){
              paint.setLineDash([10,5]);
      } else {
              paint.setLineDash([0,0]); 
      }

        paint.lineWidth = lineWidth;

        paint.strokeStyle = color;
        paint.beginPath();
        paint.moveTo(
          xfrom,
          y - scale * yfrom
        );
        paint.lineTo(
          xto,
          y - scale * yto
        );
        paint.stroke();
        paint.closePath();
    
    } 
}

export {Line};