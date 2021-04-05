
let column = new Image();
column.src = './Images/column.png'


class Column {
    constructor() {
        this.column = [
            {x:700, y:280}, 
            {x:900, y:280},
            {x:1100, y:280},
            {x:1300, y:280},
            {x:1500, y:280},
            {x:1700, y:280}

        ];
        this.speed = -3
        
    }
    drawColumn() {

        for (let i = 0; i < this.column.length; i++) {
            ctx.drawImage(column, this.column[i].x, this.column[i].y)
            this.column[i].x += this.speed

            if (this.column[i].x < -column.width) {
                this.column[i] = { 
                    x: canvas.width + column.width,
                    y: Math.floor(Math.random() * column.height + 280)}
            }
        
        }
    }
}