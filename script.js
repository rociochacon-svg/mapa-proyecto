console.log("MAPA RUTAS FIJAS 🔥");

// =====================================
// 🔥 FIREBASE SOLO PARA BUSES
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// =====================================
// 🔑 FIREBASE
// =====================================

const firebaseConfig = {

  apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",

  authDomain: "flowcity1-44199.firebaseapp.com",

  databaseURL:
    "https://flowcity1-44199-default-rtdb.firebaseio.com",

  projectId: "flowcity1-44199"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// =====================================
// 🗺️ MAPA
// =====================================

var map = L.map('map', {

  zoom: 15,
  minZoom: 13,
  maxZoom: 19

}).setView([2.4448, -76.6147], 13);


// =====================================
// 🌍 MAPA BASE
// =====================================

L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
  }
).addTo(map);


// =====================================
// 🔒 LIMITES
// =====================================

var popayanBounds = L.latLngBounds(

  [2.35, -76.72],
  [2.53, -76.54]

);

map.setMaxBounds(popayanBounds);


// =====================================
// 🔴 VECTOR ROJO
// =====================================

const rutaRoja = [

  // 🔥 PEGA AQUÍ TU VECTOR ROJO COMPLETO

];


// =====================================
// 🔵 VECTOR AZUL
// =====================================

const rutaAzul = [

  // 🔥 PEGA AQUÍ TU VECTOR AZUL COMPLETO

];


// =====================================
// 🔴 DIBUJAR ROJA
// =====================================

L.polyline(

  rutaRoja,

  {

    color: 'red',

    weight: 5,

    opacity: 1,

    smoothFactor: 1

  }

).addTo(map);


// =====================================
// 🔵 DIBUJAR AZUL
// =====================================

L.polyline(

  rutaAzul,

  {

    color: 'blue',

    weight: 5,

    opacity: 1,

    smoothFactor: 1

  }

).addTo(map);


// =====================================
// 🚍 ICONO
// =====================================

var busIcon = L.icon({

  iconUrl: 'img/auto1.png',

  iconSize: [40, 40],

  iconAnchor: [20, 20]

});


// =====================================
// 🔴 BUS 1
// =====================================

var markerBus1 = L.marker(

  [2.4448, -76.6147],

  { icon: busIcon }

).addTo(map);


onValue(ref(db, 'bus1'), (snap) => {

  const d = snap.val();

  if (d) {

    markerBus1.setLatLng([d.lat, d.lng]);

  }

});


// =====================================
// 🔵 BUS 2
// =====================================

var markerBus2 = L.marker(

  [2.4448, -76.6147],

  { icon: busIcon }

).addTo(map);


onValue(ref(db, 'bus2'), (snap) => {

  const d = snap.val();

  if (d) {

    markerBus2.setLatLng([d.lat, d.lng]);

  }

});


// =====================================
// 🔥 DEBUG
// =====================================

console.log("ROJA:", rutaRoja.length);

console.log("AZUL:", rutaAzul.length);
