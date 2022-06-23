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
            "Fantastic!",
            "Thumbs up!",
            "Crazy good!",
            "Perfect!",
            "Keep it up!",
            "You're on a roll!",
        ]


        this.ctx = ctx;
        this.stars = new Star(this.ctx);
        this.ship = new Ship(this.ctx);
        this.flame = new Flame(this.ctx);
        this.board = new Board(this.ctx, Level[this.level]);
        this.level = 0
        this.draw();
        // this.board.winStatus = false;
        // this.board.loseStatus = false;
        this.playerScore = 0;
        this.playerlives = 3;
    }




    draw(){
        this.ctx.clearRect(0, 0, 1600, 750);
        this.ctx.fillStyle = "#0E2650";
        this.ctx.fillRect(0, 0, 1600, 750);
        this.stars.draw();
        this.ship.draw();
        this.flame.draw();
        this.board.draw();
        this.checkWinLose();
        if(this.board.winStatus === false && this.board.loseStatus === false){
            this.drawScoreCard();
        }
    }

    drawScoreCard(){
        const p1 = document.getElementById("life");
        p1.innerHTML = `Lives: ${this.playerlives}`;

        const p2 = document.getElementById("total-score");
        p2.innerHTML = `Score: ${this.playerScore}`;

        const li1 = document.getElementById("lvl");
        if (li1) {
            li1.innerHTML = "Current Level:" + "&nbsp" + "&nbsp" + "&nbsp&nbsp&nbsp&nbsp" + `${this.level}`
        }
        

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
 
        if (this.board.winStatus === false) {
            this.gameWon();
        } else if (this.board.winStatus){
            this.drawWiningMessage();
        }

        if (this.board.loseStatus === false) {
            this.gameLost();
        } else if (this.board.loseStatus){
            this.drawLosingMessage();
        }
    }

    drawWiningMessage(){
        const p1 = document.getElementById("life");
        p1.innerHTML = `Lives: ${this.playerlives}`;

        const p2 = document.getElementById("total-score");
        p2.innerHTML = `Score: ${this.playerScore}`;



        const div = document.getElementById("text-area");
        if (div) { div.remove() }

        const div2 = document.getElementById("result-board");
        if(!div2){

        
        let newDiv = document.createElement("div");
        newDiv.id = "result-board";
        document.body.append(newDiv);
        newDiv.style.backgroundColor = "#DAECC0";

        const p = document.createElement("p");
        newDiv.appendChild(p);
        p.innerHTML = `${Game.AFFIRMATIONS[this.level % 7]}`

        const ul = document.createElement("ul");
        newDiv.appendChild(ul);
        ul.className = "result-board";

        const li1 = document.createElement("li");
        ul.appendChild(li1);
        li1.innerHTML = `You scored ${this.board.finalScore()} ptx this round!`

        const li2 = document.createElement("li");
        ul.appendChild(li2);
        li2.innerHTML = `Click button to the next level!`
        }

    }

    drawLosingMessage() {
        const p1 = document.getElementById("life");
        p1.innerHTML = `Lives: ${this.playerlives}`;

        const p2 = document.getElementById("total-score");
        p2.innerHTML = `Score: ${this.playerScore}`;



        const div = document.getElementById("text-area");
        if (div) { div.remove() }

        const div2 = document.getElementById("result-board");
        if (!div2) {

            let newDiv = document.createElement("div");
            newDiv.id = "result-board";
            document.body.append(newDiv);
            newDiv.style.backgroundColor = "#EEB5AD";

            const p = document.createElement("p");
            newDiv.appendChild(p);
            p.innerHTML = "Time up! You lost :("

            const ul = document.createElement("ul");
            newDiv.appendChild(ul);
            ul.className = "result-board";

            const li1 = document.createElement("li");
            ul.appendChild(li1);
            li1.innerHTML = `Click button to try again!`

        }

    }

    gameWon(){
        if(this.board.win()){

            const tada_sound = document.getElementById("tada")
            tada_sound.play();

            this.level += 1;
            if(this.level <= 10){
            const btn = document.getElementById('test');
            btn.innerText = `Continue to level ${this.level}`;
            // this.board.winStatus = true;
            // console.log("final score")
            // console.log(this.board.finalScore());
            this.playerScore += this.board.finalScore();
            this.enableButton();} 

        }
    }

    gameLost(){
        if(this.board.lost()){
            // alert("game over");

            this.playerlives -= 1;
            const btn = document.getElementById('test');
            btn.innerText = `Restart this level`;

            const timeup_sound = document.getElementById("timeup")
            timeup_sound.play();

            // this.board.loseStatus = true;
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