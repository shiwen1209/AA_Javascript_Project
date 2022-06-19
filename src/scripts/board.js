import Tile from "./tile";

export default class Board {
    constructor(ctx){
        Board.STARTX = 205;
        Board.STARTY = 155;
        Board.WIDTH = 450;
        Board.HEIGHT = 300;
        
        this.ctx = ctx;
        this.tiles = this.addTiles();
        this.draw()
    }

    addTiles() {
        let arr = [];
        let y = Board.STARTY;
        while (y < Board.STARTY + Board.HEIGHT) {
            let x = Board.STARTX;
            while (x < Board.STARTX + Board.WIDTH) {
                let tile = new Tile(this.ctx, x, y);
                arr.push(tile);
                x += Tile.LENGTH;
            }
            y += Tile.LENGTH;
        }
        return arr;
    }

    draw(){
        this.tiles.forEach((tile)=>{ tile.draw()}
        )
    }
}