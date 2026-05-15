console.log("VERSION MULTIRUTAS FINAL 🔥");

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

  apiKey: "TU_APIKEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  databaseURL: "https://TU_DB.firebaseio.com",
  projectId: "TU_PROYECTO"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// 🗺️ MAPA
var map = L.map('map', {

  zoom: 15,
  minZoom: 13,
  maxZoom: 19

}).setView([2.4448, -76.6147], 13);


// 🌍 CAPA OPENSTREETMAP
L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
  }
).addTo(map);


// 🔒 LIMITES
var popayanBounds = L.latLngBounds(

  [2.35, -76.72],
  [2.53, -76.54]

);

map.setMaxBounds(popayanBounds);


// ======================================================
// 🚍 RUTAS
// ======================================================
window.rutas = {

  // 🔴 RUTA ROJA
  rutaBus2: [
    [2.47,-76.55],
    [2.48,-76.56],
    [2.49,-76.57]
   
  ],


  // 🔵 RUTA AZUL
  rutaBus3: [

    [2.45,-76.64],
    [2.46,-76.63],
    [2.47,-76.62]
    

  ]

};


// ======================================================
// 🟣 CAPAS
// ======================================================

let layerBus2 = L.layerGroup().addTo(map);
let layerBus3 = L.layerGroup().addTo(map);


// ======================================================
// 🎨 DIBUJAR RUTAS
// ======================================================

function dibujarRutas() {

  layerBus2.clearLayers();
  layerBus3.clearLayers();


  // 🔴 RUTA ROJA
  if (window.rutas.rutaBus2.length > 0) {

    L.polyline(

      window.rutas.rutaBus2,

      {
        color: 'red',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
      }

    ).addTo(layerBus2);

  }


  // 🔵 RUTA AZUL
  if (window.rutas.rutaBus3.length > 0) {

    L.polyline(

      window.rutas.rutaBus3,

      {
        color: 'blue',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
      }

    ).addTo(layerBus3);

  }

}


// 🔥 DIBUJAR AL INICIO
dibujarRutas();


// ======================================================
// 🚫 DESACTIVADO PARA NO DAÑAR RUTAS
// ======================================================

/*

map.on('click', function(e) {

  let punto = [e.latlng.lat, e.latlng.lng];

  window.rutas[window.busActivo].push(punto);

  dibujarRutas();

});

*/


// ======================================================
// 💾 GUARDAR RUTAS
// ======================================================

window.guardarRutaBus2 = async function () {

  await set(
    ref(db, "rutaBus2"),
    window.rutas.rutaBus2
  );

  console.log("✅ Ruta roja guardada");

};


window.guardarRutaBus3 = async function () {

  await set(
    ref(db, "rutaBus3"),
    window.rutas.rutaBus3
  );

  console.log("✅ Ruta azul guardada");

};


// ======================================================
// 🧹 LIMPIAR FIREBASE
// ======================================================

window.limpiarFirebase = async function () {

  await set(ref(db, "rutaBus2"), []);
  await set(ref(db, "rutaBus3"), []);

  console.log("🔥 Firebase limpiado");

};


// ======================================================
// 🚍 ICONO BUSES
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


onValue(ref(db, 'bus1'), (snap) => {

  const d = snap.val();

  if (d) {

    markerBus1.setLatLng([d.lat, d.lng]);

  }

});


// ======================================================
// 🔵 BUS 2
// ======================================================

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


// ======================================================
// 🔥 CARGAR RUTAS DESDE FIREBASE
// ======================================================

onValue(ref(db, "rutaBus2"), (snap) => {

  const data = snap.val();

  if (data && data.length > 0) {

    window.rutas.rutaBus2 = data;

    dibujarRutas();

    console.log("🔴 Ruta roja cargada");

  }

});


onValue(ref(db, "rutaBus3"), (snap) => {

  const data = snap.val();

  if (data && data.length > 0) {

    window.rutas.rutaBus3 = data;

    dibujarRutas();

    console.log("🔵 Ruta azul cargada");

  }

});


// ======================================================
// 🔎 DEBUG
// ======================================================

console.log("ROJA:", window.rutas.rutaBus2.length);

console.log("AZUL:", window.rutas.rutaBus3.length);
