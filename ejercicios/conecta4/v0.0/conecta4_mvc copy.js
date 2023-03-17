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
    let newBoard = initBoardView();
    return {
        play() {
            newBoard.createBoard();
            do {
                newBoard.showBoard();
                game.placeToken(newBoard);
                newBoard.showBoard();
                game.setFinish(true) ;
            } while (!game.isFinish());
        }
    }
  

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
            let TURN_X = 'X';
            let TURN_Y = '0';
            return turn === 0 ? TURN_X : TURN_Y
        },
        placeToken(thisBoard){
            let innerBoard = thisBoard.getBoard();
            let targetCol;
            console.writeln(`Turno para: ${this.getTurn()}`)
            targetCol = readTarget(`Columna destino`) - 1 ;
            console.writeln(`targetcol: ${targetCol}`)
            for (let i = innerBoard.length; i <= innerBoard.length && i > 0 ; i--) {
              if ( innerBoard[targetCol][i] === thisBoard.getTokenEmpty() ){
                innerBoard[targetCol][i] = this.getTurn();
              }
                
            }

            function readTarget(title){
                let error;
                let targetCol
                do {
                    targetCol = console.readNumber(`${title}:`);
                    error = targetCol > innerBoard[0].length;
                  if (error) {
                    console.writeln(`La columna destino tiene que ser en 1 y ${innerBoard[0].length}`)
                  }
                } while (error);
                return targetCol;
            }
        },



    }

}

// function initBoardView() {
//     let board = [];
//     const ROWS = 6;
//     const COLUMNS = 7;
//     const TOKEN_EMPTY = ` `;
//     return {
//         createBoard() {
//             for (let i = 0; i < ROWS; i++) {
//                 board[i] = [];
//                 for (let j = 0; j < COLUMNS; j++) {
//                     board[i][j] = TOKEN_EMPTY;
//                 }
//             }
//         },
//         getBoard() {
//             return board;
//         },
//         setBoard(newBoard){
//             board = newBoard;
//         },

//         showBoard() {
//             const HORIZONTAL_SEPARTOR = `-----------------------------`;
//             const VERTICAL_SEPARATOR = `|`;
//             let msg = ``;
//             for (let i = 0; i < board.length; i++) {
//                 msg += `${HORIZONTAL_SEPARTOR}\n`;
//                 for (let j = 0; j < board[i].length; j++) {
//                     msg += `${VERTICAL_SEPARATOR} ${board[i][j]} `;
//                 }
//                 msg += `${VERTICAL_SEPARATOR}\n`;
//             }
//             msg += `${HORIZONTAL_SEPARTOR}\n`;
//             console.writeln(msg)
//         },
//         getTokenEmpty(){
//             return TOKEN_EMPTY;
//         },
//         getColumns(){
//             return COLUMNS;
//         },
//         getRows(){
//             return ROWS;
//         }
//     }
// }



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
