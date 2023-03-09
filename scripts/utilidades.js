function arrayNumAleatDifer(cantidad, min, max) {
    if(max-min+1<cantidad){
        return -1;
    }
    let array = [];
    for (let i = 0; i < cantidad; i++) {
        let numAle;
        do{
            numAle = Math.floor(Math.random() * (max - min + 1) + min);
        }while(array.includes(numAle));
        array[i] = numAle;
    }
    return array;
}