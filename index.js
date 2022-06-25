let _= require('underscore')
let fs = require('fs');

function separar(input) {  // a esta función se le pasa la variable que contiene el texto de entrada y entrega la matriz formateada
    let m = [];
    input.forEach(function (linea) {
        linea = linea.replace(/(\r\n|\n|\r)/gm,"");  // para eliminar los saltos de línea del texto
        // Fuente: https://www.iteramos.com/pregunta/41037/como-eliminar-todos-los-saltos-de-linea-de-una-cadena)
        linea = linea.split(" ");  // Separamos el texto en comas
        linea = formatear(linea);

        m.push(linea)
    });
    return m;
}

function formatear(subArray) {  // A esta función se le pasa un array de strings y lo convierte en array de números
    return subArray.map(function (numero) {
        temp = Number.parseInt(numero);
        return temp;
    });
}

function inputFile(file){
    var input = fs.readFileSync(file, 'utf8').toString().split('\n');
    input = separar(input);
    return input;
}


m = inputFile("input.txt")

console.log(m);

Limx = m.length -1
Limy= m[0].length -1

camino=[]
arraydecaminos=[]

function partida(m){
    let cont=0
    let iniciofinal=0
    m.forEach(function (coordenada){
        cont+=1
        if(coordenada[0]===0){
            iniciofinal=cont-1
        }
    })
    return iniciofinal
}   // da en qué punto debe partir a recorrer (te dice donde está el 0 inicial)
inicio= partida(m)

function final(m) {
    let cont=0
    let coorfinal = []
    let nfinal = 0
    m.forEach(function (coordenada) {
        cont += 1
        if (coordenada[m.length - 1] === 0) {
            nfinal = cont - 1
            coorfinal.push(nfinal, m.length - 1)
        }
    })
    return coorfinal
}  //identifica en qué coordenada debe parar el programa
termino= final(m)


function find(m,x,y,n){
    if(x>Limx || y>Limy){
        return false
    }
    let posicionactual=[x,y]

    if( JSON.stringify(n)===JSON.stringify(posicionactual)){  //esta es la manera de comparar arrays xd
        arraydecaminos.push(camino)
        return camino
    }


    else{
        if(SiPuede(m,x,y+1,camino) ) {
            let coordenada = [x, y]//se mueve derecha
            camino.push(coordenada)
            movimientoanterior=0
            return find(m, x, y + 1, n)
        }

        if(SiPuede(m,x+1,y,camino)){
            let coordenada=[x,y]
            camino.push(coordenada)//se mueve para abajo
            movimientoanterior=3
            return find(m,x+1,y,n)
        }

        if(SiPuede(m,x,y-1,camino)){        //se mueve izquierda
            let coordenada=[x,y]
            camino.push(coordenada)
            movimientoanterior=2
            return find(m,x,y-1,n)
        }

        if(SiPuede(m,x-1,y,camino)){        //se mueve arriba
            let coordenada=[x,y]
            camino.push(coordenada)
            movimientoanterior=2
            return find(m,x-1,y,n)

        }else{
            return true
        }
    }
}


function SiPuede(m,x,y,camino){
    bool=true
    camino.forEach(function (coordenada){
        coor= [x,y]
        if(JSON.stringify(coordenada)===JSON.stringify(coor)){
            bool= false
        }
    })//agregar que si está en el camino no puede entrar
    if(x<=Limx && y<=Limy && m[x][y]===0 ){
        return bool
    }else{
        return false
    }

}

console.log(find(m,inicio,0,termino))