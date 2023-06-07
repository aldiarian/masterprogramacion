const { Console } = require("../../console");
const console = new Console();




class Conect4 {
    #game;
    #gameView;

    constructor(){
        this.#game = new Game();
        this.#gameView = new GameView(this.#game)
    }

    play(){
       this.#gameView.play();
    }
};


class Game {

    #board;
    #turn;

    constructor(){
        this.#board = new Board();
        this.#turn = new Turn();
    
    }
    getColor(coord){
        return this.#board.getColor(coord);
    }
    getColorActive(){
        return this.#turn.getColorActive();
    }
    isComplete(col){
        return this.#board.isComplete(col);
    }
    isFinished(){
        return this.#board.isFinished();
    }
    isWinner() {
        return this.#board.isWinner();
    }
    dropToken(col){
        this.#board.dropToken(col, this.#turn.getColorActive());
        if (!this.#board.isFinished()) {
            this.#turn.next();
        }
    }
};

class GameView {

    #game;
    #boardView;
    #turnView;

    constructor(game){
        this.#game = game;
        this.#boardView = new BoardView(this.#game) ;
        this.#turnView = new TurnView(this.#game);
    }
    play(){
        do {
            this.#playGame()
        } while (this.#isResumed());
    }
    #playGame(){
        Message.TITLE.writeln();
        this.#boardView.write()
        do {
            this.#turnView.play();
            this.#boardView.write()
        } while (!this.#game.isFinished());
        this.#turnView.writeResult();
      
    }
    #isResumed(){
        let yesNoDialog= new YesNoDialog();
        yesNoDialog.ask(Message.RESUME.getString());
        return yesNoDialog.isYes();
    }

};
class ClosedInterval {
    #min;
    #max;

    constructor(min, max) {
        this.#min = min;
        this.#max = max;
    }

    isIncluded(value) {
        return this.#min <= value && value <= this.#max;
    }

}

class Coordinate {
    static NUM_ROWS = 6;
    static NUM_COLS = 7;
    static #ROWS = new ClosedInterval(0, Coordinate.NUM_ROWS - 1);
    static #COLS = new ClosedInterval(0, Coordinate.NUM_COLS - 1);

    #row;
    #column;
    
    constructor(row, column) {
        this.#row = row;
        this.#column = column;
    };

    shifted(coordinate) {
        return new Coordinate(this.#row + coordinate.#row,
            this.#column + coordinate.#column);
    }

    isValid(){
        return Coordinate.isColValid(this.getColumn()) && Coordinate.#isRowValid(this.getRow())
    }
    
    static isColValid(col){
        return Coordinate.#COLS.isIncluded(col)
    }
    static #isRowValid(row){
        return Coordinate.#ROWS.isIncluded(row)
    }
    getRow(){
        return this.#row
    }
    getColumn() {
        return this.#column;
    }
    toString(){
        return `Coordinate [row=${this.#row} column=${this.#column}]`;
    }

};

class Line {
    
    static LENGHT = 4;
    #origin;
    #coordinates;
    #oppositeDirection;

    constructor(coordinate){
        this.#origin = coordinate;
    }

    set(direction){
        this.#coordinates = [this.#origin];
        for (let i = 1; i < Line.LENGHT; i++) {
            this.#coordinates[i] = this.#coordinates[i -1].shifted(Direction.getCoordinate());
        }
        this.#oppositeDirection = direction.getOpposite() ;
    }
    shift(){
        for (let i = 0; i < Line.LENGHT; i++) {
            this.#coordinates[i] = this.coordinate[i].shifted(this.#oppositeDirection.getCoordinate())
        }
    }
    
    getCoordinates(){
        return this.#coordinates;
    }

}
class Direction{
    static NORTH = new Direction(1, 0);
    static NORTH_EAST = new Direction(1, 1);
    static EAST = new Direction(0, 1);
    static SOUTH_EAST = new Direction(-1, 1);
    static SOUTH = new Direction(-1, 0);
    static SOUTH_WEST = new Direction(-1, -1);
    static WEST = new Direction(0, -1);
    static NORTH_WEST = new Direction(1, -1);

    #coordinate

    constructor(row, column){
        this.#coordinate = new Coordinate(row, column)
    }
    
    getCoordinate(){ 
        return this.#coordinate
    }
    
    static values() {
        return [Direction.NORTH, Direction.NORTH_EAST, Direction.EAST, Direction.SOUTH_EAST,
        Direction.SOUTH, Direction.SOUTH_WEST, Direction.WEST, Direction.NORTH_WEST];
    }

    getOpposite() {
        for (let direction of Direction.values()) {
            if (direction.#coordinate.shifted(this.#coordinate).equals(Coordinate.ORIGIN)) {
                return direction;
            }
        }
        return null;
    }

}




class Turn {

    #turnActive;

    constructor(){
        this.reset();
    }

    reset(){
        this.#turnActive = 0;
    }
    next(){
        this.#turnActive === 0 ? this.#turnActive = 1 : this.#turnActive = 0;
    }
    getColorActive(){
        return  Color.values()[this.#turnActive];
    }

}
class TurnView {
    #game
    constructor(game){
        this.#game = game;
    }

    play(){
        let valid;
        let column;
        do {
            console.writeln(`${Message.TURN.getString()}${this.#game.getColorActive()}`)
            column = console.readString(Message.ENTER_COLUMN.write()) -1;
            valid = Coordinate.isColValid(column);
            if (!valid){
                Message.INVALID_COLUMN.writeln();
            } else {
                valid = !this.#game.isComplete(column);
                if (!valid){
                    Message.COMPLETED_COLUMN.writeln();
                }
            }
        } while (!valid);
        this.#game.dropToken(column);
    }
    writeResult() {
        if (this.#game.isWinner()){
            let message = Message.WINNER.getString();
            message = message.replace(`#color`, this.#game.getColorActive().toString())
            console.writeln( message )
        }else{
            console.writeln(Message.TIED.write())
        }
    }
}

class Board{
    
    #colors;
    #lastDrop;

    constructor() {
        this.#colors = [];
        for (let i = 0; i < Coordinate.NUM_ROWS; i++) {
            this.#colors[i] = [];
        }
        this.reset();
    }

    reset() {
        for (let i = 0; i < Coordinate.NUM_ROWS; i++) {
            for (let j = 0; j < Coordinate.NUM_COLS; j++) {
                this.#colors[i][j] = Color.NULL;
            }
        }
        // ------[fila][columna] --------------
        // for (let i = 0; i < Coordinate.NUM_ROWS; i++) {
        //     for (let j = 0; j < Coordinate.NUM_COLS; j++) {
        //         this.#colors[i][j] = Color.RED.toString()[0];
        //     }
        // }
        // this.#colors[5][5] = Color.NULL;
        // this.#colors[5][6] = Color.NULL;
    }
    getColor(coordinate) {
        return this.#colors[coordinate.getRow()][coordinate.getColumn()];
    }
    isComplete(col){
        if (this.isEmpty( new Coordinate( Coordinate.NUM_ROWS - 1, col) )){
            return false
        }
        return true
    }
    isCompleteBoard(){
        let iscomp ;
        for (let i = 0; iscomp && i < Coordinate.NUM_COLS; i++) {
            iscomp = this.isComplete(i) ?  true : false;
        }
        return iscomp;
    }
    isOccupied(coordinate, color) {
        return this.getColor(coordinate) == color;
    }
    isEmpty(coordinate) {
        return this.isOccupied(coordinate, Color.NULL);
    }
    isFinished(){
        return this.isCompleteBoard() || this.isWinner();
    }
    isWinner(){
        let line = new Line(this.#lastDrop);
        for (let direction of Direction.values().splice(0,3)) {
            line.set(direction);
            for (let i = 0; i < Line.LENGHT; i++) {
               if(this.isConnetc4(line)){
                    return true
               }
               line.shift();
            }
            
        }
    }
    dropToken(col, color){
        this.#lastDrop = new Coordinate(0, col)
        console.writeln( `ficha puesta en la fila ${this.#lastDrop.getRow() +1} col ${this.#lastDrop.getColumn() +1} `)
        while (!this.isEmpty(this.#lastDrop)) {
            this.#lastDrop = this.#lastDrop.shifted(Direction.NORTH.getCoordinate())
        }
        this.#colors[this.#lastDrop.getRow()][this.#lastDrop.getColumn()] = color.toString()[0];
    }

}
class BoardView{
    #game;
    constructor(game){
        this.#game = game
    }
    write(){
        this.#writeHorizontal();
        for (let i = Coordinate.NUM_ROWS -1; i >=0 ; i--) {
            Message.VERTICAL_SEPARATOR.write();
            for (let j = 0; j < Coordinate.NUM_COLS; j++) {
                console.write(` ${this.#game.getColor(new Coordinate(i,j)) } `);
                Message.VERTICAL_SEPARATOR.write();
            }
            console.writeln();
        }
        this.#writeHorizontal();
    }
    #writeHorizontal(){
        for (let i = 0; i < 4 * Coordinate.NUM_COLS; i++) {
            Message.HORIZONTAL_SEPARTOR.write();
        }
        Message.HORIZONTAL_SEPARTOR.writeln();
    }
}

class Color {
    static RED = new Color("RED");
    static YELLOW = new Color("YELLOW");
    static NULL = new Color(` `);
    #stirng;
    
    constructor(string){
        this.#stirng = string;
    }
    
    static values(){
        return [Color.RED, Color.YELLOW];
    }

    static get(num){
        return Color.values()[num];
    }

    toString(){
        return this.#stirng;
    }

}


class YesNoDialog {
    static #AFFIRMATIVE = 'y';
    static #NEGATIVE = 'n';
    static #SUFFIX = `? (${YesNoDialog.#AFFIRMATIVE}/${YesNoDialog.#NEGATIVE}):`;
    static #ERROR = `The value must be "${YesNoDialog.#AFFIRMATIVE}" or "${YesNoDialog.#NEGATIVE}")`;
    #answer;

    constructor(){
    };
    
    ask(question) {
        let error;
        do {
            this.#answer = console.readString(question + ` ${YesNoDialog.#SUFFIX}`);
            error = !this.isYes() && !this.isNo();
            if (error) console.writeln(YesNoDialog.#ERROR);
        } while (error);
    }
    isYes() {
        return this.#answerToLower() == YesNoDialog.#AFFIRMATIVE;
    }
    isNo() {
        return this.#answerToLower() == YesNoDialog.#NEGATIVE;
    }
    #answerToLower(){
        return this.#answer.toLowerCase()
    }
};

class Message{
    static TITLE = new Message(`--- CONNECT 4 ---`);
    static RESUME = new Message(`Do you want to continue`);
    static ENTER_COLUMN = new Message(`Enter a column to drop a token: `);
    static INVALID_COLUMN = new Message(`Invalid columnn!!! Values [1-7]`);
    static COMPLETED_COLUMN = new Message(`Invalid column!!! It's completed`);
    static TURN = new Message(`Turn: `);
    static HORIZONTAL_SEPARTOR =  new Message(`-`);
    static VERTICAL_SEPARATOR =  new Message(`|`);
    static TIED = new Message(`TIED!!!`);
    static WINNER = new Message(`#color a ganao`)
    
    #string;

    constructor(string){
        this.#string = string;
    }

    write() {
        console.write(this.#string);
    }

    writeln() {
        console.writeln(this.#string);
    }

    getString() {
        return this.#string;
    }

}

new Conect4().play();