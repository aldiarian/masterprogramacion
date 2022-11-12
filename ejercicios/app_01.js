const { Console } = require("./console");
const console = new Console();


// 0-fraction / 0-inverse

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
// Las estaciones comienzan: 
// primavera el 21/3; 
// verano el 21/6; 
// otoño el 21/9; 
// invierno el 21/12; 

// Considerar: "a primeros" los 30 primeros días de la estación; "a mediados" los siguientes 30 días de la estación; "a finales" los últimos 30 días de la estación

// Escriba un día (1-30):  29
// Escriba un mes (1-12):  1
// Escriba un año (1-...):  2022
// El día 29 del 1 de 2022 cae a mediados de invierno.


// const DAYS_IN_MONTH = 30;
// const DAYS_IN_YEAR = DAYS_IN_MONTH * 12;



// const period = ['primeros', 'mediados', 'finales'];
// const seasons = ['primavera', 'verano', 'otoño', 'invierno'];

// const day = console.readNumber(`Escriba un día (1-30): `);
// const month = console.readNumber(`Escriba un mes (1-12): `);



////////////////////////////////////////////////////////////////
// Escribe un código que determine si una cadenas de caracteres es un palíndromo, 
// sin considerar espacios intermedios ni acentos de la cadena. P.e.: "Dabale arroz a la zorra el abad" sí es un palímdromo

// let UNNORMALIZED = 0;
// let NORMALIZED = 1;
// const REPLACEMENTS = [
//     [" ", "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
//     [ "", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// ];
    
// const text = "Dabale arroz a la Vorra el abad";
// let letter = "";
// let textNormalized = "";
// for (let i = 0; i < text.length; i++) {
//     letter = text[i];
//     for (let j = 0; letter == text[i] && j < REPLACEMENTS[UNNORMALIZED].length; j++) {
//         if (letter === REPLACEMENTS[UNNORMALIZED][j]) {
//             letter = REPLACEMENTS[NORMALIZED][j];
//         }
//     }
//     textNormalized += letter;
// }

// let isPalindrome = true;
// for ( let i = 0 , j = textNormalized.length -1 ;  isPalindrome  && i < j; i++ , j-- ) {
//     // ACUMULADOR BOOLEANO isPalindrome será el resultado de : isPalindrome AND( true o false )
//     isPalindrome &= textNormalized[i] === textNormalized[j];
// }

// console.writeln(  `El texto ${ isPalindrome ? `sí` : `no`} es palíndromo`  );

// ////////////////////////////////////////////////////////////////
// Escribe un código que determine si una serie 
// de números positivos (terminar en 0) está ordenada ascendentemente

// let EXITNUMBER = 0;
// let number = 1;
// let previus ;
// do{
//     previus = number;
//     number = console.readNumber(`Introduce el siguiente número de la serie (${EXITNUMBER} para acabar);`);
// }while ( number != EXITNUMBER && number >= previus) ;

// console.writeln(`La serie ${ number != EXITNUMBER ? "no":"si" } es correlativa`);

////////////////////////////////////////////////////////////////
// Escribe un código para "adivinar" el número del 
// usuario en 0 y 1.000.000 
// inclusives mediante la búsqueda binaria: 
// ¿es menor, mayor o igual a 500.000? Mayor;
// ¿es menor, mayor o igual a750.000? ... Igual

// let minor = 0;
// let major = 100;
// let middle = 0;
// let response = '';

// do{
//      middle = Math.round((major + minor) / 2);
//      response = console.readString(`¿es menor, mayor o igual a ${middle}`);
//      if (response == 'mayor') { 
//         minor = middle;
//     } else if (response == 'menor'){
//         major = middle ;
//     };
      
// } while ( response != 'igual');



////////////////////////////////////////////////////////////////
// TABLA DE NOMBRES

// const NAMES = [ "Uruguay", "Paraguay", "Gambia", "Djibouti", "Martinique", "Guam", "Georgia", "United States", "Belize", "Mauritius", "Lebanon", "Saudi Arabia", "Ecuador", "Marshall Islands", "Brazil", "Uganda", "Qatar", "Timor-Leste", "Mongolia", "Chile", "Liberia", "Nauru", "Réunion", "Montserrat", "Taiwan", "Antarctica", "Saint Pierre and Miquelon", "Argentina", "Togo", "Austria", "Grenada", "Faroe Islands", "Morocco", "Anguilla", "Palau", "Northern Mariana Islands", "Mauritania", "Ukraine", "China", "Lesotho", "Cyprus", "DR Congo", "Russia", "Bangladesh", "South Africa", "Curaçao", "Guatemala", "Puerto Rico", "Antigua and Barbuda", "Israel", "Guyana", "Cayman Islands", "Croatia", "Iceland", "Caribbean Netherlands", "Sint Maarten", "Namibia", "Dominica", "Gibraltar", "Senegal", "Saint Kitts and Nevis", "Oman", "Kuwait", "Åland Islands", "United States Virgin Islands", "Bouvet Island", "United Kingdom", "Honduras", "South Georgia", "Cambodia", "North Macedonia", "Iran", "Panama", "Cook Islands", "Andorra", "Burundi", "Trinidad and Tobago", "Comoros", "French Southern and Antarctic Lands", "Kosovo", "Nigeria", "Poland", "Niue", "New Caledonia", "Ethiopia", "Germany", "Azerbaijan", "Netherlands", "France", "Nepal", "Barbados", "Jersey", "India", "Kyrgyzstan", "South Sudan", "Iraq", "Italy", "Cuba", "Bhutan", "Bahamas", "Norway", "Lithuania", "Kenya", "Pitcairn Islands", "Sweden", "Guadeloupe", "Gabon", "Macau", "Guernsey", "Rwanda", "Syria", "Canada", "Algeria", "British Indian Ocean Territory", "Western Sahara", "Isle of Man", "Botswana", "Kazakhstan", "Venezuela", "French Polynesia", "Sudan", "Wallis and Futuna", "Slovakia", "Saint Barthélemy", "Christmas Island", "Solomon Islands", "Latvia", "British Virgin Islands", "Jamaica", "Afghanistan", "Serbia", "Tajikistan", "Tonga", "Kiribati", "Eritrea", "Mali", "Haiti", "Vanuatu", "Bosnia and Herzegovina", "Vatican City", "Benin", "Svalbard and Jan Mayen", "Samoa", "Bolivia", "Madagascar", "São Tomé and Príncipe", "Bahrain", "Greece", "Peru", "Suriname", "American Samoa", "Niger", "Thailand", "Tuvalu", "North Korea", "Ivory Coast", "Yemen", "New Zealand", "Armenia", "Pakistan", "Tokelau", "Malawi", "Ireland", "Philippines", "Czechia", "Myanmar", "Cocos (Keeling) Islands", "Romania", "Dominican Republic", "Equatorial Guinea", "Ghana", "Malta", "Turkey", "Egypt", "Mozambique", "Mayotte", "Belgium", "Slovenia", "Hungary", "United Arab Emirates", "Albania", "Heard Island and McDonald Islands", "Fiji", "San Marino", "Moldova", "Estonia", "Saint Vincent and the Grenadines", "United States Minor Outlying Islands", "Belarus", "Sri Lanka", "El Salvador", "Australia", "Bermuda", "Nicaragua", "Somalia", "Turks and Caicos Islands", "Micronesia", "Palestine", "Turkmenistan", "Burkina Faso", "Costa Rica", "Vietnam", "Cameroon", "French Guiana", "Eswatini", "Zambia", "Liechtenstein", "Montenegro", "Saint Lucia", "Uzbekistan", "Chad", "Aruba", "Denmark", "Japan", "Cape Verde", "Switzerland", "Hong Kong", "Bulgaria", "Jordan", "Republic of the Congo", "Laos", "Norfolk Island", "South Korea", "Tunisia", "Finland", "Zimbabwe", "Maldives", "Singapore", "Monaco", "Angola", "Malaysia", "Luxembourg", "Guinea", "Libya", "Spain", "Indonesia", "Seychelles", "Brunei", "Mexico", "Saint Helena", "Ascension and Tristan da Cunha", "Sierra Leone", "Central African Republic", "Greenland", "Colombia", "Papua New Guinea", "Falkland Islands", "Portugal", "Guinea-Bissau", "Saint Martin", "Tanzania" ];
// let selector;
// let space = ", ";
// let last_space = " y ";

// do{
//     selector = console.readNumber(`
//     1. Ver países
//     2. Buscar país
//     3. Salir
//     Escoge opción? [1-3]: `);

//     switch (selector) {
//         case 1:
//             for (let i = 0; i < NAMES.length; i++) {
//                 if(i === NAMES.length -2 ){
//                     console.write( NAMES[i] + last_space)
//                 } else if ( i === NAMES.length -1){
//                     console.write( NAMES[i])
//                 } else {
//                     console.write( NAMES[i] + space)
//                 }
//             }
//             break;
//         case 2:
//             let country = console.readString(`Dame el nombre del país: `);
//             let countryFound = false;
//             for (let i = 0; !countryFound && i < NAMES.length; i++) { // el !countryFound && evita que si ya lo hemos encontrado continúe la búsqueda
//                  NAMES[i] == country ? countryFound = true : "";
//             }
//             console.writeln(`El país "${country}" ${ countryFound ? "SÍ" : "NO"} está`);
//             break;
//         case 3:
//             break;
//         default:
//             console.writeln(`${selector} no es válido, tiene que ser 1, 2, o 3 `)
//     }

// }while( selector != 3 )




////////////////////////////////////////////////////////////////
// TABLAS DE REGIONES

const REGIONS = [ "Americas", "Americas", "Africa", "Africa", "Americas", "Oceania", "Asia", "Americas", "Americas", "Africa", "Asia", "Asia", "Americas", "Oceania", "Americas", "Africa", "Asia", "Asia", "Asia", "Americas", "Africa", "Oceania", "Africa", "Americas", "Asia", "Antarctic", "Americas", "Americas", "Africa", "Europe", "Americas", "Europe", "Africa", "Americas", "Oceania", "Oceania", "Africa", "Europe", "Asia", "Africa", "Europe", "Africa", "Europe", "Asia", "Africa", "Americas", "Americas", "Americas", "Americas", "Asia", "Americas", "Americas", "Europe", "Europe", "Americas", "Americas", "Africa", "Americas", "Europe", "Africa", "Americas", "Asia", "Asia", "Europe", "Americas", "Antarctic", "Europe", "Americas", "Antarctic", "Asia", "Europe", "Asia", "Americas", "Oceania", "Europe", "Africa", "Americas", "Africa", "Antarctic", "Europe", "Africa", "Europe", "Oceania", "Oceania", "Africa", "Europe", "Asia", "Europe", "Europe", "Asia", "Americas", "Europe", "Asia", "Asia", "Africa", "Asia", "Europe", "Americas", "Asia", "Americas", "Europe", "Europe", "Africa", "Oceania", "Europe", "Americas", "Africa", "Asia", "Europe", "Africa", "Asia", "Americas", "Africa", "Africa", "Africa", "Europe", "Africa", "Asia", "Americas", "Oceania", "Africa", "Oceania", "Europe", "Americas", "Oceania", "Oceania", "Europe", "Americas", "Americas", "Asia", "Europe", "Asia", "Oceania", "Oceania", "Africa", "Africa", "Americas", "Oceania", "Europe", "Europe", "Africa", "Europe", "Oceania", "Americas", "Africa", "Africa", "Asia", "Europe", "Americas", "Americas", "Oceania", "Africa", "Asia", "Oceania", "Asia", "Africa", "Asia", "Oceania", "Asia", "Asia", "Oceania", "Africa", "Europe", "Asia", "Europe", "Asia", "Oceania", "Europe", "Americas", "Africa", "Africa", "Europe", "Asia", "Africa", "Africa", "Africa", "Europe", "Europe", "Europe", "Asia", "Europe", "Antarctic", "Oceania", "Europe", "Europe", "Europe", "Americas", "Americas", "Europe", "Asia", "Americas", "Oceania", "Americas", "Americas", "Africa", "Americas", "Oceania", "Asia", "Asia", "Africa", "Americas", "Asia", "Africa", "Americas", "Africa", "Africa", "Europe", "Europe", "Americas", "Asia", "Africa", "Americas", "Europe", "Asia", "Africa", "Europe", "Asia", "Europe", "Asia", "Africa", "Asia", "Oceania", "Asia", "Africa", "Europe", "Africa", "Asia", "Asia", "Europe", "Africa", "Asia", "Europe", "Africa", "Africa", "Europe", "Asia", "Africa", "Asia", "Americas", "Africa", "Africa", "Africa", "Americas", "Americas", "Oceania", "Americas", "Europe", "Africa", "Americas", "Africa" ];
const SUBREGIONS = [ "South America", "South America", "Western Africa", "Eastern Africa", "Caribbean", "Micronesia", "Western Asia", "North America", "Central America", "Eastern Africa", "Western Asia", "Western Asia", "South America", "Micronesia", "South America", "Eastern Africa", "Western Asia", "South-Eastern Asia", "Eastern Asia", "South America", "Western Africa", "Micronesia", "Eastern Africa", "Caribbean", "Eastern Asia", undefined, "North America", "South America", "Western Africa", "Central Europe", "Caribbean", "Northern Europe", "Northern Africa", "Caribbean", "Micronesia", "Micronesia", "Western Africa", "Eastern Europe", "Eastern Asia", "Southern Africa", "Southern Europe", "Middle Africa", "Eastern Europe", "Southern Asia", "Southern Africa", "Caribbean", "Central America", "Caribbean", "Caribbean", "Western Asia", "South America", "Caribbean", "Southeast Europe", "Northern Europe", "Caribbean", "Caribbean", "Southern Africa", "Caribbean", "Southern Europe", "Western Africa", "Caribbean", "Western Asia", "Western Asia", "Northern Europe", "Caribbean", undefined, "Northern Europe", "Central America", undefined, "South-Eastern Asia", "Southeast Europe", "Southern Asia", "Central America", "Polynesia", "Southern Europe", "Eastern Africa", "Caribbean", "Eastern Africa", undefined, "Southeast Europe", "Western Africa", "Central Europe", "Polynesia", "Melanesia", "Eastern Africa", "Western Europe", "Western Asia", "Western Europe", "Western Europe", "Southern Asia", "Caribbean", "Northern Europe", "Southern Asia", "Central Asia", "Middle Africa", "Western Asia", "Southern Europe", "Caribbean", "Southern Asia", "Caribbean", "Northern Europe", "Northern Europe", "Eastern Africa", "Polynesia", "Northern Europe", "Caribbean", "Middle Africa", "Eastern Asia", "Northern Europe", "Eastern Africa", "Western Asia", "North America", "Northern Africa", "Eastern Africa", "Northern Africa", "Northern Europe", "Southern Africa", "Central Asia", "South America", "Polynesia", "Northern Africa", "Polynesia", "Central Europe", "Caribbean", "Australia and New Zealand", "Melanesia", "Northern Europe", "Caribbean", "Caribbean", "Southern Asia", "Southeast Europe", "Central Asia", "Polynesia", "Micronesia", "Eastern Africa", "Western Africa", "Caribbean", "Melanesia", "Southeast Europe", "Southern Europe", "Western Africa", "Northern Europe", "Polynesia", "South America", "Eastern Africa", "Middle Africa", "Western Asia", "Southern Europe", "South America", "South America", "Polynesia", "Western Africa", "South-Eastern Asia", "Polynesia", "Eastern Asia", "Western Africa", "Western Asia", "Australia and New Zealand", "Western Asia", "Southern Asia", "Polynesia", "Eastern Africa", "Northern Europe", "South-Eastern Asia", "Central Europe", "South-Eastern Asia", "Australia and New Zealand", "Southeast Europe", "Caribbean", "Middle Africa", "Western Africa", "Southern Europe", "Western Asia", "Northern Africa", "Eastern Africa", "Eastern Africa", "Western Europe", "Central Europe", "Central Europe", "Western Asia", "Southeast Europe", undefined, "Melanesia", "Southern Europe", "Eastern Europe", "Northern Europe", "Caribbean", "North America", "Eastern Europe", "Southern Asia", "Central America", "Australia and New Zealand", "North America", "Central America", "Eastern Africa", "Caribbean", "Micronesia", "Western Asia", "Central Asia", "Western Africa", "Central America", "South-Eastern Asia", "Middle Africa", "South America", "Southern Africa", "Eastern Africa", "Western Europe", "Southeast Europe", "Caribbean", "Central Asia", "Middle Africa", "Caribbean", "Northern Europe", "Eastern Asia", "Western Africa", "Western Europe", "Eastern Asia", "Southeast Europe", "Western Asia", "Middle Africa", "South-Eastern Asia", "Australia and New Zealand", "Eastern Asia", "Northern Africa", "Northern Europe", "Southern Africa", "Southern Asia", "South-Eastern Asia", "Western Europe", "Middle Africa", "South-Eastern Asia", "Western Europe", "Western Africa", "Northern Africa", "Southern Europe", "South-Eastern Asia", "Eastern Africa", "South-Eastern Asia", "North America", "Western Africa", "Western Africa", "Middle Africa", "North America", "South America", "Melanesia", "South America", "Southern Europe", "Western Africa", "Caribbean", "Eastern Africa" ];


let REGIONS_FILTERED = [];

for (const region of REGIONS) {
    let isFound = false;
    for (const regionFilter of REGIONS_FILTERED) {
        if( region === regionFilter){
            isFound = true;
        }
    }
    if (!isFound) {
        REGIONS_FILTERED[REGIONS_FILTERED.length] = region;
    }
}

let SUBREGIONS_FILTERED = [];

for (const regionFilter of REGIONS_FILTERED) {
    console.writeln(regionFilter + ":")
    for (let i = 0; i < REGIONS.length; i++) {
        if (REGIONS[i] === regionFilter) {
            let isFound = false;
            for (const iterator of SUBREGIONS_FILTERED) {
                if (SUBREGIONS[i] === iterator) {
                    isFound = true;
                }
            }
            if (!isFound) {
                SUBREGIONS_FILTERED[SUBREGIONS_FILTERED.length] = SUBREGIONS[i]
                if (SUBREGIONS[i] != undefined) {
                    console.writeln(`    ${SUBREGIONS[i]}`)
                }
            }
        }
    }
}
