//Variables globales
const MAX_OPCIONES = 8;
const MAX_PREGUNTAS = 10;
let preguntasYaUsadas = [];
let contadorPregunta = 0;
let preguntaObjeto;
let puntuacion = 0;

//Capturamos los componentes donde irán los datos
document.getElementById("maxPregunta2").innerText = MAX_PREGUNTAS;
let nodopregunta = document.getElementById("pregunta");
let nodoOpciones = document.forms.respuesta.opcionUser;
let contadorPreguntaDom = document.getElementById("contadorPregunta");
let modal = new bootstrap.Modal(document.getElementById('pantallaFinal'));
let barraProgreso = document.getElementsByClassName("progress-bar")[0];
let progreso = document.getElementsByClassName("progress")[0];
let btnPuntuacion = document.getElementById("btnPuntuacion");
let btnRepetir = document.getElementById("btnRepetir");
let btnRepetir2 = document.getElementById("btnRepetir2");

//Ocultamos los elementos que no se usaran aún
btnPuntuacion.style.display="none";
btnRepetir2.style.display="none";

function pregunta() {
    progreso.style.display="none";
    //Cogemos el indice de un objeto a adivinar diferente a las preguntas usadas
    let indiceObjeto;
    do {
        indiceObjeto = Math.floor(Math.random() * (preguntasRespuestas.length));
    } while (preguntasYaUsadas.includes(indiceObjeto))

    //Si la pregunta no ha sido usada la guardamos en la array de usadas
    preguntasYaUsadas.push(indiceObjeto);

    //seteamos el objeto en el indice elegido
    preguntaObjeto = preguntasRespuestas[indiceObjeto];

    //Creamos la array de opciones
    let indiceOpcionesArray = arrayNumAleatDifer(MAX_OPCIONES, 0, preguntasRespuestas.length - 1);
    if (!indiceOpcionesArray.includes(indiceObjeto)) {
        indiceOpcionesArray[0] = indiceObjeto;
        indiceOpcionesArray.sort();
    }

    let opcionesArray = [];
    for (let i = 0; i < MAX_OPCIONES; i++) {
        opcionesArray[i] = preguntasRespuestas[indiceOpcionesArray[i]].respuesta;
    }

    //Insertamos las opciones
    for (let i = 0; i < MAX_OPCIONES; i++) {
        let opciones = document.createElement("option");
        opciones.appendChild(document.createTextNode(opcionesArray[i]));
        opciones.setAttribute("value", opcionesArray[i]);
        nodoOpciones.appendChild(opciones);
    }

    //Seteamos los valores en el DOM
    nodopregunta.innerText = preguntaObjeto.pregunta;

    contadorPreguntaDom.innerText = "Pregunta " + ++contadorPregunta + " de " + MAX_PREGUNTAS;
};

function limpiarNodos() {
    nodopregunta.innerText = "";
    nodoOpciones.innerHTML = "";
    barraProgreso.style.width = "100%";

    nodoOpciones.disabled = false;
}

function respuestaCorrecta() {
    let opciones = nodoOpciones.options;
    let opcionElegida;
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].value == nodoOpciones.value) {
            opcionElegida = opciones[i];
        }
    }
    opcionElegida.style.backgroundColor = "green";
    opcionElegida.style.color = "white";
    nodoOpciones.value = "";
    puntuacion++;
    nodoOpciones.disabled = true;
}

function respuestaIncorrecta() {
    let opciones = nodoOpciones.options;
    let opcionElegida;
    let opcionCorrecta;
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].value == nodoOpciones.value) {
            opcionElegida = opciones[i];
        }else if(opciones[i].value==preguntaObjeto.respuesta){
            opcionCorrecta = opciones[i];
        }
    }
    opcionElegida.style.backgroundColor = "red";
    opcionElegida.style.color = "white";
    
    opcionCorrecta.style.backgroundColor = "green";
    opcionCorrecta.style.color = "white";
    nodoOpciones.value = "";
    nodoOpciones.disabled = true;
}

function nuevaPregunta() {
    setTimeout(() => {
        limpiarNodos();
        pregunta();
    }, 2000);
}

function finalizar() {
    setTimeout(() => {
        document.getElementById("acertados").innerText = puntuacion;
        modal.show();
        progreso.style.display="none";
        contadorPreguntaDom.style.display="none";
        btnPuntuacion.innerText="Puntuación: " + puntuacion + "/" + MAX_PREGUNTAS;
        if(puntuacion>4){
            btnPuntuacion.className += " btn-success";
        }else{
            btnPuntuacion.className += " btn-danger";
        }
        btnPuntuacion.style.display="";
        btnRepetir2.style.display="";
    }, 2000);
}

function esperar() {
    
    let progreso = 100;
    let intervalor = setInterval(porcentaje, 15);
    function porcentaje() {
        if (progreso < 0) {
            clearInterval(intervalor);
        } else {
            progreso--;
            barraProgreso.style.width = "" + progreso + "%";
        }
    }
    
}

pregunta();

//Capturamos el evento OnChange
nodoOpciones.onchange = () => {
    progreso.style.display="";
    if (contadorPregunta < MAX_PREGUNTAS) {
        if (nodoOpciones.value === preguntaObjeto.respuesta) {
            respuestaCorrecta();
        } else {
            respuestaIncorrecta();
        }
        esperar();
        nuevaPregunta()
    } else {
        if (nodoOpciones.value === preguntaObjeto.respuesta) {
            respuestaCorrecta();
        } else {
            respuestaIncorrecta();
        }
        esperar();
        finalizar()
    }
}

//Botones que resetean el test
btnRepetir.onclick = ()=>{
    location.reload();
}

btnRepetir2.onclick = ()=>{
    location.reload();
}