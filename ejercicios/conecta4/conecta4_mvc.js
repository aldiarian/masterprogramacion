const { Console } = require("../console");
const console = new Console();

initConectaView().start();

function initConectaView() {
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


function initGameView() {
    let game = initGame();
    let board = initBoardView();
    return {
        play() {
            board.createBoard();
            do {
                board.showBoard();
                game.setFinish(true) ;
            } while (!game.isFinish());
        }
    }
    function getTurn() {
        let TURN_X = 'X';
        let TURN_Y = 'Y';
        return game.turn === 0 ? TURN_X : TURN_Y
    };
  
    
}

function initGame() {
    let turn = 0;
    let finish = false;
    return {
        play() {
        },
        isFinish() {
            return finish == true;
        },
        setFinish(value){
            finish = value;
        },
        getTurn(){
            return turn;
        }

    }

}

function initBoardView() {
    let board = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
    return {
        createBoard() {
            for (let i = 0; i < ROWS; i++) {
                board[i] = [];
                for (let j = 0; j < COLUMNS; j++) {
                    board[i][j] = TOKEN_EMPTY;
                }
            }
        },
        getBoard() {
            return board;
        },

        saluda(){
            return console.writeln('hola')
        },
        showBoard() {
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



//goal
function isWinner() {

}

function isDiagonal() {

}
function isVertical() {

}
function isHorizontal() {

}


function player() {

}

function turn() {

}
function turnView() {

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
