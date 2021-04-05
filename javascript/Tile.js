
let tileSand = new Image();
tileSand.src = './Images/tile_sand.png'

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