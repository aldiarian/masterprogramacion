const { Console } = require("../console");
const console = new Console();

conectaView().start();

function conectaView() {
    const askContinueView = initAskQuestionYesNoView(`¿Quieres jugar otra partida?`);
    return {
        start() {
            do {
                initGameView().play()
                askContinueView.ask();
            } while (askContinueView.isYes());
        }
    }

}


function initGameView(){
    let game = initGame();
    game.initBoard();
    return{
        play(){
            game.showBoardView();
        }
    }
}

function initGame(){
    let turn = '';
    let board = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;

   return{
    initBoard(){
        for (let i = 0; i < ROWS; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
              board[i][j] = TOKEN_EMPTY;
            }
          }
    },
    showBoardView(){
        const HORIZONTAL_SEPARTOR = `-----------------------------`;
        const VERTICAL_SEPARATOR = `|`;
        let msg = ``;
        for (let i = 0; i < board.length; i++) {
          msg += `${HORIZONTAL_SEPARTOR}\n`;
          for (let j = 0; j < board[i].length; j++) {
            msg += `${VERTICAL_SEPARATOR} ${board[i][j]} `;
          }
          msg += `${VERTICAL_SEPARATOR}\n`;
        }
        msg += `${HORIZONTAL_SEPARTOR}\n`;
  
        console.writeln(msg)
    }
   }

}




function player(){

}

function turn(){
    
}
function turnView(){

}

function initAskQuestionYesNoView(question) {
    let answer = ``;
    return {
        ask() {
            let error = ``;
            do {
                answer = console.readString(question);
                error = !this.isYes() && !this.isNo();
                if (error) console.writeln(`Por favor responda "si" or "no".`)
            } while (error);
        },
        isYes() {
            return answer == 'si'
        },
        isNo() {
            return answer == 'no'
        }
    }
}
