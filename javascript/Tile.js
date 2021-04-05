
let tileSand = new Image();
tileSand.src = './Images/tile_sand.png'

let tree = new Image();
tree.src = './Images/nature/tree1.png'

let tree1 = new Image();
tree1.src = './Images/nature/tree2.png'



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
            y:canvas.height - tree.height
        };
        
        this.tree1 = {
            x:600,
            y:canvas.height - tree1.height
        }
    }
    drawTree(){
        ctx.drawImage(tree, this.tree.x, this.tree.y)
        ctx.drawImage(tree1, this.tree.x, this.tree.y)

        if (this.tree.x < -tree.width) {
            this.tree = { 
                x: Math.floor(Math.random() * tree.width + 10000),
                y: 380
            }
        }

        if (this.tree1.x < -tree1.width) {
            this.tree1 = { 
                x: Math.floor(Math.random() * tree.width + 10000),
                y: 380
            }
        }
    }
}