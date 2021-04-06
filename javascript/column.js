
let column = new Image();
column.src = './Images/column.png'


class Column {
    constructor() {
        this.column = [
            {x:700, y:380}, 
            {x:900, y:360},
            {x:1100, y:340},
            {x:1300, y:370},
            {x:1500, y:350},
            {x:1700, y:300},
            //{x:2000, y:330}
        ];
        this.column1 = {
            x: 800,
            y: 200
        }
        this.speed = -5
        
    }
    drawColumn() {
        ctx.drawImage(column, this.column1.x, this.column1.y)
        this.column1.x += this.speed
        
        if (this.column1.x < -column.width) {
            this.column1 = {
                x: Math.floor(Math.random() * canvas.width + 2000),
                y: 240
            }
        }

        for (let i = 0; i < this.column.length; i++) {
            ctx.drawImage(column, this.column[i].x, this.column[i].y)
            this.column[i].x += this.speed

            if (this.column[i].x < -column.width) {
                this.column[i] = { 
                    x: canvas.width + column.width,
                    y: Math.floor(Math.random() * column.height + 280)
                }
            }
        
        }
    }
}