"use strict";

var _require = require("./console"),
    Console = _require.Console;

var console = new Console(); // 0-fraction / 0-inverse
// Introduce el numerador de la fracción: 2
// Introduce el denominador de la fracción: 3
// La fracción 2/3 invertida es la fracción 3/2
// const numerator = console.readNumber('Introduce el numerador de la fracción: ');
// const denominator = console.readNumber('Introduce el denominador de la fracción: ');
// console.writeln( `La fracción ${numerator}/${denominator} invertida es ${denominator}/${numerator}` );
// Introduce el numerador de la fracción: 2
// Introduce el denominador de la fracción: 3
// Introduce un exponente: 4
// La fracción 2/3 elevado a 4 es la fracción 16/81
// const numerator = console.readNumber('Introduce el numerador de la fracción: ');
// const denominator = console.readNumber('Introduce el denominador de la fracción: ');
// const exponent = console.readNumber('Introduce un exponente: ');
// console.writeln(`La fracción ${numerator}/${denominator} elevado a ${exponent} es la fracción ${numerator**exponent}/${denominator**exponent}`)
// Simplificando la fracción mediante el máximo común divisor (visto en el "Recursividad en la Ciencia" del tema "Patrones" del módulo de Fundamento)
// Introduce el numerador de la fracción: 3
// Introduce el denominador de la fracción: 18
// La fracción 3/18 = 1/6 invertida es la fracción 6/1
// Introduce el numerador de la fracción: 2
// Introduce el denominador de la fracción: 5
// La fracción 2/5 invertida es la fracción 5/2
// gcd(int a, int b){
//     if (a == b)
//         return a;
//     else if (a>b)
//         return gcd(a-b, b);
//     else
//         return gcd(a, b-a);
// }
// const numerator = console.readNumber('Introduce el numerador de la fracción: ');
// const denominator = console.readNumber('Introduce el denominador de la fracción: ');
// let gcd = numerator;
// do {
//     if ( numerator == denominator){
//         let gcd = numerator;
//     } 
// }
//  while ( numerator > denominator);
////////////////////////////////////////////////////////////////
// Considerar todos los meses de 30 días
// Las estaciones comienzan: primavera el 21/3; verano el 21/6; otoño el 21/9; invierno el 21/12; 
// Considerar: "a primeros" los 30 primeros días de la estación; "a mediados" los siguientes 30 días de la estación; "a finales" los últimos 30 días de la estación
// Escriba un día (1-30):  29
// Escriba un mes (1-12):  1
// Escriba un año (1-...):  2022
// El día 29 del 1 de 2022 cae a mediados de invierno.
// const DAYS_IN_MONTH = 30;
// const DAYS_IN_YEAR = DAYS_IN_MONTH * 12;
// const OFFSET_DAYS = 81;
// let day = console.readNumber('Escriba un día (1-30): ');
// let month = console.readNumber('Escriba un mes (1-12): ');
// // const year = console.readNumber('Escriba un año (1-...): ');
// // if( day < OFFSET_DAYS ) {
// //     day = DAYS_IN_YEAR + day;
// // }
// const day_of_year_offset = DAYS_IN_MONTH * (month - 1) + (day + OFFSET_DAYS);
// const day_of_year = DAYS_IN_MONTH * (month - 1) + day;
// const day_of_year = DAYS_IN_MONTH * month + ( day - DAYS_IN_MONTH);
// console.writeln(`dia del año: ${day_of_year} dia del año desplazado 81 días: ${day_of_year_offset}`)
////////////////////////////////////////////////////////////////
// Escribe un código que determine si una cadenas de caracteres es un palíndromo, 
// sin considerar espacios intermedios ni acentos de la cadena. P.e.: "Dabale arroz a la zorra el abad" sí es un palímdromo
// let isPalindrome = true; 
// // const stringInput = "otra cosa diferente".toLowerCase();
// // const stringInput = "Dabale arroz a la zorra el abad".toLowerCase();
// const stringInput = "amor a roma".toLowerCase();
// let stringNoBlank = "";
// for (let index = 0; index < stringInput.length; index++) {
//     stringInput[index] !== " " ? stringNoBlank +=  stringInput[index] : false;
// }
// for (let index = 0; index < stringNoBlank.length; index++) {
//     console.writeln( stringNoBlank[index] + ' ---  '  + stringNoBlank[stringNoBlank.length - (index + 1)])
//     stringNoBlank[index] !== stringNoBlank[ stringNoBlank.length - (index + 1)]? isPalindrome = false : false;
// }
// console.writeln(isPalindrome)
// ////////////////////////////////////////////////////////////////
// Escribe un código que determine si una serie 
// de números positivos (terminar en 0) está ordenada ascendentemente
// let number = 1;
// let previus ;
// do{
//     previus = number;
//     number = console.readNumber(`Introduce el siguiente número de la serie (0 para acabar);`);
// }while ( number != 0 && number >= previus) ;
// console.writeln(`La serie ${ number != 0 ? "no":"si" } es correlativa`);
////////////////////////////////////////////////////////////////
// Escribe un código para "adivinar" el número del 
// usuario en 0 y 1.000.000 
// inclusives mediante la búsqueda binaria: 
// ¿es menor, mayor o igual a 500.000? Mayor;
// ¿es menor, mayor o igual a750.000? ... Igual

var minor = 0;
var major = 1000000;
var middle = (major + menor) / 2;
var response = '';

do {
  middle = major / 2;
  response = console.readString("\xBFes menor, mayor o igual a ".concat(middle));

  if (response == 'mayor') {
    minor = middle;
    console.writeln("el valor de menor es ".concat(minor));
  } else if (response == 'menor') {
    major = middle;
    console.writeln("el valor de mayor es ".concat(major));
  }

  ;
} while (response != 'igual');