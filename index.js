let fs = require('fs');
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
}  // Identifica en qué coordenada debe parar el programa


function find(m,x,y,n, camino) {
    let Limx = m.length;
    let Limy = m[0].length;

    if(x >= Limx || y >= Limy) { return false; }  // caso en el que excedemos los límites de la matriz
    let posicionactual = [x,y];

    if(JSON.stringify(n) === JSON.stringify(posicionactual)){  // comparamos la posición actual con la coordenada de término para ver si logramos hacer un camino completo
        camino.push(posicionactual);  // agregamos la última posición del camino
        caminos.push(camino);
    } else {
        camino.push(posicionactual);

        if(SiPuede(m,x,y+1,camino)) {  // se mueve derecha
            // movimientoanterior = 0;
            find(m, x, y + 1, n, camino.slice());
        }

        if(SiPuede(m,x+1,y,camino)) {  // se mueve para abajo
            // movimientoanterior = 3;
            find(m,x+1,y,n, camino.slice());
        }

        if(SiPuede(m,x,y-1,camino)) {  // se mueve izquierda
            // movimientoanterior = 2;
            find(m,x,y-1,n, camino.slice());
        }

        if(SiPuede(m,x-1,y,camino)){  //se mueve arriba
            // movimientoanterior = 2;
            find(m,x-1,y,n,camino.slice());
        }
        else { return 0; }
    }
}

function SiPuede(m,x,y,camino) {

    let Limx = m.length;
    let Limy = m[0].length;
    let nueva_pos = [x,y];

    let bool = true;
    camino.forEach(function (coordenada) {
        if(JSON.stringify(coordenada) === JSON.stringify(nueva_pos)) { bool = false; }  // para que no se devuelva por el mismo camino
    })  //agregar que si está en el camino no puede entrar

    if(x < 0 || y < 0) {return false;} // Caso en que se le pasan coordenadas negativas a la función

    if(x<Limx && y<Limy && m[x][y]===0) {
        return bool;
    } else { return false; }
}


find(m, coordenadaPartida[0], 0, coordenadaTermino, camino)
console.log(caminos);

var n=0
var cami = []
function  separaCamino(camino){
    var cas
    if(n>=caminos.length){
        return cas
    }
    else{
        cas = caminos[n].join("; ")
        cami.push(cas)
        n++
    }return separaCamino(camino)
}

separaCamino(caminos)
var cam = cami.join("\n")
console.log(cami)


var fileout = './output.txt';
fs.writeFile(fileout, cam.toString(), function (err) {
        if (err) {console.log(err);}
    }
)
