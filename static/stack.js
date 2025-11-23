let stack = [];

function updateStackDisplay(highlightIndex = -1) {
  const container = document.getElementById('stack');
  container.innerHTML = '';

  // Traverse from top of the stack (last pushed) to bottom
  for (let i = stack.length - 1; i >= 0; i--) {
    const box = document.createElement('div');
    box.className = 'stack-box';
    box.textContent = stack[i];

    if ((stack.length - 1 - i) === highlightIndex) {
      box.classList.add('highlight');
    }

    container.insertBefore(box, container.firstChild); // ensures top element is rendered at the top visually
  }

  updateTimeComplexityChart();
}

function pushStack() {
  const value = document.getElementById('value').value.trim();
  if (value === '') return alert("Please enter a value to push.");
  stack.push(value);
  updateStackDisplay();
  document.getElementById('value').value = '';
}

function popStack() {
  if (stack.length === 0) return alert("Stack is empty.");
  stack.pop();
  updateStackDisplay();
}

function traverseStack() {
  const traverseDisplay = document.getElementById('traverseOutput');
  traverseDisplay.innerHTML = 'Traversing Stack (LIFO Order):';

  // Create horizontal container for boxes
  const horizontalBoxContainer = document.createElement('div');
  horizontalBoxContainer.style.display = 'flex';
  horizontalBoxContainer.style.justifyContent = 'center';
  horizontalBoxContainer.style.alignItems = 'center';
  horizontalBoxContainer.style.marginTop = '20px';
  horizontalBoxContainer.style.flexWrap = 'wrap';
  horizontalBoxContainer.style.gap = '10px';

  traverseDisplay.appendChild(horizontalBoxContainer);

  let i = 0;
  const interval = setInterval(() => {
    if (i >= stack.length) {
      clearInterval(interval);
      updateStackDisplay(); // remove highlight
      return;
    }

    updateStackDisplay(i);

    const outputBox = document.createElement('div');
    outputBox.className = 'stack-box';
    outputBox.style.animation = 'jump 0.5s ease';
    outputBox.textContent = stack[stack.length - 1 - i]; // LIFO

    horizontalBoxContainer.appendChild(outputBox);
    i++;
  }, 600);
}

// Chart Function
function updateTimeComplexityChart() {
  const ctx = document.getElementById('complexityChart').getContext('2d');
  if (window.stackChart) window.stackChart.destroy();

  const size = stack.length > 0 ? stack.length : 1;

  window.stackChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Push', 'Pop', 'Traverse'],
      datasets: [{
        label: 'Operation Cost',
        data: [1, 1, size],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Time Complexity Chart',
          color: '#ffffff',
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        },
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
          min: 0,
          ticks: {
            color: '#ffffff'
          },
          title: {
            display: true,
            text: 'Time Complexity (Big-O)',
            color: '#ffffff'
          }
        },
        x: {
          ticks: {
            color: '#ffffff'
          }
        }
      }
    }
  });
}
