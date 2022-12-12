"use strict";

var _require = require("./console"),
    Console = _require.Console;

var console = new Console();
playTicTacToe();

function playTicTacToe() {
  var continueDialog = initYesNoDialog("\xBFQuieres jugar otra partida? ");

  do {
    var game = initGame();
    game.play();
    continueDialog.read();
  } while (continueDialog.isAffirmative());
}

function initGame() {
  var game = {
    turn: 0,
    MAX_PLAYERS: 2,
    TOKEN_X: "X",
    TOKEN_Y: "Y",
    TOKEN_EMPTY: " ",
    MAX_TOKENS: 3,
    tokens: [],
    play: function play() {
      var winner;

      do {
        this.writelnTokens();
        this.placeToken();
        winner = this.isTicTacToe();

        if (!winner) {
          this.nextTurn();
        }
      } while (!winner);

      this.writelnTokens();
      this.writeWinner();
    },
    writelnTokens: function writelnTokens() {
      var HORIZONTAL_SEPARTOR = "-------------";
      var VERTICAL_SEPARATOR = "|";
      var msg = "";

      for (var i = 0; i < this.tokens.length; i++) {
        msg += "".concat(HORIZONTAL_SEPARTOR, "\n");

        for (var j = 0; j < this.tokens[i].length; j++) {
          msg += "".concat(VERTICAL_SEPARATOR, " ").concat(this.tokens[i][j], " ");
        }

        msg += "".concat(VERTICAL_SEPARATOR, "\n");
      }

      msg += HORIZONTAL_SEPARTOR;
      console.writeln(msg);
    },
    placeToken: function placeToken() {
      console.writeln("Turno para ".concat(this.getToken()));
      var error;
      var origin;
      var movement = this.isMovement();

      if (movement) {
        do {
          origin = initCoordinate();
          origin.read('origen', this.MAX_TOKENS);
          error = !this.isOccupied(origin, this.getToken());

          if (error) {
            console.writeln("No hay una ficha de la propiedad de ".concat(this.getToken()));
          }
        } while (error);
      }

      var target;

      do {
        target = initCoordinate();
        target.read('destino', this.MAX_TOKENS);
        error = !this.isEmpty(target);

        if (error) {
          console.writeln("Indique una celda vac\xEDa");
        }
      } while (error);

      if (movement) {
        this.putEmptyToken(origin);
      }

      this.putToken(target, this.getToken());
    },
    isTicTacToe: function isTicTacToe() {
      var countRows = [0, 0, 0];
      var countColumns = [0, 0, 0];
      var countDiagonal = 0;
      var countInverse = 0;

      for (var i = 0; i < this.tokens.length; i++) {
        for (var j = 0; j < this.tokens[i].length; j++) {
          if (this.tokens[i][j] === this.getToken()) {
            countRows[i]++;
            countColumns[j]++;

            if (i - j === 0) {
              countDiagonal++;
            }

            if (i + j === this.MAX_TOKENS - 1) {
              countInverse++;
            }
          }
        }
      }

      if (countDiagonal === this.MAX_TOKENS || countInverse === this.MAX_TOKENS) {
        return true;
      }

      for (var _i = 0; _i < countRows.length; _i++) {
        if (countRows[_i] === this.MAX_TOKENS) {
          return true;
        }

        if (countColumns[_i] === this.MAX_TOKENS) {
          return true;
        }
      }

      return false;
    },
    nextTurn: function nextTurn() {
      this.turn = (this.turn + 1) % this.MAX_PLAYERS;
    },
    isMovement: function isMovement() {
      return this.getNumTokens() === this.MAX_PLAYERS * this.MAX_TOKENS;
    },
    putEmptyToken: function putEmptyToken(coordinate) {
      this.putToken(coordinate, this.TOKEN_EMPTY);
    },
    putToken: function putToken(coordinate, color) {
      this.tokens[coordinate.row][coordinate.column] = color;
    },
    getNumTokens: function getNumTokens() {
      var empties = 0;

      for (var i = 0; i < this.MAX_TOKENS; i++) {
        for (var j = 0; j < this.MAX_TOKENS; j++) {
          if (this.tokens[i][j] === this.TOKEN_EMPTY) {
            empties++;
          }
        }
      }

      return Math.pow(this.MAX_TOKENS, 2) - empties;
    },
    isEmpty: function isEmpty(_ref) {
      var row = _ref.row,
          column = _ref.column;
      return this.tokens[row][column] === this.TOKEN_EMPTY;
    },
    getToken: function getToken() {
      return this.turn === 0 ? this.TOKEN_X : this.TOKEN_Y;
    },
    isOccupied: function isOccupied(coordinate, color) {
      return this.tokens[coordinate.row][coordinate.column] === color;
    },
    writeWinner: function writeWinner() {
      console.writeln("Victoria para ".concat(this.getToken()));
    }
  };

  for (var i = 0; i < game.MAX_TOKENS; i++) {
    game.tokens[i] = [];

    for (var j = 0; j < game.MAX_TOKENS; j++) {
      game.tokens[i][j] = game.TOKEN_EMPTY;
    }
  }

  return game;
}

function initCoordinate() {
  return {
    row: undefined,
    column: undefined,
    read: function read(title, max) {
      this.row = _read("Fila ".concat(title), max);
      this.column = _read("Columna ".concat(title), max);
    }
  };

  function _read(title, max) {
    var position;
    var error;

    do {
      position = console.readNumber("".concat(title, ": "));
      error = position < 1 || max < position;

      if (error) {
        console.writeln("Por favor un numero entre 1 y ".concat(max, " inclusives"));
      }
    } while (error);

    return position - 1;
  }
}

function initYesNoDialog(question) {
  return {
    question: question,
    answer: "",
    read: function read() {
      var error = false;

      do {
        answer = console.readString(this.question);
        error = !this.isAffirmative() && !this.isNegative();

        if (error) {
          console.writeln("Por favor, responda \"si\" o \"no\"");
        }
      } while (error);
    },
    isAffirmative: function isAffirmative() {
      return answer === "si";
    },
    isNegative: function isNegative() {
      return answer === "no";
    }
  };
}