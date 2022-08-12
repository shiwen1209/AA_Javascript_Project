# Space Rescue
Space Rescue is a line puzzle game, with spaceship and the space in the background. It is a single player game, it has 10 levels. Player has 3 lives

https://user-images.githubusercontent.com/39010644/184063729-e83dad05-e708-4515-93a1-a075633f8d9d.mov

The game is easily scalable. Many more levels can be added with little effort and the board can be randomized to improve playability

## Technologies Used
Space Rescue was built using the following technologies:
- Canvas API to render game background, board and animations
- Webpack and Babel to bundle and transpile the source JavaScript code
- npm to manage project dependencies
- Sass to bring variables to stylesheets


## Features
### Game Board functionality: 
1. If player click a colored circle for the first time, the color of the circle will become the activie color
2. Player subsequently hovers the mouse over the tiles on the board, tiles will change color to the active color
3. If the mouse hover over a tile that already has the same as the activie color, the tile will change back to its default color
4. If two colors intercept each other on a tile, all tiles with the previous color on the tile will disappear
5. Once a same colored circles are connected, this wire connection is completed
6. Once all pairs of colored circles are connected, player pass the level

```js
//game.js
export default class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.stars = new Star(this.ctx);
        this.ship = new Ship(this.ctx);
        this.flame = new Flame(this.ctx);
        this.board = new Board(this.ctx, Level[this.level]);
        this.level = 0;
        this.draw();
        this.playerScore = 0;
        this.playerlives = 3;
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
    
    gameWon(){
        if(this.board.win()){
            const tada_sound = document.getElementById("tada")
            tada_sound.play();

            this.playerScore += this.board.finalScore();
            this.enableButton();

            this.level += 1;
            if(this.level <= 10){
                const btn = document.getElementById('test');
                btn.innerText = `Continue to Level ${this.level}`;
            } 

        }
    }

    gameLost(){
        if(this.board.lost()){
            this.playerlives -= 1;
            const btn = document.getElementById('test');
            btn.innerText = `Restart this level`;

            const timeup_sound = document.getElementById("timeup")
            timeup_sound.play();

            this.enableButton();
        }
    }

    gameover(){
        if(this.playerlives === 0 || this.level > 10){
            return true
        } else {return false}
    }
    ...
   }

```

### Game Progression functionality
1. Player can pass a level if they connect all the circles in the allotted time defined in the timer
2. Player can lose a game if they fail to connect all the circles in the allotted time defined in the timer
3. Scores for each level are determined based on how quickly player can connect all the wires. Bonus points are added if player completes the level under the alotted time
4. Player can proceed to the next level (up to level 10) if they pass the current level. They can retry if they failed the current level, however only have 3 chances before the game is over
5. Once a player passes all 10 levels or lost all three lives before level 10, the game is over
6. Game statistics and scores are updated, stored and displayed for every level and final reults are displayed at the end of the game

## Upcoming Features
- Randomized board for every level to improve playablility
- Top five player board and ability for user input
- Accessibility feature 
