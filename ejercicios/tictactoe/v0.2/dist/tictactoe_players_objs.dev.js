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
    var isFinish = false;
    var gameObj = initGame();
    var modePlayers = askForPlayers();

    do {
      writeTokens(gameObj);
      modePlayers[gameObj.turn](gameObj);
      gameObj.turn = nextTurn(gameObj);
    } while (!isFinish);

    writeTokens(gameObj);

    function initGame() {
      var game = {
        turn: 0,
        MAX_TOKENS: 3,
        TOKEN_EMPTY: " ",
        tokens: []
      };

      for (var i = 0; i < game.MAX_TOKENS; i++) {
        game.tokens[i] = [];

        for (var j = 0; j < game.MAX_TOKENS; j++) {
          game.tokens[i][j] = game.TOKEN_EMPTY;
        }
      }

      return game;
    }

    function placeTokenS(gameObj) {
      var player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'human';
      console.writeln("Turno para: ".concat(getTurn(gameObj)));
      var targetRow;
      var targetCol;
      var error;

      do {
        if (player == 'machine') {
          targetRow = parseInt(Math.random() * gameObj.MAX_TOKENS);
          targetCol = parseInt(Math.random() * gameObj.MAX_TOKENS);
          error = !isEmpty(gameObj, targetRow, targetCol);
        } else {
          targetRow = readTarget("Fila destino", gameObj);
          targetCol = readTarget("Columna destino", gameObj);
          error = !isEmpty(gameObj, targetRow, targetCol);

          if (error) {
            console.writeln("casilla ya ocupada");
          }
        }
      } while (error);

      gameObj.tokens[targetRow][targetCol] = getTurn(gameObj);
      isTicTacToe(gameObj);
    }

    function machine(gameObj) {
      placeTokenS(gameObj, player = 'machine');
    }

    function human(gameObj) {
      placeTokenS(gameObj, player = 'human');
    }

    function askForPlayers() {
      var error;
      var players;

      do {
        players = console.readNumber("\xBFCu\xE1ntos jugadores vais a ser 0, 1 o 2 ?");
        error = players > 2 || players < 0;

        if (error) {
          console.writeln("jugadores tienen que ser entre 0 y 2");
        }
      } while (error);

      return [[machine, machine], [human, machine], [human, human]][players];
    }

    function nextTurn(nextTurn) {
      return nextTurn.turn === 0 ? 1 : 0;
    }

    function isTicTacToe(gameObj) {
      if (getNumTokensEmpties(gameObj) != 0) {
        checkRow(gameObj);
        checkCol(gameObj);
        checkCrossLeft(gameObj);
        checkCrossRight(gameObj);
      } else {
        console.writeln("EMPATE");
        isFinish = true;
      }

      function getNumTokensEmpties(gameObj) {
        var empties = 0;

        for (var i = 0; i < gameObj.tokens.length; i++) {
          for (var j = 0; j < gameObj.tokens[i].length; j++) {
            if (gameObj.tokens[i][j] === gameObj.TOKEN_EMPTY) {
              empties++;
            }
          }
        }

        return empties;
      }

      function checkCrossLeft(gameObj) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][i];
        }

        if (checkTestBox(testBox)) {
          showTicTock(gameObj, 'diagonal left to right');
        }
      }

      function checkCrossRight(gameObj) {
        var testBox = ['0', '0', '0'];
        var counter = gameObj.MAX_TOKENS - 1;

        for (var i = 0; i < gameObj.tokens.length; i++) {
          testBox[i] = gameObj.tokens[i][counter];
          counter--;
        }

        if (checkTestBox(testBox)) {
          showTicTock(gameObj, 'diagonal right to left');
        }
      }

      function checkRow(gameObj) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < gameObj.tokens.length; i++) {
          for (var j = 0; j < gameObj.tokens[i].length; j++) {
            testBox[j] = gameObj.tokens[i][j];
          }

          if (checkTestBox(testBox)) {
            showTicTock(gameObj, 'horizontal');
          }
        }
      }

      function checkCol(gameObj) {
        var testBox = ['0', '0', '0'];

        for (var i = 0; i < gameObj.tokens[0].length; i++) {
          for (var j = 0; j < gameObj.tokens.length; j++) {
            testBox[j] = gameObj.tokens[j][i];
          }

          if (checkTestBox(testBox)) {
            showTicTock(gameObj, 'vertical');
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

      function showTicTock(gameObj, msg) {
        console.writeln("-----------------------------------");
        console.writeln("l\xEDnea ".concat(msg, "\nHA GANADO: ").concat(getTurn(gameObj.turn)));
        console.writeln("-----------------------------------");
        isFinish = true;
      }
    }

    function writeTokens(gameObj) {
      var HORIZONTAL_SEPARTOR = "-------------";
      var VERTICAL_SEPARATOR = "|";
      var msg = "";

      for (var i = 0; i < gameObj.tokens.length; i++) {
        msg += "".concat(HORIZONTAL_SEPARTOR, "\n");

        for (var j = 0; j < gameObj.tokens[i].length; j++) {
          msg += "".concat(VERTICAL_SEPARATOR, " ").concat(gameObj.tokens[i][j], " ");
        }

        msg += "".concat(VERTICAL_SEPARATOR, "\n");
      }

      msg += "".concat(HORIZONTAL_SEPARTOR, "\n");
      console.writeln(msg);
    }

    function getTurn(gameObj) {
      var TURN_X = 'X';
      var TURN_Y = 'Y';
      return gameObj.turn === 0 ? TURN_X : TURN_Y;
    }

    function isEmpty(gameObj, targetRow, targetCol) {
      return gameObj.tokens[targetRow][targetCol] === gameObj.TOKEN_EMPTY;
    }

    function readTarget(title, gameObj) {
      var position;

      do {
        position = console.readNumber("".concat(title, ":"));
        error = position < 1 || position > gameObj.MAX_TOKENS; // opciones de error

        if (error) {
          console.writeln("Por favor un numero entre 1 y ".concat(gameObj.MAX_TOKENS, " inclusives"));
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