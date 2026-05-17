export function loadGridData(data, containerId = 'grid') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'grid-wrapper';

  if (!data.length) {
    wrapper.innerHTML = '<p>Geen data beschikbaar.</p>';
    container.appendChild(wrapper);
    return;
  }

  const table = document.createElement('table');
  table.classList.add('main-table');

  const headers = ['order_id', 'order_date', 'customer', 'status'];
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  trHead.innerHTML = '<th></th>' + headers.map(h => `<th>${h.toUpperCase()}</th>`).join('');
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  data.forEach(order => {
    const tr = document.createElement('tr');
    tr.classList.add('main-row');

    const toggleTd = document.createElement('td');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = '➕';
    toggleTd.appendChild(toggleBtn);
    tr.appendChild(toggleTd);

    headers.forEach(field => {
      const td = document.createElement('td');
      td.textContent = order[field];
      tr.appendChild(td);
    });

    const detailRow = document.createElement('tr');
    detailRow.className = 'detail-row';
    const td = document.createElement('td');
    td.colSpan = headers.length + 1;
    td.innerHTML = `
      <div class="tabs">
        <div class="tab-header">
          <button class="tab-btn active" data-tab="items">📦 Orderregels</button>
          <button class="tab-btn" data-tab="status">📊 Status</button>
          <button class="tab-btn" data-tab="info">📝 Info</button>
        </div>
        <div class="tab-content active" data-tab="items">
          <table class="subtable">
            <thead><tr><th>SKU</th><th>Qty</th><th>Description</th></tr></thead>
            <tbody>
              ${order.items.map(i => `<tr><td>${i.sku}</td><td>${i.qty}</td><td>${i.description}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="tab-content" data-tab="status">
          <p><strong>Verwerkt:</strong> ${order.status_info.processed}</p>
          <p><strong>Te verwerken:</strong> ${order.status_info.remaining}</p>
        </div>
        <div class="tab-content" data-tab="info">
          <p>${order.extra_info}</p>
        </div>
      </div>
    `;
    detailRow.appendChild(td);

    toggleBtn.addEventListener('click', () => {
      const isOpen = detailRow.classList.toggle('visible');
      toggleBtn.textContent = isOpen ? '➖' : '➕';
    });

    td.querySelector('.tab-header').addEventListener('click', e => {
      if (!e.target.matches('.tab-btn')) return;
      const tab = e.target.dataset.tab;
      td.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      td.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      td.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
    });

    tbody.appendChild(tr);
    tbody.appendChild(detailRow);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
}
