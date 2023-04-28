const { Console } = require("../../console");
const console = new Console();

initConectaView().play();

function initConectaView() {
    const askContinueView = initAskQuestionYesNoView(`¿Quieres jugar otra partida?`);
    return {
        play() {
            do {
                initGameView().play()
                askContinueView.ask();
            } while (askContinueView.isYes());
        }
    }

}

function initGameView(){
    let turnView = initTurnView();
    let game = initGame();
    let boardView = initBoardView();

    return{
        play() {
            do {
                turnView.nextTurn();
                turnView.showActiveTurn()
                boardView.showBoard();
                boardView.placeToken(turnView.getTurn());
                this.isWinner();
            } while (!game.isFinish());
            boardView.showBoard();
            boardView.showWinner(turnView.getTurn(), game.getFinish().position)
        },
        isWinner() {
            let test = boardView.templateTest(turnView.getTurn());
            if (boardView.checkHorizontal(test)) {
                console.writeln('es horizontal')
                game.setFinish(true, 'horizontal');
            }
            if (boardView.checkVertical(test)) {
                game.setFinish(true, 'vertical');
            }
            if (boardView.checkCross(test)) {
                game.setFinish(true, 'diagonal');
            }
        },
    }
}
function initGame(){
    let PLAYERS = initPlayers();
    let finish = {
        value : false,
        position: ''
    };
    return{
        isFinish() {
            return finish.value == true;
        },

        getFinish(){
            return finish;
        },
        setFinish(value, position) {
            finish.value = value;
            finish.position = position ;
        },
        
    }
}


function initBoardView(){
    let board = initBoard();
    let boardPanel = board.getBoard()
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
    let coordinates = initCoordinates();
    return{
        showBoard(){
            const HORIZONTAL_SEPARTOR = `-----------------------------`;
            const VERTICAL_SEPARATOR = `|`;
            let msg = ``;
            for (let i = 0; i < boardPanel.length; i++) {
                msg += `${HORIZONTAL_SEPARTOR}\n`;
                for (let j = 0; j < boardPanel[i].length; j++) {
                    msg += `${VERTICAL_SEPARATOR} ${boardPanel[i][j]} `;
                }
                msg += `${VERTICAL_SEPARATOR}\n`;
            }
            msg += `${HORIZONTAL_SEPARTOR}\n`;
            console.writeln(msg)
        },
        placeToken(turn) {
            let targetCol;
            let targetSet = false;
            let error = true;
            do{
                targetCol = this.readTarget(`Columna destino`) ;
                for (let i = ROWS-1; !targetSet && ( i <= ROWS && i >= 0); i--) {
                    if (boardPanel[i][targetCol] === TOKEN_EMPTY) {
                        boardPanel[i][targetCol] = initPlayersView().getPlayerActive(turn);
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
            console.writeln(this.showBoard())
        },
        readTarget(title) {
            let error;
            let targetCol
            do {
                targetCol = console.readNumber(`${title}:`);
                error = targetCol > boardPanel[0].length;
                if (error) {
                    console.writeln(`La columna destino tiene que ser en 1 y ${boardPanel[0].length}`)
                }
            } while (error);
            return targetCol - 1;
        },

        checkCross(test) {
            let isRightTop, isLeftTop, isLeftBottom, isRightBottom = false;

            if (coordinates.row > 2 && coordinates.col > 3) {
                // console.writeln(`RightTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row - i][coordinates.col - i];
                }
                isRightTop = test.box.toString() == test.template.toString();
            }
            if (coordinates.row > 2 && coordinates.col < 4) {
                // console.writeln(`LeftTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row - i][coordinates.col + i];
                }
                isLeftTop =  test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col < 4) {
                // console.writeln(`LeftBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row + i][coordinates.col + i];
                }
                isLeftBottom =  test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col > 2) {
                // console.writeln(`RightBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row + i][coordinates.col - i];
                }
                isRightBottom = test.box.toString() == test.template.toString();
            }

            return isRightTop || isLeftTop || isLeftBottom || isRightBottom

        },

        checkHorizontal(test) {
                
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row][ coordinates.col - i];
                }
                console.writeln(` comparao ${test.box.toString()} ${test.template.toString()}`)
                let isLineRight = test.box.toString() == test.template.toString();

                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row][coordinates.col + i];
                }
                let isLineLeft = test.box.toString() == test.template.toString();
                
                return isLineRight || isLineLeft; 
                
        },

        checkVertical(test) {
            if (coordinates.row <= 2) {
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = boardPanel[coordinates.row + i][coordinates.col];
                }
            }
            return test.box.toString() == test.template.toString();
        },

        templateTest(turn){
            let activeTurn = initPlayersView().getPlayerActive(turn);
            return{
                box: [],
                template:[activeTurn, activeTurn, activeTurn, activeTurn],
            }
        },
        showWinner(turn, position){
            console.writeln(`Gana ${initPlayersView().getPlayerActive(turn)} en ${position}`)
        }
    }
}
function initBoard() {
    let boardPanel = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
  
    createBoard();
    
    return {
        getBoard() {
            return boardPanel;
        },
    }
    
    function createBoard() {
        for (let i = 0; i < ROWS; i++) {
            boardPanel[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                boardPanel[i][j] = TOKEN_EMPTY;
            }
        }
        //  boardPanel = [
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "0", TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "X", "0", TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "X", "X", TOKEN_EMPTY, TOKEN_EMPTY]
        // ]
    }

}

function initCoordinates(){
    return { col: 0, row: 0 }
}


function initTurnView(){
    let turn = initTurn()
    return{
        getTurn(){
            return turn;
        },
        nextTurn(){
            turn === 0 ? turn = 1 : turn = 0;
        },
        showActiveTurn(){
            console.writeln(`Turno para ${initPlayersView().getPlayerActive(this.getTurn())}`)
        }
    }
}
function initTurn(){
    let turn = 0;
}


function initPlayersView(){
    let PLAYERS = initPlayers();
    return{
        getPlayerActive(turn){
            return turn === 0 ? PLAYERS[0] : PLAYERS[1]
        }
    }
}
function initPlayers(){
    return PLAYERS = ['0', 'X'];
}


function initAskQuestionYesNoView(question) {
    let answer;
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
