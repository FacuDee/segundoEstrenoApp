// Valor inicial en litros
let waterSaved = 1250000; // 1.250.000 litros
const incrementPerSecond = 20; // aumento de litros por segundo

function updateWaterSaved() {
  waterSaved += incrementPerSecond;
  document.getElementById('waterSaved').textContent = waterSaved.toLocaleString();
}

// Actualizar al cargar la página (muestra el valor inicial con formato)
updateWaterSaved();

// Luego actualizar cada segundo
setInterval(updateWaterSaved, 1000);
