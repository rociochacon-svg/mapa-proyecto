console.log("VERSION NUEVA - BUS1 🔥");

// 🔥 IMPORTAR FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
window.ruta = [];

var map = L.map('map', {
    zoom: 15,
    minZoom: 14,
    maxZoom: 19
}).setView([2.4448, -76.6147], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// 📍 MARCADOR
var marker = L.marker([2.4448, -76.6147]).addTo(map);

// 🔴 LÍNEA DE RUTA
window.lineaTemporal = L.polyline([], {
    color: 'red',
    weight: 5
}).addTo(map);

// 🔥 GUARDAR RUTA
window.guardarRuta = function () {

    console.log("Intentando guardar...");

    set(ref(db, "rutaBus2"), window.ruta);

    console.log("Ruta guardada en Firebase 🔥");
};

// ❌ BORRAR TODA LA RUTA
window.borrarRuta = function () {

    // vaciar vector
    window.ruta = [];

    // borrar línea del mapa
    window.lineaTemporal.setLatLngs([]);

    console.log("Ruta borrada ❌");
};

// ↩️ DESHACER ÚLTIMO PUNTO
window.deshacerPunto = function () {

    // eliminar último punto
    window.ruta.pop();

    // actualizar línea
    window.lineaTemporal.setLatLngs(window.ruta);

    console.log("Último punto eliminado ↩️");
};

// 🖱️ AGREGAR PUNTOS CON CLICK
map.on('click', function(e) {

    let punto = [e.latlng.lat, e.latlng.lng];

    // guardar punto
    window.ruta.push(punto);

    // actualizar línea
    window.lineaTemporal.setLatLngs(window.ruta);
});

// 🔥 ESCUCHAR FIREBASE
const ubicacionRef = ref(db, 'bus1');

onValue(ubicacionRef, (snapshot) => {

    const data = snapshot.val();

    console.log("Datos Firebase:", data);

    if (data) {

        const lat = data.lat;
        const lng = data.lng;

        marker.setLatLng([lat, lng]);

        map.panTo([lat, lng]);
    }
});
