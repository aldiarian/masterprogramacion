const { Console } = require("./console");
const console = new Console();


function Clazz(parameter) {
    this.publicAttributeX = parameter;
    this.publicAttributeY = 0;
    this.publicInstanceMethod = function () {
            privateFunction(this);
            console.writeln(`publicAttributeX: ${this.publicAttributeX} - publicAttributeY: ${this.publicAttributeY}`);
            console.writeln(`publicClazzAttribute: ${Clazz.publicClazzAttribute}`);
        }

    function privateFunction(object) {
        object.publicAttributeX++;
        object.publicAttributeY++;
    }
}

Clazz.publicClazzAttribute = "global";
Clazz.publicClazzMethod = function(value){
    Clazz.publicClazzAttribute = value;
}



const object = new Clazz(1);

Clazz.publicClazzMethod('jander')
console.writeln('asdf ' + Clazz.publicClazzAttribute)
console.writeln('asdf ' + object.publicClazzMethod())