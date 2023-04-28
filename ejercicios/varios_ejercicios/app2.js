const { Console } = require("./console");
const console = new Console();


function Clazz(parameter) {
    this.publicAttributeX = parameter;
    this.publicAttributeY = 0;
}


Clazz.prototype.publicInstanceMethod = function(){
    privateFunction(this);
    console.writeln(`publicAttributeX ${this.publicAttributeX} publicAttributeY ${this.publicAttributeY} nuevo ${Clazz.atributodeclase}`)

    function privateFunction(obj){
        obj.publicAttributeX++;
        obj.publicAttributeY++;
    }
}




Clazz.atributodeclase = 'nuevograndeee';

const object = new Clazz(31);
object.publicInstanceMethod();
