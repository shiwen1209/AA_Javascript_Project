import Board from './scripts/board';
import Game from './scripts/game';
import Sound from './scripts/sound';
import GameOver from './scripts/gameover';
const Level = require("./scripts/level");



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // load all the sound 
    const tada_sound = new Sound("./src/sounds/tada.mp3");
    const end = new Sound("./src/sounds/game_end_background.mp3");
    const background_sound = new Sound("./src/sounds/game_background.mp3");
    const button_sound = new Sound("./src/sounds/button_sound.mp3");
    const connected_sound = new Sound("./src/sounds/connected.mp3");
    const timeup_sound = new Sound("./src/sounds/timeup.mp3");
    const switch_sound = new Sound("./src/sounds/switch.mp3");
    const intercept_sound = new Sound("./src/sounds/interception.mp3");
    const win_sound = new Sound("./src/sounds/win.mp3");

    
    const game = new Game(ctx);
    let gametimer = setInterval(function () {
        if (game.gameover()) {
            clearInterval(gametimer);
            const gameover = new GameOver(ctx, game);
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

    btn.addEventListener('click', function(e){
        btn.disabled = true; 
        btn.style.background = "grey";

        const button_sound = document.getElementById("button_sound")
        button_sound.play();

        if(btn.innerText === "Start Level 1"){
            const background_sound = document.getElementById("game_background")
            background_sound.loop = true;
            background_sound.play();
        }

        if (btn.innerText === "Restart from Level 1") {
            const background_sound = document.getElementById("game_background")
            background_sound.loop = true;
            background_sound.play();
            game = new Game(ctx);
        }

        if (game.level === 0) { game.level += 1}
        let boardSize = 6;
        if(game.level > 10) {boardSize += 1}
        game.board = new Board(ctx, Level[game.level], boardSize);

    });


    let sound_button = document.getElementById('sound');

    sound_button.addEventListener('click', function (e){
        const connected_sound = document.getElementById("connected")
        connected_sound.play();

        let  audio_els = Array.from(document.querySelectorAll("audio"));

        if(audio_els[0].muted === false){

                sound_button.children[0].remove();
                let newIcon = document.createElement("i");
                newIcon.className = "fa fa-volume-up";
                sound_button.appendChild(newIcon);

                audio_els.forEach((a) => {
                    a.muted = true;
                })
            } else {
                sound_button.children[0].remove();
                let newIcon = document.createElement("i");
                newIcon.className = "fa fa-volume-off";
                sound_button.appendChild(newIcon);

                audio_els.forEach((a) => {
                    a.muted = false;
                })
            }
        })

});




 

    

