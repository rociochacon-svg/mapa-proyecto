console.log("VERSION MULTIBUS 🔥");

// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔑 CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",
    authDomain: "flowcity1-44199.firebaseapp.com",
    databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
    projectId: "flowcity1-44199"
};

// 🔌 INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🗺️ MAPA
var map = L.map('map', {
    zoom: 15,
    minZoom: 13,
    maxZoom: 19
}).setView([2.4448, -76.6147], 13);

// 🗺️ CAPA
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 🔒 LIMITES
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);

map.setMaxBounds(popayanBounds);

// =======================================================
// 🧠 RUTAS
// =======================================================

window.rutas = {

    // 🔴 BUS 1 = rutaBus2
    rutaBus2: [

        [2.473751299045302,-76.55471920967103],
        [2.4730009801831168,-76.55512690544128]

        // 🔥 PEGA AQUÍ TODA TU RUTA ROJA COMPLETA
    ],

    // 🔵 BUS 2 = rutaBus3
    rutaBus3: [

        [2.4594308545037085,-76.64751291275026],
        [2.458648370686101,-76.64592504501344],
        [2.45863765172651,-76.64573192596437]

        // 🔥 PEGA AQUÍ TODA TU RUTA AZUL COMPLETA
        // IMPORTANTE:
        // SOLO UN [ AL INICIO
        // SOLO UN ] AL FINAL
    ]
};

// =======================================================
// 🟣 DIBUJAR RUTAS
// =======================================================

function dibujarRutas() {

    // borrar rutas anteriores
    if (window.lineaRutaBus2) {
        map.removeLayer(window.lineaRutaBus2);
    }

    if (window.lineaRutaBus3) {
        map.removeLayer(window.lineaRutaBus3);
    }

    // 🔴 RUTA BUS 1
    window.lineaRutaBus2 = L.polyline(
        window.rutas.rutaBus2,
        {
            color: '#ff0000',
            weight: 6,
            opacity: 1
        }
    ).addTo(map);

    // 🔵 RUTA BUS 2
    window.lineaRutaBus3 = L.polyline(
        window.rutas.rutaBus3,
        {
            color: '#0066ff',
            weight: 6,
            opacity: 1
        }
    ).addTo(map);

    console.log("RutaBus2:", window.rutas.rutaBus2);
    console.log("RutaBus3:", window.rutas.rutaBus3);
}

// 🔥 DIBUJAR AL INICIO
dibujarRutas();

// 🔥 AJUSTAR MAPA PARA VER AMBAS
map.fitBounds([
    ...window.rutas.rutaBus2,
    ...window.rutas.rutaBus3
]);

// =======================================================
// 🖱️ BUS ACTIVO
// =======================================================

// CAMBIAR AQUÍ:
// "rutaBus2" = editar roja
// "rutaBus3" = editar azul

window.busActivo = "rutaBus3";

// =======================================================
// 🖱️ AGREGAR PUNTOS
// =======================================================

map.on('click', function(e) {

    let punto = [
        e.latlng.lat,
        e.latlng.lng
    ];

    // agregar punto al bus activo
    window.rutas[window.busActivo].push(punto);

    dibujarRutas();

    console.log("Punto agregado:", punto);
});

// =======================================================
// 💾 GUARDAR RUTAS
// =======================================================

// 🔴 GUARDAR BUS 1
window.guardarRutaBus2 = function () {

    set(
        ref(db, "rutaBus2"),
        window.rutas.rutaBus2
    );

    console.log("RutaBus2 guardada 🔴");
};

// 🔵 GUARDAR BUS 2
window.guardarRutaBus3 = function () {

    set(
        ref(db, "rutaBus3"),
        window.rutas.rutaBus3
    );

    console.log("RutaBus3 guardada 🔵");
};

// =======================================================
// ❌ BORRAR RUTAS
// =======================================================

// 🔴 BORRAR BUS 1
window.borrarRutaBus2 = function () {

    window.rutas.rutaBus2 = [];

    dibujarRutas();

    console.log("RutaBus2 borrada ❌");
};

// 🔵 BORRAR BUS 2
window.borrarRutaBus3 = function () {

    window.rutas.rutaBus3 = [];

    dibujarRutas();

    console.log("RutaBus3 borrada ❌");
};

// =======================================================
// ↩️ DESHACER ÚLTIMO PUNTO
// =======================================================

// 🔴 DESHACER BUS 1
window.deshacerRutaBus2 = function () {

    window.rutas.rutaBus2.pop();

    dibujarRutas();

    console.log("Último punto Bus2 eliminado ↩️");
};

// 🔵 DESHACER BUS 2
window.deshacerRutaBus3 = function () {

    window.rutas.rutaBus3.pop();

    dibujarRutas();

    console.log("Último punto Bus3 eliminado ↩️");
};

// =======================================================
// 🚍 ICONO
// =======================================================

var busIcon = L.icon({
    iconUrl: 'img/auto1.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// =======================================================
// 🔴 BUS 1 EN TIEMPO REAL
// =======================================================

var markerBus1 = L.marker(
    [2.4448, -76.6147],
    {
        icon: busIcon
    }
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

// =======================================================
// 🔵 BUS 2 EN TIEMPO REAL
// =======================================================

var markerBus2 = L.marker(
    [2.4448, -76.6147],
    {
        icon: busIcon
    }
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

// =======================================================
// 📡 CARGAR RUTAS DESDE FIREBASE
// =======================================================

// 🔴 rutaBus2
const rutaBus2Ref = ref(db, "rutaBus2");

onValue(rutaBus2Ref, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        window.rutas.rutaBus2 = data;

        dibujarRutas();
    }
});

// 🔵 rutaBus3
const rutaBus3Ref = ref(db, "rutaBus3");

onValue(rutaBus3Ref, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        window.rutas.rutaBus3 = data;

        dibujarRutas();
    }
});
