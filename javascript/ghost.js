
let ghost = new Image();
ghost.src = './Images/pac_man_big_100.png'


class Ghost {
    constructor() {
        this.x = 0
        this.y = 285;
    }
    img() {
        ctx.drawImage(ghost, this.x, this.y)
    }
}