class Matrix {
    constructor(altura, anchura) {
        this._altura = altura;
        this._anchura = anchura;
        this._matrix = this._generateRandom();
    }
    _generateRandom() {
        let matrix = new Array(this._altura).fill(new Array(this._anchura).fill('')).map(fila => fila.map(_ => 0));
        for (let fi = 1; fi < matrix.length - 1; fi++) {
            for (let ci = 1; ci < matrix[fi].length - 1; ci++) {
                matrix[fi][ci] = Math.round(Math.random());
            }
        }
        return matrix;
    }
    setAlive(x, y) {
        this._matrix[x][y] = 1
    }
    /*setAnchura(anchura) {
        this.anchura = anchura
    }
    setAltura(altura) {
        this.altura = altura
    }*/
    getMatrix() {
        return this._matrix;
    }
    setMatrix(matrix) {
        this._matrix = matrix;
    }
    getAnchura() {
        return this._anchura;
    }
    getAltura() {
        return this._altura;
    }
    show() {
        console.log(this._matrix.map(f => f.join(' ')).join('\n'))
    }
}


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function CoordX(max, resolver) {
    return new Promise((resolve) => {
        rl.question('Coordenada x => ', function (data) {
            let cord = +data;
            if (cord != undefined || cord != null) {
                if (cord > 0 && cord < max) resolver ? resolver(cord) :resolve(cord);
                else CoordX(max, resolver ? resolver : resolve); 
            } else CoordX(max, resolver ? resolver : resolve); 
        });
    });
}

function CoordY(max, resolver) {
    return new Promise((resolve) => {
        rl.question('Coordenada y => ', function (data) {
            let cord = +data;
            if (cord != undefined || cord != null) {
                if (cord > 0 && cord < max) resolver ? resolver(cord) :resolve(cord);
                else CoordY(max, resolver ? resolver : resolve); 
            } else CoordY(max, resolver ? resolver : resolve); 
        });
    });
}

function askOption() {
    return new Promise((resolve) => {
        rl.question('Selecciona una opción:', async function (data) {
            resolve(data);
        });
    });
}

async function main() {
    let matrix = new Matrix(5, 5)

    let char = 's';

    while (char == 's') {
        console.log("bienvenidos al juego de la vida");
        console.log("1 - ingrese posision del virus");
        console.log("2 - verificar si estan vivos");
        const opc = await askOption();

        switch (opc) {
            case '1':
                const x = await CoordX(matrix.getAnchura() - 1);
                const y = await CoordY(matrix.getAltura() - 1);
                matrix.setAlive(y, x);
                break;
            case '2':
                matrix.show();
                matrix.setMatrix(nextGeneration(matrix));
                break;
            default:

        }
        console.log("desea continuar s/n:");
        char = await askOption();
    }
}

function nextGeneration(matrix){
    let aux = new Array(matrix.getAltura()).fill(new Array(matrix.getAnchura()).fill('')).map(fila => fila.map(_ => 0));
    
    for (let x = 1; x < matrix.getMatrix().length - 1; x++) {
        for (let y = 1; y < matrix.getMatrix()[x].length -1; y++) {
            let VecinosVivos = 0;
            if (matrix.getMatrix()[x-1][y-1] == 1) VecinosVivos++;
            if (matrix.getMatrix()[x][y-1] == 1) VecinosVivos++;
            if (matrix.getMatrix()[x+1][y-1] == 1) VecinosVivos++;
            
            if (matrix.getMatrix()[x-1][y] == 1) VecinosVivos++;
            if (matrix.getMatrix()[x+1][y] == 1) VecinosVivos++;
            
            if (matrix.getMatrix()[x-1][y+1] == 1) VecinosVivos++;
            if (matrix.getMatrix()[x][y+1] == 1) VecinosVivos++;
            if (matrix.getMatrix()[x+1][y+1] == 1) VecinosVivos++;
            // console.log(VecinosVivos);
            if (matrix.getMatrix()[x][y] == 0){
                if (VecinosVivos == 3) aux[x][y] = 1;
            } else {
                if (VecinosVivos == 2 || VecinosVivos == 3){
                    aux[x][y] = 1;
                }
            }
        }
    }
    
    return aux
} 
/*
x > 0
y > 0
y < max
x < max
(x=x-1, y=y-1) (x=x, y=y-1) (x=x+1, y=y-1)
(x=x-1, y=y)                (x=x+1, y=y)
(x=x-1, y=y+1) (x=x, y=y+1) (x=x+1, y=y+1)

["00"],["01"],["02"],["03"],["04"],
["10"],["11"],["12"],["13"],["14"],
["20"],["21"],["22"],["23"],["24"],
["30"],["31"],["32"],["33"],["44"],
["40"],["41"],["42"],["43"],["44"],

0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
0 0 0 0 0
0 0 0 0 0
*/


rl.on('close', function () {
    process.exit(0);
});
/*
    [ 0, 0, 0, 0 ],
    [ 0, x, 0, 0 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, x, 0 ],
    [ 0, x, 0, 0 ]

    1 toda celda viva con menos de 2 vecinos vivos muere
    2 toda celda viva con mas de 3 vecinos vivos muere
    3 toda celda viva con 2 o 3 vecinos vivos, vive en la siguente generacion
    4 toda celda muerta con exactamente 3 vecinos vivos vuelve a la vida
*/

// var foo = 0;
/*
bienvenidos al juego de la vida
op1
op2
ingrese la opcion:
*/



main();
