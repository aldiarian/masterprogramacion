"use strict";

var _require = require("../console"),
    Console = _require.Console;

var console = new Console();
playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (isResumed());
}

function playGame() {
  var game = initGame();
  var winner;

  do {
    writelnTokens(game);
    placeToken(game);
    winner = isTicTacToe(game);

    if (!winner) {
      nextTurn(game);
    }
  } while (!winner);

  writelnTokens(game);
  console.writeln("Victoria para ".concat(getToken(game)));
}

function initGame() {
  var game = {
    turn: 0,
    MAX_PLAYERS: 2,
    TOKEN_X: "X",
    TOKEN_Y: "Y",
    TOKEN_EMPTY: " ",
    MAX_TOKENS: 3,
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

function placeToken(game) {
  console.writeln("Turno para ".concat(getToken(game)));
  var error;
  var origin;
  var movement = isMovement(game);

  if (movement) {
    do {
      origin = readCoordinate('origen', game.MAX_TOKENS);
      error = !isOccupied(game, origin, getToken(game));

      if (error) {
        console.writeln("No hay una ficha de la propiedad de ".concat(getToken(game)));
      }
    } while (error);
  }

  var target;

  do {
    target = readCoordinate('destino', game.MAX_TOKENS);
    error = !isEmpty(game, target);

    if (error) {
      console.writeln("Indique una celda vac\xEDa");
    }
  } while (error);

  if (movement) {
    putEmptyToken(game, origin);
  }

  putToken(game, target, getToken(game));
}

function isMovement(game) {
  return getNumTokens(game) === game.MAX_PLAYERS * game.MAX_TOKENS;
}

function readCoordinate(title, max) {
  return {
    row: read("Fila ".concat(title), max),
    column: read("Columna ".concat(title), max)
  };
}

function putEmptyToken(game, coordinate) {
  putToken(game, coordinate, game.TOKEN_EMPTY);
}

function putToken(game, coordinate, color) {
  game.tokens[coordinate.row][coordinate.column] = color;
}

function getNumTokens(game) {
  var empties = 0;

  for (var i = 0; i < game.MAX_TOKENS; i++) {
    for (var j = 0; j < game.MAX_TOKENS; j++) {
      if (game.tokens[i][j] === game.TOKEN_EMPTY) {
        empties++;
      }
    }
  }

  return Math.pow(game.MAX_TOKENS, 2) - empties;
}

function read(title, max) {
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

function isEmpty(game, _ref) {
  var row = _ref.row,
      column = _ref.column;
  return game.tokens[row][column] === game.TOKEN_EMPTY;
}

function getToken(game) {
  return game.turn === 0 ? game.TOKEN_X : game.TOKEN_Y;
}

function writelnTokens(game) {
  var HORIZONTAL_SEPARTOR = "-------------";
  var VERTICAL_SEPARATOR = "|";
  var msg = "";

  for (var i = 0; i < game.tokens.length; i++) {
    msg += "".concat(HORIZONTAL_SEPARTOR, "\n");

    for (var j = 0; j < game.tokens[i].length; j++) {
      msg += "".concat(VERTICAL_SEPARATOR, " ").concat(game.tokens[i][j], " ");
    }

    msg += "".concat(VERTICAL_SEPARATOR, "\n");
  }

  msg += HORIZONTAL_SEPARTOR;
  console.writeln(msg);
}

function nextTurn(game) {
  game.turn = (game.turn + 1) % game.MAX_PLAYERS;
}

function isOccupied(game, coordinate, token) {
  return game.tokens[coordinate.row][coordinate.column] === token;
}

function isTicTacToe(game) {
  var countRows = [0, 0, 0];
  var countColumns = [0, 0, 0];
  var countDiagonal = 0;
  var countInverse = 0;

  for (var i = 0; i < game.tokens.length; i++) {
    for (var j = 0; j < game.tokens[i].length; j++) {
      if (game.tokens[i][j] === getToken(game)) {
        countRows[i]++;
        countColumns[j]++;

        if (i - j === 0) {
          countDiagonal++;
        }

        if (i + j === game.MAX_TOKENS - 1) {
          countInverse++;
        }
      }
    }
  }

  if (countDiagonal === game.MAX_TOKENS || countInverse === game.MAX_TOKENS) {
    return true;
  }

  for (var _i = 0; _i < countRows.length; _i++) {
    if (countRows[_i] === game.MAX_TOKENS) {
      return true;
    }

    if (countColumns[_i] === game.MAX_TOKENS) {
      return true;
    }
  }

  return false;
}

function isResumed() {
  var result;
  var answer;
  var error = false;

  do {
    answer = console.readString("\xBFQuieres jugar otra partida? ");
    result = answer === "si";
    error = !result && answer !== "no";

    if (error) {
      console.writeln("Por favor, responda \"si\" o \"no\"");
    }
  } while (error);

  return result;
}