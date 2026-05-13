console.log("VERSION MULTIBUS 🔥");

// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// 🔑 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",
  authDomain: "flowcity1-44199.firebaseapp.com",
  databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
  projectId: "flowcity1-44199"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🗺️ MAPA
var map = L.map('map', {
    zoom: 15,
    minZoom: 13,
    maxZoom: 19
}).setView([2.4448, -76.6147], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 🔒 LIMITES
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);

map.setMaxBounds(popayanBounds);



// 🧠 RUTAS
window.rutas = {

    // 🔴 BUS 1 = RUTA 2
    rutaBus2: [

        // PEGA AQUÍ TODAS LAS COORDENADAS
        [2.473751299045302,-76.55471920967103],
        [2.4730009801831168,-76.55512690544128]

    ],

    // 🔵 BUS 2 = RUTA 3
    rutaBus3: [

        // PEGA AQUÍ LAS NUEVAS COORDENADAS
        // EJEMPLO:
        // [2.444, -76.601],
        // [2.445, -76.602]

    ]
};



// 🟣 DIBUJAR RUTAS
function dibujarRuta() {

    // borrar anteriores
    if (window.lineaRutaBus2) {
        map.removeLayer(window.lineaRutaBus2);
    }

    if (window.lineaRutaBus3) {
        map.removeLayer(window.lineaRutaBus3);
    }

    // 🔴 RUTA BUS 1
    window.lineaRutaBus2 = L.polyline(window.rutas.rutaBus2, {
        color: 'red',
        weight: 6,
        opacity: 0.8
    }).addTo(map);

    // 🔵 RUTA BUS 2
    window.lineaRutaBus3 = L.polyline(window.rutas.rutaBus3, {
        color: 'blue',
        weight: 6,
        opacity: 0.8
    }).addTo(map);
}

dibujarRuta();



// 🔥 BUS ACTIVO
window.busActivo = "rutaBus3";

// 🖱️ AGREGAR PUNTOS
map.on('click', function(e) {

    let punto = [e.latlng.lat, e.latlng.lng];

    // agregar al bus activo
    window.rutas[window.busActivo].push(punto);

    dibujarRuta();
});



// 💾 GUARDAR RUTAS

// 🔴 BUS 1
window.guardarRutaBus2 = function () {

    set(ref(db, "rutaBus2"), window.rutas.rutaBus2);

    console.log("Ruta Bus 1 guardada 🔴");
};

// 🔵 BUS 2
window.guardarRutaBus3 = function () {

    set(ref(db, "rutaBus3"), window.rutas.rutaBus3);

    console.log("Ruta Bus 2 guardada 🔵");
};



// ❌ BORRAR

window.borrarRutaBus2 = function () {

    window.rutas.rutaBus2 = [];

    dibujarRuta();
};

window.borrarRutaBus3 = function () {

    window.rutas.rutaBus3 = [];

    dibujarRuta();
};



// ↩️ DESHACER

window.deshacerRutaBus2 = function () {

    window.rutas.rutaBus2.pop();

    dibujarRuta();
};

window.deshacerRutaBus3 = function () {

    window.rutas.rutaBus3.pop();

    dibujarRuta();
};



// 🚍 ICONO
var busIcon = L.icon({
    iconUrl: 'img/auto1.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});



// 🔴 BUS 1 EN TIEMPO REAL
var markerBus1 = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

const ubicacionBus1 = ref(db, 'bus1');

onValue(ubicacionBus1, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        markerBus1.setLatLng([data.lat, data.lng]);
    }
});



// 🔵 BUS 2 EN TIEMPO REAL
var markerBus2 = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

const ubicacionBus2 = ref(db, 'bus2');

onValue(ubicacionBus2, (snapshot) => {

    const data = snapshot.val();

    if (data) {

        markerBus2.setLatLng([data.lat, data.lng]);
    }
});



// 📡 FIREBASE RUTAS

const rutaBus2Ref = ref(db, "rutaBus2");

onValue(rutaBus2Ref, (snapshot) => {

    window.rutas.rutaBus2 = snapshot.val() || [];

    dibujarRuta();
});


const rutaBus3Ref = ref(db, "rutaBus3");

onValue(rutaBus3Ref, (snapshot) => {

    window.rutas.rutaBus3 = snapshot.val() || [];

    dibujarRuta();
});
