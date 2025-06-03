class Rectangle {
    constructor (paint,x,y,width,height,color) {

        paint.beginPath();
        paint.lineWidth = 1.5;
        paint.strokeStyle = "black";
        paint.globalAlpha = 0.5;
        paint.fillStyle = color;

        paint.fillRect(x,y,width,height)
        paint.rect(x,y,width,height)
        paint.stroke();
        paint.closePath();
        
    } 
}

export {Rectangle};