console.log("RUTAS FIJAS FUNCIONANDO 🔥");

// ========================================
// FIREBASE SOLO PARA BUSES
// ========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ========================================
// FIREBASE CONFIG
// ========================================
const firebaseConfig = {
  apiKey: "TU_APIKEY",
  authDomain: "TU_AUTH",
  databaseURL: "TU_DB",
  projectId: "TU_PROJECT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ========================================
// MAPA
// ========================================
const map = L.map('map').setView([2.4448, -76.6147], 13);

L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19
  }
).addTo(map);

// ========================================
// RUTA ROJA
// ========================================
const rutaRoja = [

  // PEGA AQUÍ TU VECTOR ROJO COMPLETO

];

// ========================================
// RUTA AZUL
// ========================================
const rutaAzul = [

  // PEGA AQUÍ TU VECTOR AZUL COMPLETO

];

// ========================================
// DIBUJAR ROJA
// ========================================
L.polyline(rutaRoja, {
  color: 'red',
  weight: 6,
  opacity: 1,
  smoothFactor: 1
}).addTo(map);

// ========================================
// DIBUJAR AZUL
// ========================================
L.polyline(rutaAzul, {
  color: 'blue',
  weight: 6,
  opacity: 1,
  smoothFactor: 1
}).addTo(map);

// ========================================
// ICONO
// ========================================
const busIcon = L.icon({
  iconUrl: 'img/auto1.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// ========================================
// BUS 1
// ========================================
const markerBus1 = L.marker(
  [2.4448, -76.6147],
  { icon: busIcon }
).addTo(map);

onValue(ref(db, 'bus1'), (snap) => {

  const d = snap.val();

  if (d) {
    markerBus1.setLatLng([d.lat, d.lng]);
  }

});

// ========================================
// BUS 2
// ========================================
const markerBus2 = L.marker(
  [2.4448, -76.6147],
  { icon: busIcon }
).addTo(map);

onValue(ref(db, 'bus2'), (snap) => {

  const d = snap.val();

  if (d) {
    markerBus2.setLatLng([d.lat, d.lng]);
  }

});
