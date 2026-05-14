console.log("VERSION MULTIBUS FIX 🔥");

// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// =====================================================
// 🔑 CONFIG FIREBASE
// =====================================================

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "flowcity1-44199.firebaseapp.com",
  databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
  projectId: "flowcity1-44199"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// =====================================================
// 🗺️ MAPA
// =====================================================

var map = L.map('map', {
  zoom: 15,
  minZoom: 13,
  maxZoom: 19
}).setView([2.4448, -76.6147], 13);


// 🌍 MAPA BASE
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);


// =====================================================
// 🔒 LIMITES
// =====================================================

var popayanBounds = L.latLngBounds(
  [2.35, -76.72],
  [2.53, -76.54]
);

map.setMaxBounds(popayanBounds);


// =====================================================
// 🚍 RUTAS
// =====================================================

window.rutas = {

  // 🔴 RUTA ROJA
  rutaBus2: [

    [2.473751299045302,-76.55471920967103],
    [2.4730009801831168,-76.55512690544128],
    [2.473611954145848,-76.55672550201417],
    [2.47402998880028,-76.55711174011232],
    [2.4744801798192273,-76.55745506286623]

    // 🔥 PEGA AQUÍ TODO EL VECTOR ROJO COMPLETO

  ],


  // 🔵 RUTA AZUL
  rutaBus3: [

   rutaBus3: [

  [2.44,-76.61],
  [2.45,-76.62],
  [2.46,-76.63]

]

    // 🔥 PEGA AQUÍ TODO EL VECTOR AZUL COMPLETO

  ]

};


// =====================================================
// 🟣 CAPAS
// =====================================================

let layerBus2 = L.layerGroup().addTo(map);
let layerBus3 = L.layerGroup().addTo(map);


// =====================================================
// 🎨 DIBUJAR RUTAS
// =====================================================

function dibujarRutas() {

  // limpiar capas
  layerBus2.clearLayers();
  layerBus3.clearLayers();


  // =================================================
  // 🔴 RUTA ROJA (DEBAJO)
  // =================================================

  if (window.rutas.rutaBus2.length > 0) {

    L.polyline(window.rutas.rutaBus2, {

      color: 'red',
      weight: 7,
      opacity: 0.7,
      smoothFactor: 1

    }).addTo(layerBus2);

  }


  // =================================================
  // 🔵 RUTA AZUL (ENCIMA)
  // =================================================

  if (window.rutas.rutaBus3.length > 0) {

    L.polyline(window.rutas.rutaBus3, {

      color: 'blue',
      weight: 4,
      opacity: 1,
      smoothFactor: 1,

      // 🔥 línea punteada
      dashArray: '10,10'

    }).addTo(layerBus3);

  }

}


// =====================================================
// 🚀 DIBUJAR RUTAS
// =====================================================

dibujarRutas();


// =====================================================
// 📍 CENTRAR MAPA
// =====================================================

map.fitBounds([
  ...window.rutas.rutaBus2,
  ...window.rutas.rutaBus3
]);


// =====================================================
// 🖱️ CLICK PARA AGREGAR PUNTOS
// =====================================================

window.busActivo = "rutaBus2";

map.on('click', function(e) {

  let punto = [
    e.latlng.lat,
    e.latlng.lng
  ];

  window.rutas[window.busActivo].push(punto);

  dibujarRutas();

});


// =====================================================
// 💾 GUARDAR RUTAS
// =====================================================

window.guardarRutaBus2 = function () {

  set(
    ref(db, "rutaBus2"),
    window.rutas.rutaBus2
  );

};


window.guardarRutaBus3 = function () {

  set(
    ref(db, "rutaBus3"),
    window.rutas.rutaBus3
  );

};


// =====================================================
// ❌ BORRAR
// =====================================================

window.borrarRutaBus2 = function () {

  window.rutas.rutaBus2 = [];

  dibujarRutas();

};


window.borrarRutaBus3 = function () {

  window.rutas.rutaBus3 = [];

  dibujarRutas();

};


// =====================================================
// ↩️ DESHACER
// =====================================================

window.deshacerRutaBus2 = function () {

  window.rutas.rutaBus2.pop();

  dibujarRutas();

};


window.deshacerRutaBus3 = function () {

  window.rutas.rutaBus3.pop();

  dibujarRutas();

};


// =====================================================
// 🚍 ICONO
// =====================================================

var busIcon = L.icon({

  iconUrl: 'img/auto1.png',

  iconSize: [40, 40],

  iconAnchor: [20, 20]

});


// =====================================================
// 🔴 BUS 1
// =====================================================

var markerBus1 = L.marker(
  [2.4448, -76.6147],
  { icon: busIcon }
).addTo(map);


onValue(ref(db, 'bus1'), (snap) => {

  const d = snap.val();

  if (d) {

    markerBus1.setLatLng([
      d.lat,
      d.lng
    ]);

  }

});


// =====================================================
// 🔵 BUS 2
// =====================================================

var markerBus2 = L.marker(
  [2.4448, -76.6147],
  { icon: busIcon }
).addTo(map);


onValue(ref(db, 'bus2'), (snap) => {

  const d = snap.val();

  if (d) {

    markerBus2.setLatLng([
      d.lat,
      d.lng
    ]);

  }

});


// =====================================================
// ⚠️ FIREBASE RUTAS
// =====================================================
// 🔥 DESACTIVADO TEMPORALMENTE
// porque Firebase puede borrar
// las rutas locales

/*
onValue(ref(db, "rutaBus2"), (snap) => {

  window.rutas.rutaBus2 = snap.val() || [];

  dibujarRutas();

});


onValue(ref(db, "rutaBus3"), (snap) => {

  window.rutas.rutaBus3 = snap.val() || [];

  dibujarRutas();

});
*/
*/
