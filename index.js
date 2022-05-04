const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

firstPeticion();
var altura ,anchura;
function firstPeticion(){
    rl.question('Cuanta altura quieres?', async function (data) {
        altura =  Number(data);
        if(altura > 2){
            SecondPeticion();
        }else{
            firstPeticion();
        }
        
    });
}
function SecondPeticion(){
    rl.question('Cuanto ancho quieres?', async function (data) {
        altura =  Number(data);
        if(altura > 2){

        }else{
            SecondPeticion();
        }
        
    });
}
/*
00 > 90%   *      90 <  " - "
["-"],["-"],["-"],
["-"],["-"],["-"],
["-"],["-"],["-"]
*/

rl.on('close', function () {
    process.exit(0);
});