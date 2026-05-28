console.log("VERSION 2.0 Monitoreo de buses ");
// Importar firebase 
import { crearTrackingBus } from "./js/tracker.js";
import { crearMapa } from "./js/map.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; //enviarvectorruta

//Configuración de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyC7i13NFAQjYmE5wuBXW4ZQ1o1ptZBulws",
  authDomain: "flowcity1-44199.firebaseapp.com",
  databaseURL: "https://flowcity1-44199-default-rtdb.firebaseio.com",
  projectId: "flowcity1-44199"
};

// INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// MAPA
const { map, marker, marker2 } = crearMapa();

// Sidebar toggle behavior: collapse/expand with a button
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebar-toggle');

function setSidebarCollapsed(collapsed) {
  if (collapsed) {
    sidebar.classList.add('collapsed');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '▶';
  } else {
    sidebar.classList.remove('collapsed');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = '◀';
  }
  try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch (e) {}
  // Update Leaflet map size after transition
  if (typeof map !== 'undefined' && map && typeof map.invalidateSize === 'function') {
    setTimeout(() => map.invalidateSize(), 300);
  }
}

toggle.addEventListener('click', () => {
  const collapsed = sidebar.classList.toggle('collapsed');
  setSidebarCollapsed(collapsed);
});

// restore state from localStorage
const saved = localStorage.getItem('sidebarCollapsed');
if (saved === '1') setSidebarCollapsed(true);



crearTrackingBus({
    map,
    busRef: ref(db, "bus1"),
    rutaRef: ref(db, "rutaBus1"),
    marker: marker,
    color: "#fe24bc"
});

crearTrackingBus({
    map,
    busRef: ref(db, "bus2"),
    rutaRef: ref(db, "rutaBus2"),
    marker: marker2,
    color: "#121a89"
});

