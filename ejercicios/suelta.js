const { Console } = require("console-mpds");
const console = new Console();

const COLORS =[ 'r','y','b','g','m','c'];
const COMBINATION_LENGTH = 4;

let element;
let combination = '';
do {
    let exist = false;
    element = COLORS[Math.ceil(Math.random()*COLORS.length)];
    for (let i = 0;  !exist && i < COMBINATION_LENGTH; i++) {
        exist = element === combination[i];
    }
    !exist ? combination += element : false;
} while (combination.length < COMBINATION_LENGTH);