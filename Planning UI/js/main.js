import { loadGridData } from './grid.js';
import { renderScheduler } from './scheduler.js';

let allData = [];
let currentDate = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reset-filters').addEventListener('click', () => {
    currentDate = null;
    updateView();
  });

  fetch('data/orders.json')
    .then(res => {
      if (!res.ok) throw new Error(`Serverfout: ${res.status}`);
      return res.json();
    })
    .then(json => {
      allData = json;
      updateView();
    })
    .catch(err => {
      console.error('❌ Fout bij het laden van de JSON-data:', err);
      document.getElementById('filter-status').textContent =
        '⚠️ Fout bij laden data';
      document.getElementById('grid').innerHTML =
        '<p style="color:red;">Kan orderdata niet laden.</p>';
    });
});

function updateView() {
  const filtered = currentDate
    ? allData.filter(order => order.order_date === currentDate)
    : allData;

  document.getElementById('filter-status').textContent = currentDate
    ? `Geselecteerde datum: ${currentDate}`
    : 'Geen datum geselecteerd';

  loadGridData(filtered);
  renderScheduler(allData, date => {
    currentDate = date;
    updateView();
  });
}
