import Board from './scripts/board';
import Game from './scripts/game';
const Level = require("./scripts/level");



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const game = new Game(ctx);
    setInterval(function () {
        game.draw();
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
    // console.log(btn)
    let instructions = document.querySelectorAll('.instruction-body')

    let title = document.getElementById('instruction-title')
    console.log(instructions[0])
    console.log(instructions.length)

    btn.addEventListener('click', function(e){
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

});




 

    

