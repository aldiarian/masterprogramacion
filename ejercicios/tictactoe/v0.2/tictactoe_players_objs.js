const { Console } = require("../console");
const console = new Console();

playTicTacToe();

function playTicTacToe() {

  do {
    playGame()
  } while (newPlay())


  function playGame() {
    let isFinish = false;
    let gameObj = initGame();
    let modePlayers = askForPlayers();

    do {
      writeTokens(gameObj);
      modePlayers[gameObj.turn](gameObj)
      gameObj.turn = nextTurn(gameObj);
    } while (!isFinish);
    
    writeTokens(gameObj);

    function initGame(){
      let game = {
        turn : 0,
        MAX_TOKENS : 3,
        TOKEN_EMPTY : ` `,
        tokens:[]
      };
      for (let i = 0; i < game.MAX_TOKENS; i++) {
        game.tokens[i] = [];
        for (let j = 0; j < game.MAX_TOKENS; j++) {
          game.tokens[i][j] = game.TOKEN_EMPTY;
        }
      }
      return game;
    }

    function placeTokenS(gameObj, player = 'human'){

      console.writeln(`Turno para: ${getTurn(gameObj)}`)
      let targetRow;
      let targetCol;
      let error;
      
      do {
        if ( player == 'machine'){
          targetRow = parseInt( Math.random()* gameObj.MAX_TOKENS ) ;
          targetCol = parseInt( Math.random()* gameObj.MAX_TOKENS ) ;
          error = !isEmpty(gameObj, targetRow, targetCol)
        } else {
          targetRow = readTarget(`Fila destino`, gameObj);
          targetCol = readTarget(`Columna destino`, gameObj);
          error = !isEmpty(gameObj, targetRow, targetCol)
          if (error) {
            console.writeln(`casilla ya ocupada`)
          }
        }

      } while (error);

      gameObj.tokens[targetRow][targetCol] = getTurn(gameObj);
      isTicTacToe(gameObj);

    }

    function machine(gameObj){
      placeTokenS( gameObj, player = 'machine')
    }
    
    function human(gameObj) {
      placeTokenS( gameObj, player = 'human')
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
      return [[ machine, machine ],[ human, machine ],[ human, human ]][players];
    }

    function nextTurn(nextTurn) {
      return nextTurn.turn === 0 ? 1 : 0;
    }

    function isTicTacToe(gameObj) {
      if ( getNumTokensEmpties(gameObj) != 0 ) {
        checkRow(gameObj)
        checkCol(gameObj)
        checkCrossLeft(gameObj)
        checkCrossRight(gameObj)
      } else {
        console.writeln(`EMPATE`);
        isFinish = true;
      }


      function getNumTokensEmpties(gameObj) {
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

      function checkCrossLeft(gameObj) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][i]
        }
        if (checkTestBox(testBox)) {
          showTicTock(gameObj, 'diagonal left to right')
        }

      }

      function checkCrossRight(gameObj) {
        let testBox = ['0', '0', '0'];
        let counter = gameObj.MAX_TOKENS - 1;
        for (let i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][counter]
          counter--;
        }
        if (checkTestBox(testBox)) {
          showTicTock(gameObj, 'diagonal right to left')
        }
      }

      function checkRow(gameObj) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens.length; i++) {
          for (let j = 0; j < gameObj.tokens[i].length; j++) {
            testBox[j] = gameObj.tokens[i][j]
          }
          if (checkTestBox(testBox)) {
            showTicTock(gameObj, 'horizontal')
          }
        }

      }

      function checkCol(gameObj) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < gameObj.tokens[0].length; i++) {
          for (let j = 0; j < gameObj.tokens.length; j++) {
            testBox[j] = gameObj.tokens[j][i]
          }
          if (checkTestBox(testBox)) {
            showTicTock(gameObj, 'vertical')
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

      function showTicTock(gameObj, msg) {
        console.writeln(`-----------------------------------`)
        console.writeln(`línea ${msg}\nHA GANADO: ${getTurn(gameObj.turn)}`);
        console.writeln(`-----------------------------------`)
        isFinish = true;
      }

    }

    function writeTokens(gameObj) {
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
    }

    function getTurn(gameObj) {
      let TURN_X = 'X';
      let TURN_Y = 'Y';
      return gameObj.turn === 0 ? TURN_X : TURN_Y
    }

    function isEmpty(gameObj, targetRow, targetCol) {
      return gameObj.tokens[targetRow][targetCol] === gameObj.TOKEN_EMPTY;
    }

    function readTarget(title, gameObj) {
      let position;
      do {
        position = console.readNumber(`${title}:`);
        error = position < 1 || position >gameObj. MAX_TOKENS; // opciones de error
        if (error) {
          console.writeln(`Por favor un numero entre 1 y ${gameObj.MAX_TOKENS} inclusives`)
        }

      } while (error);
      return position - 1;
    }

  }

  function newPlay() {
    let result;
    let answer;
    let error = false;
    do {
      answer = console.readString(`¿Quieres jugar otra partida? si / no`);
      result = answer === `si`; // true o false
      error = !result && answer !== `no`; // result diferente de 'si' y es diferente de 'no'
      if (error) {
        console.writeln(`Por favor, responda "si" o "no"`);
      }
    } while (error);
    return result;
  }

}