console.log("VERSION NUEVA - BUS1 🔥");

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

// 🔒 límites
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);
map.setMaxBounds(popayanBounds);

// 🧠 RUTA EN MEMORIA
window.ruta = window.ruta || [
  // 🔥 TU RUTA YA EXISTENTE
  [2.473751299045302,-76.55471920967103],
  [2.4730009801831168,-76.55512690544128]
];

// 🟣 DIBUJO
function dibujarRuta() {

    if (window.lineaRuta) {
        map.removeLayer(window.lineaRuta);
    }

    window.lineaRuta = L.polyline(window.ruta, {
        color: '#fe24bc',
        weight: 6,
        opacity: 0.7,
        lineCap: 'round'
    }).addTo(map);
}

dibujarRuta();

// 🖱️ AGREGAR PUNTOS
map.on('click', function(e) {

    let punto = [e.latlng.lat, e.latlng.lng];

    window.ruta.push(punto);

    dibujarRuta();
});

// 💾 GUARDAR RUTA
window.guardarRuta = function () {

    set(ref(db, "rutaBus2"), window.ruta);

    console.log("Ruta guardada 🔥");
};

// ❌ BORRAR RUTA
window.borrarRuta = function () {

    window.ruta = [];

    dibujarRuta();

    console.log("Ruta borrada ❌");
};

// ↩️ DESHACER ÚLTIMO PUNTO
window.deshacerPunto = function () {

    window.ruta.pop();

    dibujarRuta();

    console.log("Último punto eliminado ↩️");
};

// 🚍 BUS EN TIEMPO REAL
var busIcon = L.icon({
    iconUrl: 'img/auto1.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

var marker = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

const ubicacionRef = ref(db, 'bus1');

onValue(ubicacionRef, (snapshot) => {

    const data = snapshot.val();

    if (data) {
        marker.setLatLng([data.lat, data.lng]);
        map.panTo([data.lat, data.lng]);
    }
});

// 📡 CARGAR RUTA DESDE FIREBASE
const rutaRef = ref(db, "rutaBus2");

onValue(rutaRef, (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    window.ruta = data;

    dibujarRuta();
});
