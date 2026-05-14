console.log("VERSION MULTIBUS FIX 🔥");

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



// 🧠 RUTAS EN MEMORIA
window.rutas = {
  rutaBus2: [ /* 🔴 TU RUTA ROJA (BUS 1) */ ],
  rutaBus3: [ /* 🔵 TU RUTA AZUL (BUS 2) */ ]
};


// 🟣 CAPAS FIJAS (IMPORTANTE)
let layerBus2 = L.layerGroup().addTo(map);
let layerBus3 = L.layerGroup().addTo(map);


// 🟣 DIBUJAR RUTAS (CLAVE DEL FIX)
function dibujarRutas() {

  layerBus2.clearLayers();
  layerBus3.clearLayers();

  // 🔴 ROJA
  L.polyline(window.rutas.rutaBus2, {
    color: 'red',
    weight: 6,
    opacity: 0.8
  }).addTo(layerBus2);

  // 🔵 AZUL
  L.polyline(window.rutas.rutaBus3, {
    color: 'blue',
    weight: 6,
    opacity: 0.8
  }).addTo(layerBus3);
}

dibujarRutas();



// 🖱️ CLICK PARA AGREGAR (opcional: usa bus activo)
window.busActivo = "rutaBus2";

map.on('click', function(e) {
  let punto = [e.latlng.lat, e.latlng.lng];

  window.rutas[window.busActivo].push(punto);
  dibujarRutas();
});



// 💾 GUARDAR
window.guardarRutaBus2 = function () {
  set(ref(db, "rutaBus2"), window.rutas.rutaBus2);
};

window.guardarRutaBus3 = function () {
  set(ref(db, "rutaBus3"), window.rutas.rutaBus3);
};



// ❌ BORRAR
window.borrarRutaBus2 = function () {
  window.rutas.rutaBus2 = [];
  dibujarRutas();
};

window.borrarRutaBus3 = function () {
  window.rutas.rutaBus3 = [];
  dibujarRutas();
};



// ↩️ DESHACER
window.deshacerRutaBus2 = function () {
  window.rutas.rutaBus2.pop();
  dibujarRutas();
};

window.deshacerRutaBus3 = function () {
  window.rutas.rutaBus3.pop();
  dibujarRutas();
};



// 🚍 ICONOS
var busIcon = L.icon({
  iconUrl: 'img/auto1.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});


// 🔴 BUS 1
var markerBus1 = L.marker([2.4448, -76.6147], { icon: busIcon }).addTo(map);
onValue(ref(db, 'bus1'), (snap) => {
  const d = snap.val();
  if (d) markerBus1.setLatLng([d.lat, d.lng]);
});


// 🔵 BUS 2
var markerBus2 = L.marker([2.4448, -76.6147], { icon: busIcon }).addTo(map);
onValue(ref(db, 'bus2'), (snap) => {
  const d = snap.val();
  if (d) markerBus2.setLatLng([d.lat, d.lng]);
});



// 📡 FIREBASE RUTAS
onValue(ref(db, "rutaBus2"), (snap) => {
  window.rutas.rutaBus2 = snap.val() || [];
  dibujarRutas();
});

onValue(ref(db, "rutaBus3"), (snap) => {
  window.rutas.rutaBus3 = snap.val() || [];
  dibujarRutas();
});
