import Board from './scripts/board';
import Game from './scripts/game';
const Level = require("./scripts/level");



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const game = new Game(ctx);

    // let topFive = {};
    // let topFiveScores = Object.keys(topFive).sort((a,b)=> b-a);
    


    let gametimer = setInterval(function () {
        if (game.gameover()) {
            clearInterval(gametimer);
            ctx.clearRect(0, 0, 1600, 750);
            ctx.fillStyle = "#0E2650";
            ctx.fillRect(0, 0, 1600, 750);
            game.stars.draw();
            game.ship.draw();
            game.flame.draw();

            const lis = document.querySelectorAll('.game-status');
            const lis_arr = Array.from(lis);
            lis_arr.forEach((li) => { if (li) { li.remove() } })

            const texts = document.querySelectorAll('.game-text');
            const texts_arr = Array.from(texts);
            texts_arr.forEach((t) => { if (t) { t.remove() } })
            

            

            //set top5
            for(let i=1; i < 6; i++){
                let arr; 
                let n;
                if(window.localStorage[i] != 'undefined'){
                     arr = window.localStorage[i].split(",");
                    n = parseInt(arr[1]);}
                
                if (window.localStorage[i] === 'undefined'){
                    window.localStorage[i] = ["new_player", game.playerScore];
                    break;
                } else if (n && game.playerScore > n) {
                    for(let j = i + 1; j < 6; j++){
                        window.localStorage[j] = window.localStorage[j-1];
                    }
                    window.localStorage[i] = ["new_player", game.playerScore]
                }
                    
            }


            const div = document.getElementById("text-area")

            const h = document.createElement("h3");
            h.className = "top-five"
            h.innerHTML = "Top five players"
            div.appendChild(h)

            const ul = document.createElement("ul");
            ul.className = "top-five"
            div.appendChild(ul)

            for (let i = 1; i < 6; i++){
                if (window.localStorage[i] != undefined){
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
            clearInterval(gametimer);
 


        } else {
            game.draw()
        };
    }, 100)


    
    
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        game.board.clickBoard(x, y);
    })

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        game.board.hoverBoard(x, y);
    })


    let btn = document.getElementById('test');
    let instructions = document.querySelectorAll('.instruction-body')
    let title = document.getElementById('instruction-title')
    // console.log(instructions[0])
    // console.log(instructions.length)

    btn.addEventListener('click', function(e){
        btn.disabled = true; 
        btn.style.background = "grey";
        for(let i=0; i < instructions.length; i++){
            instructions[i].remove();
        }
        title.innerHTML = "Game Statistics";
        if (game.level === 0) { game.level += 1}
        let boardSize = 6;
        if(game.level > 10) {boardSize += 1}
        game.board = new Board(ctx, Level[game.level], boardSize)
        game.winStatus = false;
        game.loseStatus = false;
        game.addStats();

    });

    console.log(window.localStorage)

});




 

    

