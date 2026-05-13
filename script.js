console.log("VERSION MULTIBUS 🔥");

// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// 🔑 CONFIG FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",
    authDomain: "flowcity1-44199.firebaseapp.com",
    databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
    projectId: "flowcity1-44199"
};


// 🔌 INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



// ======================================================
// 🗺️ MAPA
// ======================================================

var map = L.map('map', {
    zoom: 15,
    minZoom: 13,
    maxZoom: 19
}).setView([2.4448, -76.6147], 13);


// 🌎 MAPA BASE
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


// 🔒 LÍMITES
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);

map.setMaxBounds(popayanBounds);



// ======================================================
// 🧠 RUTAS
// ======================================================

window.rutas = {};


// 🔴 RUTA BUS 1
window.rutas.rutaBus2 = [];


// 🔵 RUTA BUS 2
window.rutas.rutaBus3 = [];



// ======================================================
// 🎨 DIBUJAR RUTAS
// ======================================================

function dibujarRutas() {

    // borrar anteriores
    if (window.lineaRutaBus2) {
        map.removeLayer(window.lineaRutaBus2);
    }

    if (window.lineaRutaBus3) {
        map.removeLayer(window.lineaRutaBus3);
    }


    // 🔴 RUTA ROJA
    if (window.rutas.rutaBus2.length > 0) {

        window.lineaRutaBus2 = L.polyline(
            window.rutas.rutaBus2,
            {
                color: 'red',
                weight: 6,
                opacity: 0.8
            }
        ).addTo(map);
    }


    // 🔵 RUTA AZUL
    if (window.rutas.rutaBus3.length > 0) {

        window.lineaRutaBus3 = L.polyline(
            window.rutas.rutaBus3,
            {
                color: 'blue',
                weight: 6,
                opacity: 0.8
            }
        ).addTo(map);
    }
}



// ======================================================
// 🔥 BUS ACTIVO
// ======================================================

// 👇 CAMBIAR ENTRE:
// "rutaBus2"
// "rutaBus3"

window.busActivo = "rutaBus3";



// ======================================================
// 🖱️ AGREGAR PUNTOS
// ======================================================

map.on('click', function(e) {

    let punto = [
        e.latlng.lat,
        e.latlng.lng
    ];

    // agregar punto
    window.rutas[window.busActivo].push(punto);

    dibujarRutas();

    console.log("Punto agregado:", punto);
});



// ======================================================
// 💾 GUARDAR RUTAS
// ======================================================


// 🔴 GUARDAR RUTA ROJA
window.guardarRutaBus2 = function () {

    set(
        ref(db, "rutaBus2"),
        window.rutas.rutaBus2
    );

    console.log("Ruta roja guardada 🔴");
};


// 🔵 GUARDAR RUTA AZUL
window.guardarRutaBus3 = function () {

    set(
        ref(db, "rutaBus3"),
        window.rutas.rutaBus3
    );

    console.log("Ruta azul guardada 🔵");
};



// ======================================================
// ❌ BORRAR RUTAS
// ======================================================


// 🔴 BORRAR ROJA
window.borrarRutaBus2 = function () {

    window.rutas.rutaBus2 = [];

    dibujarRutas();

    console.log("Ruta roja borrada ❌");
};


// 🔵 BORRAR AZUL
window.borrarRutaBus3 = function () {

    window.rutas.rutaBus3 = [];

    dibujarRutas();

    console.log("Ruta azul borrada ❌");
};



// ======================================================
// ↩️ DESHACER ÚLTIMO PUNTO
// ======================================================


// 🔴 DESHACER ROJA
window.deshacerRutaBus2 = function () {

    window.rutas.rutaBus2.pop();

    dibujarRutas();
};


// 🔵 DESHACER AZUL
window.deshacerRutaBus3 = function () {

    window.rutas.rutaBus3.pop();

    dibujarRutas();
};



// ======================================================
// 🚍 ICONOS
// ======================================================

var busIcon = L.icon({
    iconUrl: 'img/auto1.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});



// ======================================================
// 🔴 BUS 1
// ======================================================

var markerBus1 = L.marker(
    [2.4448, -76.6147],
    { icon: busIcon }
).addTo(map);


const ubicacionBus1 = ref(db, 'bus1');


onValue(ubicacionBus1, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        markerBus1.setLatLng([
            data.lat,
            data.lng
        ]);
    }
});



// ======================================================
// 🔵 BUS 2
// ======================================================

var markerBus2 = L.marker(
    [2.4448, -76.6147],
    { icon: busIcon }
).addTo(map);


const ubicacionBus2 = ref(db, 'bus2');


onValue(ubicacionBus2, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        markerBus2.setLatLng([
            data.lat,
            data.lng
        ]);
    }
});



// ======================================================
// 📡 CARGAR RUTA ROJA
// ======================================================

const rutaBus2Ref = ref(db, "rutaBus2");


onValue(rutaBus2Ref, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        window.rutas.rutaBus2 = data;

        dibujarRutas();

        console.log("Ruta roja cargada 🔴");
    }
});



// ======================================================
// 📡 CARGAR RUTA AZUL
// ======================================================

const rutaBus3Ref = ref(db, "rutaBus3");


onValue(rutaBus3Ref, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        window.rutas.rutaBus3 = data;

        dibujarRutas();

        console.log("Ruta azul cargada 🔵");
    }
});
