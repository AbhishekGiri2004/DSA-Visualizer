let queue = [];

function updateQueueDisplay(highlightIndex = -1) {
  const container = document.getElementById('queue');
  container.innerHTML = '';

  for (let i = 0; i < queue.length; i++) {
    const box = document.createElement('div');
    box.className = 'queue-box';
    box.textContent = queue[i];

    if (i === highlightIndex) {
      box.classList.add('highlight');
    }

    container.appendChild(box);
  }

  updateTimeComplexityChart();
}

function enqueue() {
  const value = document.getElementById('value').value.trim();
  if (value === '') return alert("Please enter a value to enqueue.");
  queue.push(value);
  updateQueueDisplay();
  document.getElementById('value').value = '';
}

function dequeue() {
  if (queue.length === 0) return alert("Queue is empty.");
  queue.shift();
  updateQueueDisplay();
}

function traverseQueue() {
  const traverseDisplay = document.getElementById('traverseOutput');
  traverseDisplay.innerHTML = 'Traversing Queue (FIFO Order):';

  const horizontalBoxContainer = document.createElement('div');
  horizontalBoxContainer.style.display = 'flex';
  horizontalBoxContainer.style.justifyContent = 'center';
  horizontalBoxContainer.style.flexWrap = 'wrap';
  horizontalBoxContainer.style.marginTop = '20px';
  horizontalBoxContainer.style.gap = '10px';

  traverseDisplay.appendChild(horizontalBoxContainer);

  let i = 0;
  const interval = setInterval(() => {
    if (i >= queue.length) {
      clearInterval(interval);
      updateQueueDisplay(); // Remove highlight
      return;
    }

    updateQueueDisplay(i);

    const outputBox = document.createElement('div');
    outputBox.className = 'output-box';
    outputBox.textContent = queue[i];
    horizontalBoxContainer.appendChild(outputBox);

    i++;
  }, 600);
}

function updateTimeComplexityChart() {
  const ctx = document.getElementById('complexityChart').getContext('2d');
  if (window.queueChart) window.queueChart.destroy();

  const size = queue.length > 0 ? queue.length : 1;

  window.queueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Enqueue', 'Dequeue', 'Traverse'],
      datasets: [{
        label: 'Operation Cost',
        data: [1, 1, size],
        backgroundColor: ['#ffa726', '#66bb6a', '#ff7043']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Time Complexity Chart',
          color: '#ffffff',
          font: { size: 16 }
        },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataIndex === 2) return 'O(n)';
              return 'O(1)';
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
            text: 'Time Complexity (Big-O)',
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
