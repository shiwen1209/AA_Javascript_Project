import Tile from "./tile";
import Circut from "./circuit";

export default class Board {
    constructor(ctx){
        Board.STARTX = 205;
        Board.STARTY = 155;
        Board.WIDTH = 450;
        Board.HEIGHT = 300;        

        this.circutHash = {}
        this.circutHash[[0, 1]] = "blue";
        this.circutHash[[6, 2]] = "blue"; 
        this.circutHash[[5, 2]] = "yellow"; 
        this.circutHash[[0, 4]] = "yellow"; 
        this.circutHash[[6, 3]] = "red"; 
        this.circutHash[[1, 3]] = "red"; 
        this.circutHash[[1, 4]] = "purple";
        this.circutHash[[6, 5]] = "purple";
        this.circutHash[[0, 5]] = "green";
        this.circutHash[[5, 5]] = "green";

        this.ctx = ctx;
        // this.activeColor = null;
        this.tiles = [];
        this.circuits = [];
        this.allObjects = this.addTiles();
        this.clickBoard = this.clickBoard.bind(this);
        this.hoverBoard = this.hoverBoard.bind(this);
        this.activeColor = null;
        this.draw()
    }

    addTiles() {
        let j = 0;
        let arr = [];
        let y = Board.STARTY;
        while (y < Board.STARTY + Board.HEIGHT) {
            let x = Board.STARTX;
            let i = 0;
            while (x < Board.STARTX + Board.WIDTH) {
                if([j, i] in this.circutHash){
                    let color = this.circutHash[[j, i]];
                    let circuit = new Circut(this.ctx, x, y, color);
                    circuit.pos = [j, i];
                    this.circuits.push(circuit);
                    arr.push(circuit);
                } else {
                    let tile = new Tile(this.ctx, x, y);
                    tile.pos = [j, i];
                    this.tiles.push(tile);
                    arr.push(tile);
                }
                i += 1;
                x += Tile.LENGTH;
            }
            y += Tile.LENGTH;
            j += 1;
        }
        return arr;
    }

    draw(){
        this.allObjects.forEach((tile)=>{ tile.draw()}
        )
    }

    clickBoard(x, y){
        let target = null;
        for(let i = 0; i < this.allObjects.length; i++){
            let obj = this.allObjects[i];
            if ((x > obj.x && x < (obj.x + Tile.LENGTH)) &&
                (y > obj.y && y < (obj.y + Tile.LENGTH))) {
                target = obj;
                break;
            }
        }

        if(target != null && target.constructor === Circut){
            if (this.activeColor != target.color){
                this.activeColor = target.color;
            } else {
                this.activeColor = null;
            }
            
        } else if (target != null && target.constructor === Tile) {
            target.flip(this.activeColor);
        }
    }

    hoverBoard(x, y){
        console.log("hoverboard");
        let target = null;
        for (let i = 0; i < this.allObjects.length; i++) {
            let obj = this.allObjects[i];
            if ((x > obj.x && x < (obj.x + Tile.LENGTH)) &&
                (y > obj.y && y < (obj.y + Tile.LENGTH))) {
                target = obj;
                break;
            }
        }
        if (target != null && target.constructor === Tile) {
            target.flip(this.activeColor);
        }
    }
}