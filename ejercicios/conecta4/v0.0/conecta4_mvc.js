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
                this.showBoard();
                game.placeToken();
            } while (!game.isFinish());
            this.showBoard();
            this.showWinner()
        },
        showWinner(){
            console.writeln(`Gana ${game.getTurn()} en ${game.getFinish().position}`)
        },
        showBoard() {
            const HORIZONTAL_SEPARTOR = `-----------------------------`;
            const VERTICAL_SEPARATOR = `|`;
            let msg = ``;
            for (let i = 0; i < game.getBoard().length; i++) {
                msg += `${HORIZONTAL_SEPARTOR}\n`;
                for (let j = 0; j < game.getBoard()[i].length; j++) {
                    msg += `${VERTICAL_SEPARATOR} ${game.getBoard()[i][j]} `;
                }
                msg += `${VERTICAL_SEPARATOR}\n`;
            }
            msg += `${HORIZONTAL_SEPARTOR}\n`;
            console.writeln(msg)
        },
    }
}




function initGame() {
    let board = [];
    const ROWS = 6;
    const COLUMNS = 7;
    const TOKEN_EMPTY = ` `;
    let turn = 0;
    let finish = {
        value : false,
        position: ''
    };
    let coordinates = initCoordinates()
    return {
        play() {
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

        checkIsWinner() {
            if (this.checkHorizontal()) {
                this.setFinish(true, 'horizontal');
            }
            if (this.checkVertical()) {
                this.setFinish(true, 'vertical');
            }
            if (this.checkCross()) {
                this.setFinish(true, 'diagonal');
            }
        },

        checkCross() {
            console.writeln(`row ${coordinates.row} col ${coordinates.col}`);
            let test = this.initCheck();

            if (coordinates.row > 2 && coordinates.col > 3) {
                // console.writeln(`RightTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row - i][coordinates.col - i];
                }
                return test.box.toString() == test.template.toString();
            }

            if (coordinates.row > 2 && coordinates.col < 4) {
                // console.writeln(`LeftTop`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row - i][coordinates.col + i];
                }
                return test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col < 4) {
                // console.writeln(`LeftBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col + i];
                }
                console.writeln(`testbox:${test.box}`)
                return test.box.toString() == test.template.toString();
            }
            if (coordinates.row < 3 && coordinates.col > 2) {
                // console.writeln(`RightBottom`)
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col - i];
                }
                return test.box.toString() == test.template.toString();
            }

        },

        checkHorizontal() {
            return (this.checkHorizontalLeft() || this.checkHorizontalRight());
        },

        checkHorizontalLeft() {
            let test = this.initCheck();
            for (let i = 0; i < test.template.length; i++) {
                test.box[i] = board[coordinates.row][coordinates.col + i];
            }
            return test.box.toString() == test.template.toString();
        },

        checkHorizontalRight() {
            let test = this.initCheck();
            for (let i = 0; i < test.template.length; i++) {
                test.box[i] = board[coordinates.row][coordinates.col - i];
            }
            return test.box.toString() == test.template.toString();
        },

        checkVertical() {
            let test = this.initCheck();
            if (coordinates.row <= 2) {
                for (let i = 0; i < test.template.length; i++) {
                    test.box[i] = board[coordinates.row + i][coordinates.col];
                }
            }
            return test.box.toString() == test.template.toString();
        },

        initCheck(){
            let activeTurn = this.getTurn();
            return{
                box: [],
                activeTrn:activeTurn,
                template:[activeTurn, activeTurn, activeTurn, activeTurn]
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
            return targetCol;
        },

        createBoard() {
            for (let i = 0; i < ROWS; i++) {
                board[i] = [];
                for (let j = 0; j < COLUMNS; j++) {
                    board[i][j] = TOKEN_EMPTY;
                }
            }
            // return board = [
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            //     [ TOKEN_EMPTY, TOKEN_EMPTY, "X", "X", "X", TOKEN_EMPTY, TOKEN_EMPTY],
            // ]
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
