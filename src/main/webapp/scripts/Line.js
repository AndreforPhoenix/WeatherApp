class Line {
    constructor (paint, lineWidth, color, xfrom, xto,y,scale, yfrom, yto) {

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