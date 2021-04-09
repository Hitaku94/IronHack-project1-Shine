
let ghost = new Image();
ghost.src = './Images/pac_man_big_100.png'


class Ghost {
    constructor() {
        this.x = -150
        this.y = 285;
        this.speed = 6
        this.xVelocity = 0
    }
    img() {
        ctx.drawImage(ghost, this.x, this.y)
        this.x += this.speed
    }
}