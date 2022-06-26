let _= require('underscore');
let fs = require('fs');
let file = require('file-saver')
let m = inputFile("input.txt");

let camino = [];
let caminos = [];

let coordenadaPartida = partida(m);
let coordenadaTermino = final(m);

function separar(input) {  // a esta función se le pasa la variable que contiene el texto de entrada y entrega la matriz formateada
    let m = [];
    input.forEach(function (linea) {
        linea = linea.replace(/(\r\n|\n|\r)/gm,"");  // para eliminar los saltos de línea del texto
        // Fuente: https://www.iteramos.com/pregunta/41037/como-eliminar-todos-los-saltos-de-linea-de-una-cadena)
        linea = linea.split(" ");  // Separamos el texto en comas
        linea = formatear(linea);
        m.push(linea);
    });
    return m;
}

function formatear(subArray) {  // A esta función se le pasa un array de strings y lo convierte en array de números
    return subArray.map(function (numero) {
        temp = Number.parseInt(numero);
        return temp;
    });
}

function inputFile(file) {
    var input = fs.readFileSync(file, 'utf8').toString().split('\n');
    input = separar(input);
    return input;
}
function partida(m) {  // da en qué punto debe partir a recorrer (te dice donde está el 0 inicial)
    let cont = 0;
    let iniciofinal = 0;
    m.forEach(function (coordenada){
        cont += 1;
        if(coordenada[0] === 0) {
            iniciofinal = cont-1;
        }
    });
    return [iniciofinal, 0];
}

function final(m) {
    let cont = 0;
    let coorfinal = [];
    let y = m[0].length;
    m.forEach(function (coordenada) {
        let ultimo = coordenada[y-1]
        if (ultimo === 0) {
            return coorfinal = [cont, y-1];
        }
        cont += 1;
    });
    return coorfinal;
}
