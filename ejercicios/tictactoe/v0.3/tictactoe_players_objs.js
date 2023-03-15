const { Console } = require("../console");
const console = new Console();

tictactoeView().play();

function tictactoeView() {
  const askContinueView = initAskContinueView(`¿Quieres jugar otra partida? si / no`);
  return {
    play() {
      do {
        initPlayGameView().play();
        askContinueView.ask();
      } while (askContinueView.isYes());
    }
  }


  function initPlayGameView() {
    let game = initPlayGame();
    return {
      play() {
        do {
          game.writeTokensView();
          game.play();
        } while (!game.isFinish());

        game.writeTokensView();
      }
    }

  }

  function initPlayGame() {
    let modePlayers;
    let isFinish = false;
    let gameObj = initGameObj();

    askForPlayers();
    return {
      play() {
        modePlayers[gameObj.turn]();
        gameObj.turn = nextTurn(gameObj);
      },

      writeTokensView() {
        const HORIZONTAL_SEPARTOR = `-------------`;
        const VERTICAL_SEPARATOR = `|`;
        let msg = ``;
        for (let i = 0; i < gameObj.tokens.length; i++) {
          msg += `${HORIZONTAL_SEPARTOR}\n`;
          for (let j = 0; j < gameObj.tokens[i].length; j++) {
            msg += `${VERTICAL_SEPARATOR} ${gameObj.tokens[i][j]} `;
          }
          msg += `${VERTICAL_SEPARATOR}\n`;
        }
        msg += `${HORIZONTAL_SEPARTOR}\n`;

        console.writeln(msg)
      },

      isFinish() {
        return isFinish == true;
      }
    }

    function machine() {
      return placeTokens('machine');
    };

    function human() {
      return placeTokens('human');
    };

    function placeTokens(player) {

      console.writeln(`Turno para: ${getTurn()}`)
      let targetRow;
      let targetCol;
      let error;

      do {
        if (player == 'machine') {
          targetRow = parseInt(Math.random() * gameObj.MAX_TOKENS);
          targetCol = parseInt(Math.random() * gameObj.MAX_TOKENS);
          error = !isEmpty(targetRow, targetCol)
        } else {
          targetRow = readTarget(`Fila destino`);
          targetCol = readTarget(`Columna destino`);
          error = !isEmpty(targetRow, targetCol)
          if (error) {
            console.writeln(`casilla ya ocupada`)
          }
        }

      } while (error);

      gameObj.tokens[targetRow][targetCol] = getTurn();
      isTicTacToe();

    };

    function nextTurn(nextTurn) {
      return nextTurn.turn === 0 ? 1 : 0;
    };

    function isTicTacToe() {
      if (getNumTokensEmpties() != 0) {
        checkRow()
        checkCol()
        checkCrossLeft()
        checkCrossRight()
      } else {
        console.writeln(`EMPATE`);
        isFinish = true;
      }


      function getNumTokensEmpties() {
        let empties = 0;
        for (let i = 0; i < gameObj.tokens.length; i++) {
          for (let j = 0; j < gameObj.tokens[i].length; j++) {
            if (gameObj.tokens[i][j] === gameObj.TOKEN_EMPTY) {
              empties++;
            }
          }
        }
        return empties;
      }

      function checkCrossLeft() {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][i]
        }
        if (checkTestBox(testBox)) {
          showTicTock('diagonal left to right')
        }

      }

      function checkCrossRight() {
        let testBox = ['0', '0', '0'];
        let counter = gameObj.MAX_TOKENS - 1;
        for (let i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][counter]
          counter--;
        }
        if (checkTestBox(testBox)) {
          showTicTock('diagonal right to left')
        }
      }

      function checkRow() {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens.length; i++) {
          for (let j = 0; j < gameObj.tokens[i].length; j++) {
            testBox[j] = gameObj.tokens[i][j]
          }
          if (checkTestBox(testBox)) {
            showTicTock('horizontal')
          }
        }

      }

      function checkCol() {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens[0].length; i++) {
          for (let j = 0; j < gameObj.tokens.length; j++) {
            testBox[j] = gameObj.tokens[j][i]
          }
          if (checkTestBox(testBox)) {
            showTicTock('vertical')
          }
        }

      }


      function checkTestBox(testBox) {
        let full = false;
        for (let j = 0; j < testBox.length; j++) {
          full = testBox[j] != ' ';
        }
        if (full) {
          let equals = true;
          for (let j = 0; equals && j < testBox.length; j++) {
            equals = testBox[j] === testBox[testBox.length - 1];
          }
          return equals
        }
        return full
      }

      function showTicTock(msg) {
        console.writeln(`-----------------------------------`)
        console.writeln(`línea ${msg}\nHA GANADO: ${getTurn(gameObj.turn)}`);
        console.writeln(`-----------------------------------`)
        isFinish = true;
      }

    };


    function isEmpty(targetRow, targetCol) {
      return gameObj.tokens[targetRow][targetCol] === gameObj.TOKEN_EMPTY;
    };

    function readTarget(title) {
      let position;
      do {
        position = console.readNumber(`${title}:`);
        error = position < 1 || position > gameObj.MAX_TOKENS; // opciones de error
        if (error) {
          console.writeln(`Por favor un numero entre 1 y ${gameObj.MAX_TOKENS} inclusives`)
        }

      } while (error);
      return position - 1;
    }
    function askForPlayers() {
      let error;
      let players;
      do {
        players = console.readNumber(`¿Cuántos jugadores vais a ser 0, 1 o 2 ?`);
        error = players > 2 || players < 0
        if (error) {
          console.writeln(`jugadores tienen que ser entre 0 y 2`)
        }
      } while (error);
      modePlayers = [[machine, machine], [human, machine], [human, human]][players];
    }

    function getTurn() {
      let TURN_X = 'X';
      let TURN_Y = 'Y';
      return gameObj.turn === 0 ? TURN_X : TURN_Y
    };


  }





  function initGameObj() {
    let gameObj = {
      turn: 0,
      MAX_TOKENS: 3,
      TOKEN_EMPTY: ` `,
      tokens: []
    };
    for (let i = 0; i < gameObj.MAX_TOKENS; i++) {
      gameObj.tokens[i] = [];
      for (let j = 0; j < gameObj.MAX_TOKENS; j++) {
        gameObj.tokens[i][j] = gameObj.TOKEN_EMPTY;
      }
    }
    return gameObj;
  }

  function initAskContinueView(question) {
    let answer = ``;
    return {
      ask() {
        let error = ``;
        do {
          answer = console.readString(question);
          error = !this.isYes() && !this.isNo();
          if (error) console.writeln(`Please answer "yes" or "no".`)
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

}