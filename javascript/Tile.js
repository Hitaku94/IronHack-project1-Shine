
let tileSand = new Image();
tileSand.src = './Images/tile_sand.png'

let tree = new Image();
tree.src = './Images/nature/tree1.png'

let tree1 = new Image();
tree1.src = './Images/nature/tree2.png'

let arrowRight = new Image();
arrowRight.src = './Images/arrowRight.png'



class Tile {
    constructor() {
        this.x = 0;
        this.y = 400;
        this.tile = 9;
    }
    drawTile() {
        for (let i = 0; i <= this.tile; i++) {
            ctx.drawImage(tileSand, this.x + (120 * i), this.y)
        }
    }

}

class Tree {
    constructor(){
        this.tree = {
            x:500, 
            y:canvas.height - tree.height - 90
        };
        
        this.tree1 = {
            x:800,
            y:canvas.height - tree1.height - 90
        }
        this.tree2 = {
            x:1000,
            y:canvas.height - tree1.height - 90
        }
        this.tree3 = {
            x:1300,
            y:canvas.height - tree1.height - 90
        }
        this.speed = -7
    }
    drawTree(){
        ctx.drawImage(tree, this.tree.x, this.tree.y)
        ctx.drawImage(tree1, this.tree1.x, this.tree1.y)
        ctx.drawImage(tree, this.tree2.x, this.tree2.y)
        ctx.drawImage(tree1, this.tree3.x, this.tree3.y)
        /*this.tree.x += this.speed
        this.tree1.x += this.speed
        this.tree2.x += this.speed
        this.tree3.x += this.speed*/

        if (this.tree.x < -tree.width) {
            this.tree = { 
                x: Math.floor(Math.random() * canvas.width + 1750),
                y: this.tree.y
            }
        }

        if (this.tree1.x < -tree1.width) {
            this.tree1 = { 
                x: Math.floor(Math.random() * canvas.width + 1750),
                y: this.tree1.y
            }
        }

        if (this.tree2.x < -tree.width) {
            this.tree2 = { 
                x: Math.floor(Math.random() * canvas.width + 1750),
                y: this.tree2.y
            }
        }

        if (this.tree3.x < -tree.width) {
            this.tree3 = { 
                x: Math.floor(Math.random() * canvas.width + 1750),
                y: this.tree3.y
            }
        }
    }
}

class Arrow {
    constructor(){
        this.x = 600
        this.y = canvas.height - arrowRight.height - 95
        this.speed = -7
    }
    drawArrow(){
        ctx.drawImage(arrowRight, this.x, this.y)
        //this.x += this.speed

        if (this.x < - arrowRight.width) {
            this.x = Math.floor(Math.random() * canvas.width + 3000)
            this.y = this.y
                
        }
    }
}

class Bush {
    constructor(){
        this.bush = {
            x: 200,
            y: canvas.height - tree.height + 90
        }
        this.bush1 = {
            x: 600,
            y: canvas.height - tree.height + 90
        }
        this.bush2 = {
            x: 1000,
            y: canvas.height - tree.height + 90
        }
        this.bush3 = {
            x: 300,
            y: canvas.height - tree.height + 90
        }
        this.speed = -7
    }
    drawBush(){
        ctx.drawImage(tree, this.bush.x, this.bush.y)
        ctx.drawImage(tree, this.bush1.x, this.bush1.y)
        ctx.drawImage(tree, this.bush2.x, this.bush2.y)
        ctx.drawImage(tree, this.bush3.x, this.bush3.y)
        /*this.bush.x += this.speed
        this.bush1.x += this.speed
        this.bush2.x += this.speed
        this.bush3.x += this.speed*/

        if (this.bush.x < - tree.width) {
            this.bush.x = Math.floor(Math.random() * canvas.width + 1500)
            this.bush.y = Math.floor(Math.random() * tree.height + 250)
        }

        if (this.bush1.x < - tree.width) {
            this.bush1.x = Math.floor(Math.random() * canvas.width + 1500)
            this.bush1.y = Math.floor(Math.random() * tree.height + 250)
        }

        if (this.bush2.x < - tree.width) {
            this.bush2.x = Math.floor(Math.random() * canvas.width + 1500)
            this.bush2.y = Math.floor(Math.random() * tree.height + 250)
        }

        if (this.bush3.x < - tree.width) {
            this.bush3.x = Math.floor(Math.random() * canvas.width + 1500)
            this.bush3.y = Math.floor(Math.random() * tree.height + 250)
        }
    }
}