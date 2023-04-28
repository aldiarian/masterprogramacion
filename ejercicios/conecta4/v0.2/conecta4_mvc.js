const { Console } = require("../../console");
const console = new Console();

initConectaView().start();

function initConectaView() {
    const askContinueView = initAskQuestionYesNoView(`¿Quieres jugar otra partida?`);
    return {
        start() {
            do {
                initBoardView().play()
                askContinueView.ask();
            } while (askContinueView.isYes());
        }
    }

}


function initBoardView() {
    let board = initBoard();
    return {
        play() {
            do {
                board.nextTurn();
                showBoard();
                board.placeToken();
            } while (!board.isFinish());
            showBoard();
            showWinner()
        },
    }
    function showWinner(){
        console.writeln(`Gana ${board.getPlayer()} en ${board.getFinish().position}`)
    };
    function showBoard() {
        const HORIZONTAL_SEPARTOR = `-----------------------------`;
        const VERTICAL_SEPARATOR = `|`;
        let msg = ``;
        for (let i = 0; i < board.getBoard().length; i++) {
            msg += `${HORIZONTAL_SEPARTOR}\n`;
            for (let j = 0; j < board.getBoard()[i].length; j++) {
                msg += `${VERTICAL_SEPARATOR} ${board.getBoard()[i][j]} `;
            }
            msg += `${VERTICAL_SEPARATOR}\n`;
        }
        msg += `${HORIZONTAL_SEPARTOR}\n`;
        console.writeln(msg)
    };
}




function initBoard() {
    let board = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
    const PLAYERS = initPlayers();
    let turn = 0;
    let finish = {
        value : false,
        position: ''
    };
    let coordinates = initCoordinates();
    createBoard();
    
    return {

        getBoard() {
            return board;
        },
        
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

        getPlayer() {
            return turn === 0 ? PLAYERS[0] : PLAYERS[1]
        },

        nextTurn() {
            turn === 0 ? turn = 1 : turn = 0;
        },
        
        placeToken() {
            let targetCol;
            let targetSet = false;
            let error = true;
            console.writeln(`Turno para: ${this.getPlayer()}`)
            do{
                targetCol = this.readTarget(`Columna destino`) ;
                for (let i = ROWS-1; !targetSet && ( i <= ROWS && i >= 0); i--) {
                    if (board[i][targetCol] === TOKEN_EMPTY) {
                        board[i][targetCol] = this.getPlayer();
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
            this.isWinner();
        },

        isWinner() {
            let test = this.templateTest();
            if (this.checkHorizontal(test)) {
                this.setFinish(true, 'horizontal');
            }
            if (this.checkVertical(test)) {
                this.setFinish(true, 'vertical');
            }
            if (this.checkCross(test)) {
                this.setFinish(true, 'diagonal');
            }
        },

        checkCross(test) {
            let isRightTop, isLeftTop, isLeftBottom, isRightBottom = false;

            if (coordinates.row > 2 && coordinates.col > 3) {
                // console.writeln(`RightTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row - i][coordinates.col - i];
                }
                isRightTop = test.box.toString() == test.template.toString();
            }
            if (coordinates.row > 2 && coordinates.col < 4) {
                // console.writeln(`LeftTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row - i][coordinates.col + i];
                }
                isLeftTop =  test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col < 4) {
                // console.writeln(`LeftBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col + i];
                }
                isLeftBottom =  test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col > 2) {
                // console.writeln(`RightBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col - i];
                }
                isRightBottom = test.box.toString() == test.template.toString();
            }

            return isRightTop || isLeftTop || isLeftBottom || isRightBottom

        },

        checkHorizontal(test) {
                
            
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row][ coordinates.col - i];
                }
                let isLineRight = test.box.toString() == test.template.toString();

                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row][coordinates.col + i];
                }
                let isLineLeft = test.box.toString() == test.template.toString();
                
                return isLineRight || isLineLeft; 
                
        },

        checkVertical(test) {
            if (coordinates.row <= 2) {
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col];
                }
            }
            return test.box.toString() == test.template.toString();
        },

        templateTest(){
            let activeTurn = this.getPlayer();
            return{
                box: [],
                template:[activeTurn, activeTurn, activeTurn, activeTurn],
            }
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
            return targetCol - 1;
        },


    }
    
    function createBoard() {
        for (let i = 0; i < ROWS; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                board[i][j] = TOKEN_EMPTY;
            }
        }
        //  board = [
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "0", TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "X", "0", TOKEN_EMPTY, TOKEN_EMPTY],
        //     [ TOKEN_EMPTY, TOKEN_EMPTY,  "X", "X", "X", TOKEN_EMPTY, TOKEN_EMPTY]
        // ]
    }

}

function initPlayers(){
    const PLAYERS = ['X', '0'];
    return PLAYERS;
}

function initCoordinates(){
    return { col: 0, row: 0 }
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
