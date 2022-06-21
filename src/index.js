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
    let instruction = document.getElementById('instruction')

    btn.addEventListener('click', function(e){
        instruction.innerHTML = ""
        if (game.level === 0) { game.level += 1}
        game.board = new Board(ctx, Level[game.level])
        game.winStatus = false;
        

    });

});




 

    

