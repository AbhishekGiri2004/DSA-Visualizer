let list = [];

function renderList(highlight = -1) {
  const container = document.getElementById("list");
  container.innerHTML = "";

  list.forEach((val, i) => {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = val;
    if (i === highlight) {
      node.style.background = "#00e676";
      node.style.boxShadow = "0 0 20px #00ff80";
      node.style.transform = "scale(1.2) rotateX(10deg)";
    }

    container.appendChild(node);
    if (i < list.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.innerHTML = "&rarr;";
      container.appendChild(arrow);
    }
  });

  updateChart();
}

function getInput() {
  return document.getElementById("value").value.trim();
}

function getPosition() {
  return parseInt(document.getElementById("position").value.trim());
}

// Insertions
function insertAtStart() {
  const val = getInput();
  if (val === "") return alert("Enter a value");
  list.unshift(val);
  renderList();
}

function insertAtEnd() {
  const val = getInput();
  if (val === "") return alert("Enter a value");
  list.push(val);
  renderList();
}

function insertAtPosition() {
  const val = getInput();
  const pos = getPosition();
  if (val === "") return alert("Enter a value");
  if (isNaN(pos) || pos < 0 || pos > list.length) return alert("Invalid position");

  list.splice(pos, 0, val);
  renderList();
}

// Deletions
function deleteFromStart() {
  if (list.length === 0) return alert("List is empty");
  list.shift();
  renderList();
}

function deleteFromEnd() {
  if (list.length === 0) return alert("List is empty");
  list.pop();
  renderList();
}

function deleteAtPosition() {
  const pos = getPosition();
  if (isNaN(pos) || pos < 0 || pos >= list.length) return alert("Invalid position");
  list.splice(pos, 1);
  renderList();
}

// Traversal
function traverse(index = 0) {
  if (index >= list.length) return;
  renderList(index);
  setTimeout(() => traverse(index + 1), 700);
}

// Chart.js visualization
function updateChart() {
  const ctx = document.getElementById('complexityChart').getContext('2d');
  if (window.linkedListChart) window.linkedListChart.destroy();

  const size = list.length || 1;

  window.linkedListChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Insert Start', 'Insert End', 'Insert Anywhere', 'Delete', 'Traverse'],
      datasets: [{
        label: 'Time Complexity',
        data: [1, 1, size, size, size],
        backgroundColor: ['#29b6f6', '#66bb6a', '#ffa726', '#ef5350', '#ab47bc']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Time Complexity Chart',
          color: '#ffffff'
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const op = context.dataIndex;
              return op < 2 ? 'O(1)' : 'O(n)';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#ffffff' },
          title: {
            display: true,
            text: 'Complexity',
            color: '#ffffff'
          }
        },
        x: {
          ticks: { color: '#ffffff' }
        }
      }
    }
  });
}
