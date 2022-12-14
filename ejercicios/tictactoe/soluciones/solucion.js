const { Console } = require("console-mpds");

const console = new Console();
playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    const MAX_PLAYERS = 2;
    const MAX_TOKENS = 3;
    const TOKEN_EMPTY = ` `;
    let tokens = [
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
      [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]
    ];
    let computerOrHumanPlaceTokenFunctions=getPlayersModes();
    let turn = 0;
    let winner;
    do {
      writelnTokens(tokens);
      computerOrHumanPlaceTokenFunctions[turn](tokens, turn);
      winner = isTicTacToe(tokens, turn);
      if (!winner) {
        turn = nextTurn(turn);
      }
    } while (!winner);
    writelnTokens(tokens);
    console.writeln(`Victoria para ${getToken(turn)}`);

    function getPlayersModes() {
      let numPlayers;
      let error;
      do {
        numPlayers = console.readNumber(`¿Cuántos jugadores hay?[0,1,2]: `);
        error = numPlayers < 0 || numPlayers > 2;
        if (error) {
          console.writeln(`ERROR: Por favor, introduce un número de jugadores válido`);
        }
      } while (error);
      return [ [placeRandomToken,placeRandomToken] ,[ placeHumanToken,placeRandomToken],[ placeHumanToken,placeHumanToken] ] [numPlayers];
    }

      function placeRandomToken(tokens, turn) {
        console.writeln(`Turno para ${getToken(turn)}`);
        let error;
        const movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;
        let originRow;
        let originColumn;
        if (movement) {
          do {
            originRow = parseInt(Math.random() * tokens.length);
            originColumn = parseInt(Math.random() * tokens[0].length);
            error = !isOccupied(tokens, originRow, originColumn, turn);
          } while (error);
        }
        let targetRow;
        let targetColumn;
        do {
          targetRow = parseInt(Math.random() * tokens.length);
          targetColumn = parseInt(Math.random() * tokens[0].length);
          error = !isEmpty(tokens, targetRow, targetColumn);
        } while (error);
        if (movement) {
          tokens[originRow][originColumn] = TOKEN_EMPTY;
        }
        tokens[targetRow][targetColumn] = getToken(turn);
      }
      
      function placeHumanToken(tokens, turn) {
        console.writeln(`Turno para ${getToken(turn)}`);
        let error;
        const movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;
        if (movement) {
          let originRow;
          let originColumn;
          do {
            originRow = read(`Fila origen`);
            originColumn = read(`Columna origen`);
            error = !isOccupied(tokens, originRow, originColumn, turn);
            if (error) {
              console.writeln(`No hay una ficha de la propiedad de ${getToken(turn)}`);
            }
          } while (error);
          tokens[originRow][originColumn] = TOKEN_EMPTY;
        }
        let targetRow;
        let targetColumn;
        do {
          targetRow = read(`Fila destino`);
          targetColumn = read(`Columna destino`);
          error = !isEmpty(tokens, targetRow, targetColumn);
          if (error) {
            console.writeln(`Indique una celda vacía`);
          }
        } while (error);
        tokens[targetRow][targetColumn] = getToken(turn);
      }
    

    function getNumTokens(tokens) {
      let empties = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === TOKEN_EMPTY) {
            empties++;
          }
        }
      }
      return MAX_TOKENS ** 2 - empties;
    }

    function read(title) {
      let position;
      let error;
      do {
        position = console.readNumber(`${title}: `);
        error = position < 1 || MAX_TOKENS < position;
        if (error) {
          console.writeln(`Por favor un numero entre 1 y ${MAX_TOKENS} inclusives`)
        }
      } while (error);
      return position - 1;
    }

    function isEmpty(tokens, row, column) {
      return tokens[row][column] === TOKEN_EMPTY;
    }

    function getToken(turn) {
      const TOKEN_X = `X`;
      const TOKEN_Y = `Y`;
      return turn === 0 ? TOKEN_X : TOKEN_Y;
    }

    function writelnTokens(tokens) {
      const HORIZONTAL_SEPARTOR = `-------------`;
      const VERTICAL_SEPARATOR = `|`;
      let msg = ``;
      for (let i = 0; i < tokens.length; i++) {
        msg += `${HORIZONTAL_SEPARTOR}\n`;
        for (let j = 0; j < tokens[i].length; j++) {
          msg += `${VERTICAL_SEPARATOR} ${tokens[i][j]} `;
        }
        msg += `${VERTICAL_SEPARATOR}\n`;
      }
      msg += HORIZONTAL_SEPARTOR;
      console.writeln(msg);
    }

    function nextTurn(turn) {
      return (turn + 1) % MAX_PLAYERS;
    }

    function isOccupied(tokens, row, column, turn) {
      return tokens[row][column] === getToken(turn);
    }

    function isTicTacToe(tokens, turn) {
      let countRows = [0, 0, 0];
      let countColumns = [0, 0, 0];
      let countDiagonal = 0;
      let countInverse = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === getToken(turn)) {
            countRows[i]++;
            countColumns[j]++;
            if (i - j === 0) {
              countDiagonal++;
            }
            if (i + j === MAX_TOKENS - 1) {
              countInverse++;
            }
          }
        }
      }
      if (countDiagonal === MAX_TOKENS || countInverse === MAX_TOKENS) {
        return true;
      }
      for (let i = 0; i < countRows.length; i++) {
        if (countRows[i] === MAX_TOKENS) {
          return true;
        }
        if (countColumns[i] === MAX_TOKENS) {
          return true;
        }
      }
      return false;
    }

  }

  function isResumed() {
    let result;
    let answer;
    let error = false;
    do {
      answer = console.readString(`¿Quieres jugar otra partida?[si/no] `);
      result = answer === `si`;
      error = !result && answer !== `no`;
      if (error) {
        console.writeln(`Por favor, responda "si" o "no"`);
      }
    } while (error);
    return result;
  }

}