
let column = new Image();
column.src = './Images/column.png'

let bridge = new Image();
bridge.src = './Images/bridge.png'


class Column {
    constructor() {
        this.column = [
            { x: 700, y: 380 },
            { x: 900, y: 360 },
            { x: 1100, y: 340 },
            { x: 1300, y: 370 },
            { x: 1500, y: 350 },
            { x: 1700, y: 300 },
            //{x:2000, y:330}
        ];
        this.column1 = [
            { x: 500, y: -150 },
            { x: 1600, y: -150 },
            { x: 2000, y: -150 },
            { x: 2400, y: -150 },
            { x: 2800, y: -150 }
        ];
        this.plateform = [
            { x: 1500, y: -300},
            { x: 1800, y: -200},
            { x: 2100, y: -350},
            { x: 2400, y: -200},
        ];

        this.loop = 0;

        this.speed = -7

    }
    drawColumn() {

        //this.column1.x += this.speed
        
        for (let i = 0; i < this.column.length; i++) {
            
            ctx.drawImage(column, this.column[i].x, this.column[i].y)
            
            //this.column[i].x += this.speed
            
                if (this.column[i].x < -column.width) {
                    this.column[i] = {
                        x: canvas.width + column.width,
                        y: Math.floor(Math.random() * column.height + 280)
                    }
                    this.loop += 1
                }

            
        }

        
            for (let j = 0; j < this.column1.length; j++) {
                
                ctx.drawImage(column, this.column1[j].x, this.column1[j].y)
                if (this.loop > 30) {
                if (this.column1[j].x < -column.width) {
                    this.column1[j] = {
                        x: Math.floor(Math.random() * canvas.width + 2000),
                        y: 220
                    }
                    this.loop += 1
                }
            }
        }

        if (this.loop > 60)
        for (let k = 0; k < this.plateform.length; k++) {
            ctx.drawImage(bridge, this.plateform[k].x, this.plateform[k].y)
            
            if (this.plateform[k].x < -bridge.width) {
                this.plateform[k] = {
                    x: Math.floor(Math.random() * canvas.width + 1000),
                    y: Math.floor(Math.random() * bridge.width + 200)
                }
                this.loop += 1
            }
        }
            
    }
}