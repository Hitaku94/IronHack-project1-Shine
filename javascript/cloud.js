let cloud = new Image();
cloud.src = './Images/nature/cloud.png'

let cloud1 = new Image();
cloud1.src = './Images/nature/cloud1.png'


class Cloud {
    constructor() {
        this.cloud = [
            { x: 100, y: 25 },
            { x: 400, y: 25 },
            { x: 700, y: 25 }
        ];
        this.cloud1 = [
            { x: 300, y: 75 },
            { x: 600, y: 75 },
            { x: 900, y: 75 }
        ];
        this.speed = -0.5;
    }
    drawCloud() {

        for (let i = 0; i < this.cloud.length; i++) {
            ctx.drawImage(cloud, this.cloud[i].x, this.cloud[i].y)
            this.cloud[i].x += this.speed

            if (this.cloud[i].x < - cloud.width) {
                this.cloud[i] = { x: canvas.width, y: 25 }
            }
        }
        for (let i = 0; i < this.cloud1.length; i++) {
            ctx.drawImage(cloud1, this.cloud1[i].x, this.cloud1[i].y)
            this.cloud1[i].x += this.speed

            if (this.cloud1[i].x < - cloud1.width) {
                this.cloud1[i] = { x: canvas.width, y: 75 }
            }
        }

    }
}
