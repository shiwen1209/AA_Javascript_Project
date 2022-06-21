import Tile from "./tile";
import Circuit from "./circuit";

export default class Board {
    constructor(ctx){
        Board.STARTX = 300;
        Board.STARTY = 155;
        Board.SIZE = 7;    
        Board.DIRS = [[0, 1], [0, -1],[1, 0],[-1, 0]]

        this.circuitHash = {
            "blue": [[0, 1], [6, 2]], 
            "yellow": [[5, 2], [0, 4]],
            "red": [[6, 3], [1, 3]],
            "purple": [[1, 4], [6, 5]],
            "green": [[0, 5], [5, 5]]
        }

        this.colorStatus = {
            "blue": false, 
            "red": false,
            "yellow": false,
            "purple": false,
            "green": false
        }

        this.colorStacks = {
            "blue": [],
            "red": [],
            "yellow": [],
            "purple": [],
            "green": []
        }

        this.ctx = ctx;
        this.tiles = [];
        this.circuits = [];
        this.allObjects = [];
        this.grid = this.populateGrid();
        this.addObjects();
        this.clickBoard = this.clickBoard.bind(this);
        this.hoverBoard = this.hoverBoard.bind(this);
        this.wireConnected = this.wireConnected.bind(this);
        this.activeColor = null;
        this.currentObject = null;
        this.previousObject = null;
        this.draw()
    }   

    populateGrid(){
        let newArr = [];
        for(let i=0; i< Board.SIZE; i++){
            let subArr = []
            for(let j=0; j<Board.SIZE; j++){
                subArr.push(null);
            }
            newArr.push(subArr);
        }
        return newArr;
    }

    addCircuits(){
        Object.keys(this.circuitHash).forEach((color)=>
            this.circuitHash[color].forEach((pos)=>{
                let y = (pos[0] * Tile.LENGTH) + Board.STARTY;
                let x = (pos[1] * Tile.LENGTH) + Board.STARTX;
                let circuit = new Circuit(this.ctx, x, y, color);
                circuit.pos = pos;
                this.circuits.push(circuit);
                this.allObjects.push(circuit);
            })
        )
    }

    addTiles(){
        let circuit_poses = [];
        Object.keys(this.circuitHash).forEach((color)=>{
            this.circuitHash[color].forEach((pos)=>{
                circuit_poses.push(JSON.stringify(pos));
            })
        })
  
    
        let tile = new Tile(this.ctx, 0, 0);

        for(let i= 0; i < Board.SIZE; i++){
            for(let j= 0; j < Board.SIZE; j++){
                if(!circuit_poses.includes(JSON.stringify([i, j]))){
                    let y = (i * Tile.LENGTH) + Board.STARTY;
                    let x = (j * Tile.LENGTH) + Board.STARTX;
                    let tile = new Tile(this.ctx, x, y);
                    tile.pos = [i, j];
                    this.tiles.push(tile);
                    this.allObjects.push(tile);
                }

            }
        }

    }
    

    addObjects() {
        this.addTiles(); 
        this.addCircuits();// circuit must be added after tiles as circuits are drawn ontop of tiles
        this.allObjects.forEach((obj)=>{
            let [i, j] = obj.pos;
            this.grid[i][j] = obj;
        })   
    }

    draw(){
        this.allObjects.forEach((obj)=>{obj.draw()}
        )
    }

    clickBoard(x, y){
        let target = null;
    
        for(let i = 0; i < this.allObjects.length; i++){
            
            let obj = this.allObjects[i];
            if ((x > obj.x && x < (obj.x + Tile.LENGTH)) &&
                (y > obj.y && y < (obj.y + Tile.LENGTH))) {
                target = obj;
                break;  
            }
        }

        if(target != null && target.constructor === Circuit){
            console.log(this.activeColor);
            console.log(target.color);
            if (this.activeColor === Tile.DEFAULTCOLOR){
                this.activeColor = null;
            }
            else if (this.activeColor != target.color){
                this.activeColor = target.color;
                target.fillColor = target.color;
            } else if (this.activeColor === target.color){
                
                if (this.wireConnected(this.activeColor)) {
                    console.log(`${this.activeColor} connected!`)
                }
                console.log("win? :" + this.win());
                console.log(this.colorStatus);
                if(this.win()){
                    alert("You won!");}
                    this.activeColor = null;
            }    
        } else if (target != null && target.constructor === Tile) {
            this.activeColor = target.clickTile(this.activeColor);
            if (this.win()) {
                alert("You won!");
            }
        }

        console.log("active color now is" + this.activeColor);
    }

    hoverBoard(x, y){
        let target = null;
        for (let i = 0; i < this.allObjects.length; i++) {
            let obj = this.allObjects[i];
            if ((x > obj.x && x < (obj.x + Tile.LENGTH)) &&
                (y > obj.y && y < (obj.y + Tile.LENGTH))) {
                target = obj;
                break;
            }
        }

        if (target === null || target===this.currentObject) {
            return;
        }
        this.currentObject = target;

        // if(this.currentObject != null && this.previousObject != null){
        // // console.log("current object: " + this.currentObject.pos)
        // // console.log("previous object: " + this.previousObject.pos)
        // }
        if (target.constructor === Tile) {
            if (this.intercepted(target.pos, this.activeColor)){
                let target_color = target.fillColor;
                this.tiles.forEach((tile)=>{
                    if(tile.fillColor === target_color){
                        tile.fillColor = Tile.DEFAULTCOLOR;
                    }
                })
            }

            let sameColor = false;
            Board.DIRS.forEach((dir)=>{
                let x = target.pos[0] + dir[0];
                let y = target.pos[1] + dir[1];
                if(this.validPos([x,y]) && 
                this.grid[x][y].fillColor === this.activeColor){
                    sameColor = true;
                }
            })
            

            if (sameColor === true) { 

                let flipped = target.flip(this.activeColor);
                if(flipped && Object.keys(this.colorStacks).includes(this.activeColor)
                ){
                    this.colorStacks[this.activeColor].push(JSON.stringify(target.pos));
                    return;
                }



                if(target.fillColor === this.activeColor && target.fillColor != Tile.DEFAULTCOLOR){
                    console.log("hahahahah")
                    console.log(target.fillColor);
                    console.log(this.colorStacks);
                    let stack = this.colorStacks[this.activeColor];
                    if(stack.includes(JSON.stringify(target.pos))){
                        console.log("woooooo")
                        let i = stack.indexOf(JSON.stringify(target.pos));
                        let eliminate = stack.splice(i+1);
                        console.log("eliminate is" + eliminate);
                        eliminate.forEach((pos_str)=>{
                            let pos = JSON.parse(pos_str);
                            this.grid[pos[0]][pos[1]].flip("grey");
                        })

                    }
                

                }
            
            }


            
            
        }
    }


    wireConnected(color){
        console.log("wire color is " + color);
        let startPos = this.circuitHash[color][0];
        let endPos = this.circuitHash[color][1];
        if (this.searchCircuit(startPos, endPos)){
            this.colorStatus[color] = true;
            return true;
        } else {
            this.colorStatus[color] = false;
            return false;
        } ;
    }

    searchCircuit(startPos, endPos, visited = []){
        // console.log("hello");
        // console.log("start pos is " + startPos);
        // console.log("end pos is" + endPos);
        // console.log(Board.DIRS.length);
        let targetObj = this.grid[endPos[0]][endPos[1]];
        let sameColor = [];
        for (let i = 0; i < Board.DIRS.length; i++) {
            // console.log("i is " + i);
            let currentX = startPos[0] + Board.DIRS[i][0];
            let currentY = startPos[1] + Board.DIRS[i][1];  
            let currentObj = null;
            // console.log("dirs")
            // console.log(currentX, currentY)
            if (this.validPos([currentX, currentY])){
                currentObj = this.grid[currentX][currentY];
                if (currentObj.constructor === Circuit && 
                    currentObj.color === targetObj.color &&
                    currentObj.pos[0]=== endPos[0] &&
                    currentObj.pos[1]=== endPos[1]
                    ){
                        return true;
                    }
                else if (currentObj.constructor === Tile &&
                    currentObj.fillColor === targetObj.color) {
                    if (!visited.includes(JSON.stringify([currentX, currentY]))){
                        sameColor.push([currentX, currentY])};
                        visited.push(JSON.stringify([currentX, currentY]));
                }
        }}

        // console.log("samecolor")
        // console.log(sameColor)

        if (sameColor.length === 0){return false}
        
        let result = false;
        sameColor.forEach((pos)=>{
            if (this.searchCircuit(pos, endPos, visited)) { result = true }
        })
        return result
    }

    validPos(pos){
        if(pos[0] >= 0 && pos[0] < Board.SIZE &&
            pos[1] >= 0 && pos[1] < Board.SIZE)
            {return true} else {return false}
    }

    intercepted(pos, color){
        let currentObj = this.grid[pos[0]][pos[1]];
        if(currentObj.constructor === Tile && 
            currentObj.fillColor != Tile.DEFAULTCOLOR &&
            color != Tile.DEFAULTCOLOR &&
            color != null &&
            currentObj.fillColor != color){
            return true;
        }
        return false;
    }

    win(){
        let result = true;
        Object.keys(this.colorStatus).forEach((color)=>{
            if (!this.wireConnected(color)){result = false}
        }
        )
        return result;
    }
    

}