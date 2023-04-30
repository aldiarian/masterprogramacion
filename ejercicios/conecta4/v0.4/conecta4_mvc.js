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
};

class GameView {

    #game;
    #boardView;

    constructor(game){
        this.#game = game;
        this.#boardView = new BoardView(this.#game) ;
    }
    play(){
        do {
            this.#playGame()
        } while (this.#isResumed());
    }
    #playGame(){
        let isfinish = true;
        console.writeln(Message.TITLE.writeln());
        do {
            //mostrar tablero
            this.#boardView.write()
            //mostrar el turno
            //pedir ficha 
        } while (!isfinish);
        // si hay ganador o empate enseñar mensaje
      
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

    isValid(){
        return Coordinate.#isColValid(this.getColumn()) && Coordinate.#isRowValid(this.getRow())
    }
    
    static #isColValid(col){
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
    getTurnActive(){
        return this.#turnActive
    }

}
class TurnView {
    constructor(){
    }
}

class Board{
    
    #boardPanel;

    constructor(){
        this.#boardPanel = [];
        this.initBoard();
    }
    initBoard(){
        for (let i = 0; i < Coordinate.NUM_ROWS; i++) {
            this.#boardPanel[i] = [];
            for (let j = 0; j < Coordinate.NUM_COLS; j++) {
                this.#boardPanel[i][j] = Color.NULL;
            }
        }
        console.writeln('board' + this.#boardPanel)
    }
    getColor(coord){
        return  this.#boardPanel[coord.getRow()][coord.getColumn];
    }

}
class BoardView{
    #game;
    constructor(game){
        this.#game = game
    }
    write(){
        const HORIZONTAL_SEPARTOR = `-----------------------------`;
        const VERTICAL_SEPARATOR = `|`;
        let msg = ``;
        for (let i = 0; i < Coordinate.NUM_ROWS; i++) {
            msg += `${HORIZONTAL_SEPARTOR}\n`;
            for (let j = 0; j < Coordinate.NUM_COLS; j++) {
                msg += `${VERTICAL_SEPARATOR} ${this.#game.getColor(new Coordinate(i,j))}`;
            }
            msg += `${VERTICAL_SEPARATOR}\n`;
        }
        msg += `${HORIZONTAL_SEPARTOR}\n`;
        console.writeln(msg)
    }
}

class Color {
    static RED = "R";
    static YELLOW = "Y";
    static NULL = ` `;
    constructor(){

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