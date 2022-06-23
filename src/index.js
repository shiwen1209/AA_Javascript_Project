import Board from './scripts/board';
import Sound from './scripts/sound';
import GameView from './scripts/game_view';
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


    const gameView = new GameView(ctx)

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
            const begin = document.getElementById("game_background")
            begin.loop = true;
            begin.play();
            gameView.restart();
        }

        if (gameView.game.level === 0) { gameView.game.level += 1}
        let boardSize = 6;
        if(gameView.game.level > 10) {boardSize += 1}
        gameView.game.board = new Board(ctx, Level[gameView.game.level], boardSize);

    });



    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (gameView) {
            gameView.game.board.clickBoard(x, y);
        }
    })



    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (gameView) {
            gameView.game.board.hoverBoard(x, y);
        }
    })


    

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




 

    

