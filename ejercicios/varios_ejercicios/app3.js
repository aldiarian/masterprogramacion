const { Console } = require("./console");
const console = new Console();


let set = new Set();
const object = {a: 1, b: 2};
set.add('1');
set.add(true);
set.add('andrés')
set.add('cadena')
set.add(['andrés','ramirez'])
set.add(['fran',true, 23])
const array = ['fran',true, 23];
set.add(array)
console.writeln(set.has(array))
// for (const iterator of set) {
//     console.writeln(iterator)
// }


set = new Set([1, 1, true, 'cadena de caracteres', array, {a: 1, b: 2}, object]);
console.writeln(set.size);