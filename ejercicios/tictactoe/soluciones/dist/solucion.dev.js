"use strict";

var _require = require("console-mpds"),
    Console = _require.Console;

var console = new Console();
playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    var MAX_PLAYERS = 2;
    var MAX_TOKENS = 3;
    var TOKEN_EMPTY = " ";
    var tokens = [[TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY], [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY], [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]];
    var computerOrHumanPlaceTokenFunctions = getPlayersModes();
    var turn = 0;
    var winner;

    do {
      writelnTokens(tokens);
      computerOrHumanPlaceTokenFunctions[turn](tokens, turn);
      winner = isTicTacToe(tokens, turn);

      if (!winner) {
        turn = nextTurn(turn);
      }
    } while (!winner);

    writelnTokens(tokens);
    console.writeln("Victoria para ".concat(getToken(turn)));

    function getPlayersModes() {
      var numPlayers;
      var error;

      do {
        numPlayers = console.readNumber("\xBFCu\xE1ntos jugadores hay?[0,1,2]: ");
        error = numPlayers < 0 || numPlayers > 2;

        if (error) {
          console.writeln("ERROR: Por favor, introduce un n\xFAmero de jugadores v\xE1lido");
        }
      } while (error);

      return [[placeRandomToken, placeRandomToken], [placeHumanToken, placeRandomToken], [placeHumanToken, placeHumanToken]][numPlayers];
    }

    function placeRandomToken(tokens, turn) {
      console.writeln("Turno para ".concat(getToken(turn)));
      var error;
      var movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;
      var originRow;
      var originColumn;

      if (movement) {
        do {
          originRow = parseInt(Math.random() * tokens.length);
          originColumn = parseInt(Math.random() * tokens[0].length);
          error = !isOccupied(tokens, originRow, originColumn, turn);
        } while (error);
      }

      var targetRow;
      var targetColumn;

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
      console.writeln("Turno para ".concat(getToken(turn)));
      var error;
      var movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;

      if (movement) {
        var originRow;
        var originColumn;

        do {
          originRow = read("Fila origen");
          originColumn = read("Columna origen");
          error = !isOccupied(tokens, originRow, originColumn, turn);

          if (error) {
            console.writeln("No hay una ficha de la propiedad de ".concat(getToken(turn)));
          }
        } while (error);

        tokens[originRow][originColumn] = TOKEN_EMPTY;
      }

      var targetRow;
      var targetColumn;

      do {
        targetRow = read("Fila destino");
        targetColumn = read("Columna destino");
        error = !isEmpty(tokens, targetRow, targetColumn);

        if (error) {
          console.writeln("Indique una celda vac\xEDa");
        }
      } while (error);

      tokens[targetRow][targetColumn] = getToken(turn);
    }

    function getNumTokens(tokens) {
      var empties = 0;

      for (var i = 0; i < tokens.length; i++) {
        for (var j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === TOKEN_EMPTY) {
            empties++;
          }
        }
      }

      return Math.pow(MAX_TOKENS, 2) - empties;
    }

    function read(title) {
      var position;
      var error;

      do {
        position = console.readNumber("".concat(title, ": "));
        error = position < 1 || MAX_TOKENS < position;

        if (error) {
          console.writeln("Por favor un numero entre 1 y ".concat(MAX_TOKENS, " inclusives"));
        }
      } while (error);

      return position - 1;
    }

    function isEmpty(tokens, row, column) {
      return tokens[row][column] === TOKEN_EMPTY;
    }

    function getToken(turn) {
      var TOKEN_X = "X";
      var TOKEN_Y = "Y";
      return turn === 0 ? TOKEN_X : TOKEN_Y;
    }

    function writelnTokens(tokens) {
      var HORIZONTAL_SEPARTOR = "-------------";
      var VERTICAL_SEPARATOR = "|";
      var msg = "";

      for (var i = 0; i < tokens.length; i++) {
        msg += "".concat(HORIZONTAL_SEPARTOR, "\n");

        for (var j = 0; j < tokens[i].length; j++) {
          msg += "".concat(VERTICAL_SEPARATOR, " ").concat(tokens[i][j], " ");
        }

        msg += "".concat(VERTICAL_SEPARATOR, "\n");
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
      var countRows = [0, 0, 0];
      var countColumns = [0, 0, 0];
      var countDiagonal = 0;
      var countInverse = 0;

      for (var i = 0; i < tokens.length; i++) {
        for (var j = 0; j < tokens[i].length; j++) {
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

      for (var _i = 0; _i < countRows.length; _i++) {
        if (countRows[_i] === MAX_TOKENS) {
          return true;
        }

        if (countColumns[_i] === MAX_TOKENS) {
          return true;
        }
      }

      return false;
    }
  }

  function isResumed() {
    var result;
    var answer;
    var error = false;

    do {
      answer = console.readString("\xBFQuieres jugar otra partida?[si/no] ");
      result = answer === "si";
      error = !result && answer !== "no";

      if (error) {
        console.writeln("Por favor, responda \"si\" o \"no\"");
      }
    } while (error);

    return result;
  }
}