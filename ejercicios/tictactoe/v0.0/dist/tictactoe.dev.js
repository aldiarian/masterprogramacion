"use strict";

var _require = require("../console"),
    Console = _require.Console;

var console = new Console();
playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (newPlay());

  function playGame() {
    var turn = 0;
    var isFinish = false;
    var MAX_TOKENS = 3;
    var TOKEN_EMPTY = " ";
    var tokens = [[TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY], [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY], [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]];

    do {
      writeTokens(tokens);
      placeToken(tokens, turn);
      turn = nextTurn(turn);
    } while (!isFinish);

    writeTokens(tokens);

    function nextTurn(turn) {
      return turn === 0 ? 1 : 0;
    }

    function isTicTacToe(tokens) {
      if (getNumTokensEmpties(tokens, TOKEN_EMPTY) != 0) {
        checkRow(tokens);
        checkCol(tokens);
        checkCrossLeft(tokens);
        checkCrossRight(tokens);
      } else {
        console.writeln("EMPATE");
        isFinish = true;
      }

      function getNumTokensEmpties(tokens, tokenEmpty) {
        var empties = 0;

        for (var i = 0; i < tokens.length; i++) {
          for (var j = 0; j < tokens[i].length; j++) {
            if (tokens[i][j] === tokenEmpty) {
              empties++;
            }
          }
        }

        return empties;
      }

      function checkCrossLeft(tokens) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][i];
        }

        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal left to right');
        }
      }

      function checkCrossRight(tokens) {
        var testBox = ['0', '0', '0'];
        var counter = MAX_TOKENS - 1;

        for (var i = 0; i < tokens.length; i++) {
          testBox[i] = tokens[i][counter];
          counter--;
        }

        if (checkTestBox(testBox)) {
          showTicTock(turn, 'diagonal right to left');
        }
      }

      function checkRow(tokens) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < tokens.length; i++) {
          for (var j = 0; j < tokens[i].length; j++) {
            testBox[j] = tokens[i][j];
          }

          if (checkTestBox(testBox)) {
            showTicTock(turn, 'horizontal');
          }
        }
      }

      function checkCol(tokens) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < tokens[0].length; i++) {
          for (var j = 0; j < tokens.length; j++) {
            testBox[j] = tokens[j][i];
          }

          if (checkTestBox(testBox)) {
            showTicTock(turn, 'vertical');
          }
        }
      }

      function checkTestBox(testBox) {
        var full = false;

        for (var j = 0; j < testBox.length; j++) {
          full = testBox[j] != ' ';
        }

        if (full) {
          var equals = true;

          for (var _j = 0; equals && _j < testBox.length; _j++) {
            equals = testBox[_j] === testBox[testBox.length - 1];
          }

          return equals;
        }

        return full;
      }

      function showTicTock(turn, msg) {
        console.writeln("-----------------------------------");
        console.writeln("l\xEDnea ".concat(msg, "\ngana: ").concat(getTurn(turn)));
        console.writeln("-----------------------------------");
        isFinish = true;
      }
    }

    function writeTokens(tokens) {
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

    function placeToken(tokens, turn) {
      console.writeln("Turno para: ".concat(getTurn(turn)));
      var targetRow;
      var targetCol;
      var error;

      do {
        targetRow = readTarget("Fila destino");
        targetCol = readTarget("Columna destino");
        error = !isEmpty(tokens, targetRow, targetCol);

        if (error) {
          console.writeln("casilla ya ocupada");
        }
      } while (error);

      tokens[targetRow][targetCol] = getTurn(turn);
      isTicTacToe(tokens);
    }

    function getTurn(turn) {
      var TURN_X = 'X';
      var TURN_Y = 'Y';
      return turn === 0 ? TURN_X : TURN_Y;
    }

    function isEmpty(tokens, targetRow, targetCol) {
      return tokens[targetRow][targetCol] === TOKEN_EMPTY;
    }

    function readTarget(title) {
      var position;

      do {
        position = console.readNumber("".concat(title, ":"));
        error = position < 1 || position > MAX_TOKENS; // opciones de error

        if (error) {
          console.writeln("Por favor un numero entre 1 y ".concat(MAX_TOKENS, " inclusives"));
        }
      } while (error);

      return position - 1;
    }
  }

  function newPlay() {
    var result;
    var answer;
    var error = false;

    do {
      answer = console.readString("\xBFQuieres jugar otra partida? si / no");
      result = answer === "si"; // true o false

      error = !result && answer !== "no"; // result diferente de 'si' y es diferente de 'no'

      if (error) {
        console.writeln("Por favor, responda \"si\" o \"no\"");
      }
    } while (error);

    return result;
  }
}