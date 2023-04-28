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
};

class GameView {

    #game;

    constructor(game){
        this.#game = game;
    }
    play(){
        do {
            this.#playGame()
        } while (this.#isResumed());
    }
    #playGame(){
        console.writeln('he jugao');
    }
    #isResumed(){
        let yesNoDialog= new YesNoDialog();
        yesNoDialog.ask(Message.RESUME.getString());
        return yesNoDialog.isYes();
    }

};

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
    constructor(){
    }

}
class BoardView{
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