let light = new Image();
light.src = './Images/000.png';


class Light {
    constructor() {
        this.x = 360
        this.y = 200
        this.jump = false
        this.height = 22
        this.width = 22
        this.xVelocity = 0
        this.yVelocity = 0
    }
    img() {
        ctx.drawImage(light, this.x, this.y)
    }
    collision() {
        if (this.y >= 380) {
            this.y = 380
            this.jump = false
        }
        if (this.x < 0) {
            this.x = 0
        }
        


    }

}