export function renderScheduler(data, onDateClick) {
  const container = document.getElementById('scheduler');
  container.innerHTML = '';

  const days = getWeekDays();
  const columns = days.map(date => {
    const col = document.createElement('div');
    col.className = 'day-column';

    const header = document.createElement('div');
    header.className = 'day-header';
    header.textContent = formatDate(date);
    col.appendChild(header);

    const dayStr = toDateString(date);
    header.dataset.date = dayStr;

    const events = data.filter(item => item.order_date === dayStr);

    // groepeer op status
    const groupedByStatus = events.reduce((acc, item) => {
      const status = item.status || 'Onbekend';
      acc[status] = acc[status] || [];
      acc[status].push(item);
      return acc;
    }, {});

    Object.entries(groupedByStatus).forEach(([status, items]) => {
      const row = document.createElement('div');
      row.className = `status-line status-${status.toLowerCase()}`;
      row.textContent = `${status}: ${items.length}`;
      col.appendChild(row);
    });

    header.addEventListener('click', () => {
      if (onDateClick) onDateClick(dayStr);
    });

    return col;
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'scheduler-wrapper';

  columns.forEach(col => wrapper.appendChild(col));
  container.appendChild(wrapper);
}

function getWeekDays() {
  const monday = new Date();
  monday.setDate(monday.getDate() - monday.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function formatDate(date) {
  return date.toLocaleDateString('nl-NL', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
}

function toDateString(date) {
  return date.toISOString().split('T')[0];
}
