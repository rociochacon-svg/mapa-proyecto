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
    minZoom: 13, // límite de zoom hacia afuera para mantener el área en Popayán
    maxZoom: 19  //limite de zoom hacia adentro para evitar perder calidad
}).setView([2.4448, -76.8350], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Limitar el área visible para que no se salga de Popayán
var popayanBounds = L.latLngBounds(
    [2.35, -76.72],
    [2.53, -76.54]
);
map.setMaxBounds(popayanBounds);

var busIcon = L.icon({
    iconUrl: 'img/auto1.png',

    iconSize: [40, 40],     // tamaño
    iconAnchor: [20, 20],   // centro del icono
    popupAnchor: [0, -20]
});

//  MARCADOR
var marker = L.marker([2.4448, -76.6147], {
    icon: busIcon
}).addTo(map);

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

const rutaRef = ref(db, "rutaBus1");

onValue(rutaRef, (snapshot) => {
    const data = snapshot.val();

    console.log("Ruta desde Firebase:", data);

    if (!data) return;

    // guardar en memoria
    window.ruta = data;

    // borrar ruta anterior si existe
    if (window.lineaRuta) {
        map.removeLayer(window.lineaRuta);
    }

    // dibujar ruta en el mapa
    window.lineaRuta = L.polyline(window.ruta, {
        color: '#fe24bc',
        weight: 8,
        opacity: 0.5,
        smoothFactor: 1.5,
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(map);
});
