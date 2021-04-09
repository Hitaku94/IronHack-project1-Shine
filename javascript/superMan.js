let superManImage = new Image();
superManImage.src = './Images/supermanMirror.png';

class Superman {
    constructor(){
        this.x = 900
        this.y = -60
        this.xVelocity = 0
        this.yVelocity = 0
    }
    image(){
        ctx.drawImage(superManImage, this.x, this.y)
    }
}