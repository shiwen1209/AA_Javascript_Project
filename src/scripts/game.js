import Ship from "./ship";
import Star from "./star";
import Flame from "./flame";
import Board from "./board";

export default class Game {

    constructor(ctx){
        this.ctx = ctx;
        this.stars = new Star(this.ctx);
        this.ship = new Ship(this.ctx);
        this.flame = new Flame(this.ctx);
        this.board = new Board(this.ctx);
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, 1600, 750);
        this.ctx.fillStyle = "#0E2650";
        this.ctx.fillRect(0, 0, 1600, 750);
        this.stars.draw();
        this.ship.draw();
        this.flame.draw();
        this.board.draw();        
    }

 

}