import Game from './scripts/game';
import Instruction from './scripts/instruction';


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const game = new Game(ctx);
    setInterval(function () {
        game.draw();
    }, 100)

    canvas.addEventListener("click", (e) =>{
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        game.board.tiles.forEach((tile) => {
            tile.clickTile(x, y);
            console.log(tile.color);
        })
    } )




});




 

    

