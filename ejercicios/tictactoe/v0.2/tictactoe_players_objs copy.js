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
      modePlayers[gameObj.turn](gameObj.tokens, gameObj.turn)
      turn = nextTurn(gameObj);
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

    function placeTokens(gameObj, player = 'human'){

      console.writeln(`Turno para: ${getTurn(gameObj)}`)
      let targetRow;
      let targetCol;
      let error;
      
      do {
        if ( player == 'machine'){
          targetRow = parseInt( Math.random()* gameObj.MAX_TOKENS ) ;
          targetCol = parseInt( Math.random()* gameObj.MAX_TOKENS ) ;
          error = !isEmpty(gameObj.tokens, targetRow, targetCol)
        } else {
          targetRow = readTarget(`Fila destino`);
          targetCol = readTarget(`Columna destino`);
          error = !isEmpty(gameObj.tokens, targetRow, targetCol)
          if (error) {
            console.writeln(`casilla ya ocupada`)
          }
        }

      } while (error);

      gameObj.tokens[targetRow][targetCol] = getTurn(gameObj.turn);
      isTicTacToe(gameObj.tokens);

    }

    function machine(gameObj){
      placeTokens( gameObj, player = 'machine')
    }
    
    function human(gameObj) {
      placeTokens( gameObj, player = 'human')
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

    function nextTurn(gameObj) {
      return gameObj.turn === 0 ? 1 : 0;
    }

    function isTicTacToe(gameObj) {
      if (getNumTokensEmpties(gameObj.tokens, gameObj.TOKEN_EMPTY) != 0) {
        checkRow(gameObj.tokens)
        checkCol(gameObj.tokens)
        checkCrossLeft(gameObj.tokens)
        checkCrossRight(gameObj.tokens)
      } else {
        console.writeln(`EMPATE`);
        isFinish = true;
      }


      function getNumTokensEmpties(tokens, tokenEmpty) {
        let empties = 0;
        for (let i = 0; i < tokens.length; i++) {
          for (let j = 0; j < tokens[i].length; j++) {
            if (tokens[i][j] === tokenEmpty) {
              empties++;
            }
          }
        }
        return empties;
      }

      function checkCrossLeft(tokens) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][i]
        }
        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal left to right')
        }

      }

      function checkCrossRight(tokens) {
        let testBox = ['0', '0', '0'];
        let counter = MAX_TOKENS - 1;
        for (let i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][counter]
          counter--;
        }
        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal right to left')
        }
      }

      function checkRow(tokens) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < tokens.length; i++) {
          for (let j = 0; j < tokens[i].length; j++) {
            testBox[j] = tokens[i][j]
          }
          if (checkTestBox(testBox)) {
            showTicTock(turn, 'horizontal')
          }
        }

      }

      function checkCol(tokens) {
        let testBox = ['0', '0', '0'];
        for (let i = 0; i < tokens[0].length; i++) {
          for (let j = 0; j < tokens.length; j++) {
            testBox[j] = tokens[j][i]
          }
          if (checkTestBox(testBox)) {
            showTicTock(turn, 'vertical')
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

      function showTicTock(turn, msg) {
        console.writeln(`-----------------------------------`)
        console.writeln(`línea ${msg}\ngana: ${getTurn(turn)}`);
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
      msg += HORIZONTAL_SEPARTOR;

      console.writeln(msg)
    }

    function getTurn(gameObj) {
      let TURN_X = 'X';
      let TURN_Y = 'Y';
      return gameObj.turn === 0 ? TURN_X : TURN_Y
    }

    function isEmpty(tokens, targetRow, targetCol) {
      console.writeln('tokens: ' + tokens)
      return tokens[targetRow][targetCol] === TOKEN_EMPTY;
    }
    

    function readTarget(title, gameObj) {
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