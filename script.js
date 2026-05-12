console.log("VERSION NUEVA - BUS1 🔥");
// 🔥 IMPORTAR FIREBASE (forma correcta)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; //enviarvectorruta

// 🔑 CONFIG (la tuya)
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
window.ruta = []; //vector para definir ruta
var map = L.map('map', {
    zoom: 15, // zoom inicial
    minZoom: 14, // límite de zoom hacia afuera para mantener el área en Popayán
    maxZoom: 19
}).setView([2.4448, -76.6147], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Limitar el área visible para que no se salga de Popayán
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);

// 📍 MARCADOR
var marker = L.marker([2.4448, -76.6147]).addTo(map);

// obtencion de rutas

window.lineaTemporal = L.polyline([], { color: 'red' }).addTo(map);

window.guardarRuta = function () {  //funcion para guardar ruta en firebase
    console.log("Intentando guardar...");
    set(ref(db, "rutaBus2"), window.ruta);
    console.log("Ruta guardada en Firebase 🔥");
};
map.on('click', function(e) {   //funcion obt coordenadas al hacer click 
    let punto = [e.latlng.lat, e.latlng.lng];

    window.ruta.push(punto);
    window.lineaTemporal.setLatLngs(window.ruta);
});

// 🔥 ESCUCHAR FIREBASE (AHORA SÍ FUNCIONA)
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
