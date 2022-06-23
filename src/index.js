import Board from './scripts/board';
import Game from './scripts/game';
import Sound from './scripts/sound';
const Level = require("./scripts/level");



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tada_sound = new Sound("./src/sounds/tada.mp3");
    tada_sound.sound.id = "tada";
    const end = new Sound("./src/sounds/game_end_background.mp3");
    end.sound.id = "end";
    const background_sound = new Sound("./src/sounds/game_background.mp3");
    background_sound.sound.id = "background";
    const button_sound = new Sound("./src/sounds/button.mp3");
    button_sound.sound.id = "button";
    const connected_sound = new Sound("./src/sounds/connected.mp3");
    connected_sound.sound.id = "connected";
    const timeup_sound = new Sound("./src/sounds/timeup.mp3");
    timeup_sound.sound.id = "timeup";
    const switch_sound = new Sound("./src/sounds/switch.mp3");
    switch_sound.sound.id = "switch";
    // const connect_sound = new Sound("./src/sounds/connect.mp3");
    // connect_sound
    const intercept_sound = new Sound("./src/sounds/interception.mp3");
    intercept_sound.sound.id = "intercepted";
    const win_sound = new Sound("./src/sounds/win.mp3");
    win_sound.sound.id = "win";


    const game = new Game(ctx);

    let gametimer = setInterval(function () {
        if (game.gameover()) {

            const begin = document.getElementById("background_sound")
            begin.loop = false;
            begin.pause();

            // const end = new Sound("./src/sounds/game_end_background.mp3")
            end.sound.loop = true;
            end.play();

            clearInterval(gametimer);

            let gameEndTimer = setInterval(()=>{
                ctx.clearRect(0, 0, 1600, 750);
                ctx.fillStyle = "#0E2650";
                ctx.fillRect(0, 0, 1600, 750);
                game.stars.draw();
                game.ship.draw();
                game.flame.draw();
            }, 100)


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
                    n = parseInt(arr[1]);
                    console.log("arr is");
                    console.log(arr);
                    console.log("n is" );
                    console.log(n);
                }
                
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
            // clearInterval(gametimer);
 


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
  

    btn.addEventListener('click', function(e){
        btn.disabled = true; 
        btn.style.background = "grey";

        if(btn.innerText === "Start level 1"){
            // const background_sound = new Sound("./src/sounds/game_background.mp3")
            background_sound.sound.id = "background_sound"
            background_sound.sound.loop = true;
            background_sound.play();
        }


        for(let i=0; i < instructions.length; i++){
            instructions[i].remove();
        }
        title.innerHTML = "Game Statistics";

      
        // const button_sound = new Sound("./src/sounds/button.mp3")
        button_sound.play();


        if (game.level === 0) { game.level += 1}
        let boardSize = 6;
        if(game.level > 10) {boardSize += 1}
        game.board = new Board(ctx, Level[game.level], boardSize)
        // game.winStatus = false;
        // game.loseStatus = false;
        // game.addStats();

    });


    let sound_button = document.getElementById('sound');
    sound_button.addEventListener('click', function (e){
        // const connected_sound = new Sound("./src/sounds/connected.mp3")
        connected_sound.play();

        let  audio_els = Array.from(document.querySelectorAll("audio"));

        console.log(audio_els)


        if(audio_els[0].muted === false){

                sound_button.children[0].remove();
                let newIcon = document.createElement("i");
                newIcon.className = "fa fa-volume-up";
                sound_button.appendChild(newIcon);


                audio_els.forEach((a) => {
                    a.muted = true;
                    // a.pause();
                })

            } else {

                sound_button.children[0].remove();
                let newIcon = document.createElement("i");
                newIcon.className = "fa fa-volume-off";
                sound_button.appendChild(newIcon);

                audio_els.forEach((a) => {
                    a.muted = false;
                    // a.play();
                })
            }
        })



});




 

    

