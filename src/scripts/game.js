import Ship from "./ship";
import Star from "./star";
import Flame from "./flame";
import Board from "./board";
const Level = require("./level");

export default class Game {


    constructor(ctx){
        Game.AFFIRMATIONS = [
            "Nice job!", 
            "You got it!",
            "You're on a roll!",
            "Fantastic!",
            "Thumbs up!",
            "Crazy good!",
            "Perfect!",
            "Keep it up!"
        ]

        this.ctx = ctx;
        this.stars = new Star(this.ctx);
        this.ship = new Ship(this.ctx);
        this.flame = new Flame(this.ctx);
        this.board = new Board(this.ctx, Level[this.level]);
        this.level = 0
        this.draw();
        this.winStatus = false;
    }

    draw(){
        this.ctx.clearRect(0, 0, 1600, 750);
        this.ctx.fillStyle = "#0E2650";
        this.ctx.fillRect(0, 0, 1600, 750);
        this.stars.draw();
        this.ship.draw();
        this.flame.draw();
        this.board.draw();
        
        if(this.winStatus === false){
            this.gameWon();
        }

        if(this.winStatus){
            this.ctx.beginPath();
            this.ctx.fillStyle = "red"
            this.ctx.fillRect(700, 200, 300, 250);
            this.ctx.closePath();

            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(Game.AFFIRMATIONS[this.level], 750, 300); 
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("Click button above to continue", 750, 340);
            this.ctx.fillText("to the next level", 750, 380);  
        }
    }

    gameWon(){
        if(this.board.win()){
        this.level += 1;
        const btn = document.getElementById('test');
        btn.innerText = `Continue to level ${this.level}`;
        this.winStatus = true;


        }
    }

 

}