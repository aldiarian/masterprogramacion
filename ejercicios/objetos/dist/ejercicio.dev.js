"use strict";

// ({a ,b, c} = { b: 'barco', a:'arbol', c:'cabra' });
// console.log(`${a}, ${b}, ${c}`);
var objeto = {};
objeto.nombre = 'alberto';
objeto["apellidos"] = 'diarian sancho';
objeto.direccion = {};
objeto.direccion.calle = 'c/virgen de belén';
objeto.direccion.numero = '33';

for (var key in objeto) {
  console.log("".concat(key, ": ").concat(objeto[key]));
}

console.log(objeto);