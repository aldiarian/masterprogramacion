"use strict";

var _require = require("console-mpds"),
    Console = _require.Console;

var console = new Console();
var COLORS = ['r', 'y', 'b', 'g', 'm', 'c'];
var COMBINATION_LENGTH = 4;
var element;
var combination = '';
var exist;

do {
  element = COLORS[Math.ceil(Math.random() * COLORS.length)];
  console.writeln("element : ".concat(element));

  for (var i = 0; !exist && i < COMBINATION_LENGTH; i++) {
    exist = element === combination[i];
  }

  if (!exist) {
    combination += element;
    console.writeln("combiation : ".concat(combination));
    console.writeln("combiation lenght : ".concat(combination.length));
  }

  console.readString('algo');
} while (combination.length < COMBINATION_LENGTH);