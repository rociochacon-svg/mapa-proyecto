console.log("VERSION MULTIBUS FIX 🔥");

// =====================================================
// 🔥 FIREBASE
// =====================================================

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


// =====================================================
// 🌍 MAPA BASE
// =====================================================

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

  maxZoom: 19,

}).addTo(map);


// =====================================================
// 🔒 LIMITES POPAYÁN
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

  // 🔴 ROJA
  rutaBus2: [

    [2.44, -76.61],
    [2.45, -76.62],
    [2.46, -76.63]

  ],

  // 🔵 AZUL
  rutaBus3: [

    [2.44, -76.60],
    [2.45, -76.61],
    [2.46, -76.62]

  ]

};

// =====================================================
// ✅ VERIFICAR CARGA
// =====================================================

console.log("ROJA:", window.rutas.rutaBus2.length);

console.log("AZUL:", window.rutas.rutaBus3.length);


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
  // 🔴 RUTA ROJA
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
  // 🔵 RUTA AZUL
  // =================================================

  if (window.rutas.rutaBus3.length > 0) {

    L.polyline(window.rutas.rutaBus3, {

      color: 'blue',
      weight: 4,
      opacity: 1,
      smoothFactor: 1,

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

if (
  window.rutas.rutaBus2.length > 0 ||
  window.rutas.rutaBus3.length > 0
) {

  map.fitBounds([

    ...window.rutas.rutaBus2,
    ...window.rutas.rutaBus3

  ]);

}


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
// ❌ BORRAR RUTAS
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
// ↩️ DESHACER PUNTO
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
// 🚍 ICONO BUS
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
// porque puede sobrescribir rutas locales

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
