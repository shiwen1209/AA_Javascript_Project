import Game from "./game";

export default class GameView{
    constructor(ctx){
        this.ctx = ctx;
        this.restart();
    }

    restart(){
        this.destroy();
        this.game = new Game(this.ctx);
        this.start();
    }

    destroy(){
        const end = document.getElementById("game_end_background")
        end.loop = false;
        end.pause();

        clearInterval(this.endTimer);
        clearInterval(this.startTimer);

        const div1 = document.getElementById("top-five")
        if (div1) { div1.remove();}
        const div2 = document.getElementById("result-board");
        if (div2) { div2.remove();}

    }

    start(){
        this.startTimer = setInterval( ()=> {
            if (this.game.gameover()) {
                clearInterval(this.startTimer);
                this.playEnd();
            } else {
                this.game.draw()
            };
        }, 100)

    }

    playEnd(){
        this.playEndSound();
        this.drawEnd();
        this.displayTopFive();
        this.displayFinalScore();
    }

    playEndSound(){
        const begin = document.getElementById("game_background")
        begin.loop = false;
        begin.pause();

        const end = document.getElementById("game_end_background")
        end.loop = true;
        end.play();
    }

    drawEnd(){
        this.endTimer = setInterval(() => {
            this.ctx.clearRect(0, 0, 1600, 750);
            this.ctx.fillStyle = "#0E2650";
            this.ctx.fillRect(0, 0, 1600, 750);
            this.game.stars.draw();
            this.game.ship.draw();
            this.game.flame.draw();
        }, 100)
    }

    displayTopFive(){

        this.updateTopFive();

        const oldDiv = document.getElementById("text-area");
        if (oldDiv) { oldDiv.remove()}


        const div = document.createElement("div");
        div.id = "top-five";
        document.body.append(div);

        const h = document.createElement("h3");
        h.className = "top-five"
        h.innerHTML = "Top five players"
        div.appendChild(h)

        const ul = document.createElement("ul");
        ul.className = "top-five"
        div.appendChild(ul)

        for (let i = 1; i < 6; i++) {
            if (window.localStorage[i] != undefined) {
                const li = document.createElement("li");
                const arr = window.localStorage[i].split(",");
                li.className = "top-five"
                li.innerHTML = "Top" + "&nbsp" + `${i}:` + "&nbsp" + "&nbsp" + "&nbsp&nbsp&nbsp&nbsp"
                    + `${arr[0]}` + "&nbsp&nbsp&nbsp&nbsp" + `${arr[1]}`
                ul.appendChild(li);
            } else {

                const li = document.createElement("li");
                li.className = "top-five"
                li.innerHTML = "Top" + `${i}:` + "&nbsp" + "&nbsp" + "&nbsp&nbsp&nbsp&nbsp"
                    + `unknown` + "&nbsp&nbsp&nbsp&nbsp" + `unknown`
                ul.appendChild(li);

            }

        }

    }

    updateTopFive(){

        for (let i = 1; i < 6; i++) {
            let arr;
            let n;
            if (window.localStorage[i] != 'undefined') {
                arr = window.localStorage[i].split(",");
                n = parseInt(arr[1]);
                console.log("arr is");
                console.log(arr);
                console.log("n is");
                console.log(n);
            }

            if (window.localStorage[i] === 'undefined') {
                window.localStorage[i] = ["new_player", this.game.playerScore];
                break;
            } else if (n && this.game.playerScore > n) {
                for (let j = i + 1; j < 6; j++) {
                    window.localStorage[j] = window.localStorage[j - 1];
                }
                window.localStorage[i] = ["new_player", this.game.playerScore]
            }

        }


    }

    displayFinalScore(){
        
        const p1 = document.getElementById("life");
        p1.innerHTML = `Lives: ${this.game.playerlives}`;

        const p2 = document.getElementById("total-score");
        p2.innerHTML = `Score: ${this.game.playerScore}`;


        const div2 = document.getElementById("result-board");
        if (!div2) {

            let newDiv = document.createElement("div");
            newDiv.id = "result-board";
            document.body.append(newDiv);
            newDiv.style.backgroundColor = "#DAECC0";

            if(this.game.playerlives === 0){
                const p = document.createElement("p");
                newDiv.appendChild(p);
                p.innerHTML = "Game Over! Nice try!"
            } else {
                const p = document.createElement("p");
                newDiv.appendChild(p);
                p.innerHTML = "Congrats! You won!!"
            }

            const ul = document.createElement("ul");
            newDiv.appendChild(ul);
            ul.className = "result-board";

            const li1 = document.createElement("li");
            ul.appendChild(li1);
            li1.innerHTML = `Your final score is ${this.game.playerScore}`

            const li2 = document.createElement("li");
            ul.appendChild(li2);
            li2.innerHTML = `Click button to start over!`
        }

        let btn = document.getElementById('test');
        btn.innerHTML = "Restart from Level 1";

    }





}
