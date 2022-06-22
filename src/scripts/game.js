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

        Game.STATS = ["Current Level: ", "Total Score: ", "% Complete: "]

        this.ctx = ctx;
        this.stars = new Star(this.ctx);
        this.ship = new Ship(this.ctx);
        this.flame = new Flame(this.ctx);
        this.board = new Board(this.ctx, Level[this.level]);
        this.level = 0
        this.draw();
        this.winStatus = false;
        this.loseStatus = false;
        this.playerScore = 0;
        this.playerlives = 3;
    }

    addStats(){

        const lis = document.querySelectorAll('.game-status');
        const lis_arr = Array.from(lis);
        console.log(lis);
        lis_arr.forEach((li) => { if (li) { li.remove() } })

        const div = document.getElementById("text-area")
        const ul = document.createElement("ul");
        ul.className = "game-status"
        div.appendChild(ul)
        const li1 = document.createElement("li");
        li1.className = "game-status"
        li1.innerHTML = "Current Level:" + "&nbsp" + "&nbsp" + "&nbsp&nbsp&nbsp&nbsp" + `Lvl ${this.level}`
        ul.appendChild(li1);

        const li2 = document.createElement("li");
        li2.id = "score"
        li2.className = "game-status"
        li2.innerHTML = `Total Points: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp1000`
        ul.appendChild(li2);

        const li3 = document.createElement("li");
        li3.id = "completion"
        li3.className = "game-status"
        li3.innerHTML = `Wires completion: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp100%`
        ul.appendChild(li3);

        const li4 = document.createElement("li");
        li4.id = "timer"
        li4.className = "game-status"
        li4.innerHTML = `Time left: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${this.board.time} seconds`
        ul.appendChild(li4);
        
    }


    draw(){
        this.ctx.clearRect(0, 0, 1600, 750);
        this.ctx.fillStyle = "#0E2650";
        this.ctx.fillRect(0, 0, 1600, 750);
        this.stars.draw();
        this.ship.draw();
        this.flame.draw();
        this.board.draw();
        this.drawScoreCard();
        this.checkWinLose();
    }

    drawScoreCard(){
        const p1 = document.getElementById("life");
        p1.innerHTML = `Lives left: ${this.playerlives}`;

        const p2 = document.getElementById("total-score");
        p2.innerHTML = `Total score: ${this.playerScore}`;

        const li2 = document.getElementById("score");
        if (li2) {
            li2.innerHTML = `Total points: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${this.board.currentScore}`
        }

        const li3 = document.getElementById("completion");
        if (li3) {
            li3.innerHTML = `Wires completion: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${this.board.completionStatus()}`
        }

        const li4 = document.getElementById("timer");
        if (li4) {
            li4.innerHTML = `Time left: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${this.board.time} seconds`
        }
    }

    checkWinLose(){
        if (this.winStatus === false) {
            this.gameWon();
        } else {
            this.drawWiningMessage();
        }

        if (this.loseStatus === false) {
            this.gameLost();
        }
    }

    drawWiningMessage(){
        const lis = document.querySelectorAll('.game-status');
        const lis_arr = Array.from(lis);
        lis_arr.forEach((li) => { if (li) { li.remove() } })

        this.ctx.beginPath();
        this.ctx.strokeRect(695, 240, 300, 185);
        this.ctx.strokeStyle = '#25B7E6';
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(695, 240, 300, 185);
        this.ctx.fillStyle = "#1C66BB"
        this.ctx.closePath();

        this.ctx.font = "bold 30px Arial";
        this.ctx.fillStyle = "#E6BA25";
        this.ctx.fillText(Game.AFFIRMATIONS[this.level], 735, 310);
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#E6BA25";
        this.ctx.fillText("Click button to continue", 745, 350);
        this.ctx.fillText("to the next level", 780, 370);

    }

    gameWon(){
        if(this.board.win()){
            this.level += 1;
        
            if(this.level <= 10){
            const btn = document.getElementById('test');
            btn.innerText = `Continue to level ${this.level}`;
            this.winStatus = true;
            // console.log("final score")
            // console.log(this.board.finalScore());
            this.playerScore += this.board.finalScore();
            this.enableButton();} 

        }
    }

    gameLost(){
        if(this.board.lost()){
            alert("game over");
            this.playerlives -= 1;
            const btn = document.getElementById('test');
            btn.innerText = `Restart this level`;
            this.loseStatus = true;
            this.enableButton();
        }
    }

    gameover(){
        if(this.playerlives === 0 || this.level > 10){
            return true
        } else {return false}
    }

    disableButton(){
        let button = document.getElementById('test');
        button.disabled = true;
        button.style.background = "grey";
    }

    enableButton(){
        let button = document.getElementById('test');
        button.disabled = false;
        button.style.background = "#22A5CF";
    }

 

}