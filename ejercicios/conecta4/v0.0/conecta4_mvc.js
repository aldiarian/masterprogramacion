const { Console } = require("../../console");
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
    return {
        play() {
            game.createBoard();
            do {
                game.nextTurn();
                game.showBoard();
                game.placeToken();
            } while (!game.isFinish());
        }
    }
}




function initGame() {
    let board = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
    let turn = 0;
    let finish = false;
    let coordinates = initCoordinates()
    return {
        play() {
        },
        isFinish() {
            return finish == true;
        },
        setFinish(value) {
            finish = value;
        },
        getTurn() {
            let TURN_X = 'X';
            let TURN_Y = '0';
            return turn === 0 ? TURN_X : TURN_Y
        },
        nextTurn() {
            turn === 0 ? turn = 1 : turn = 0;
        },
        placeToken() {
            let targetCol;
            let targetSet = false;
            let error = true;
            console.writeln(`Turno para: ${this.getTurn()}`)
            do{
                targetCol = this.readTarget(`Columna destino`) - 1;
                for (let i = ROWS-1; !targetSet && ( i <= ROWS && i >= 0); i--) {
                    if (board[i][targetCol] === TOKEN_EMPTY) {
                        board[i][targetCol] = this.getTurn();
                        targetSet = true;
                        error = false;
                        coordinates.col = targetCol;
                        coordinates.row = i;
                    } else {
                        if (i <= 0){
                            console.writeln('columna ya está llena, elija otra');
                        }
                    }
                }
            } while (error);

          
            this.checkIsWinner();
            

            
        },
        checkHorizontal() {
            let textBox = []
            let turn = this.getTurn();
            let template = [turn, turn, turn, turn];
            console.writeln( `en row:${coordinates.row} col:${coordinates.col} `)
            console.writeln( `hay ${board[coordinates.row][coordinates.col]}`)
            // // left
            // for (let i = coordinates.col; i < template.length; i++) {
            //     const element = array[i];
                
            // }

        },

        checkIsWinner(){
            console.writeln(`comprobar si hay cuatro en raya`)
            this.checkHorizontal();
        },

        readTarget(title) {
            let error;
            let targetCol
            do {
                targetCol = console.readNumber(`${title}:`);
                error = targetCol > board[0].length;
                if (error) {
                    console.writeln(`La columna destino tiene que ser en 1 y ${board[0].length}`)
                }
            } while (error);
            return targetCol;
        },

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
        setBoard(newBoard) {
            board = newBoard;
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
        },

    }

}

function initCoordinates(){
    return { col: 0, row: 0 }
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
