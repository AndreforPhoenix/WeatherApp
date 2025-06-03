class Point {
    constructor (paint,x,y,radius,angle, idx) {

        paint.beginPath();
        paint.setLineDash([0,0]);
        paint.lineWidth = 0.75;
        paint.strokeStyle = "red";
        paint.arc(
          x,
          y,
          radius,
          angle,
          3 * Math.PI
        );

        paint.stroke();
        paint.closePath();
      }

        
    } 


export {Point};