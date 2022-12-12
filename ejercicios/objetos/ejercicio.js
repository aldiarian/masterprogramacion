// ({a ,b, c} = { b: 'barco', a:'arbol', c:'cabra' });
// console.log(`${a}, ${b}, ${c}`);

let objeto = {};

objeto.nombre = 'alberto';
objeto["apellidos"] = 'diarian sancho';

objeto.direccion = {};
objeto.direccion.calle = 'c/virgen de belén'
objeto.direccion.numero = '33'

for (const key in objeto) {
    console.log( `${key}: ${objeto[key]}` );
}

console.log( objeto );