class Point {
    constructor (paint,x,y,radius,angle, idx) {

        paint.beginPath();
        paint.lineWidth = 0.75;
        paint.strokeStyle = "red";
        paint.arc(
          x + Math.random() * ((-1) ** idx * 5),
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