class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function insertNode(node, value) {
  if (!node) return new TreeNode(value);
  if (value < node.value) node.left = insertNode(node.left, value);
  else node.right = insertNode(node.right, value);
  return node;
}

function deleteNodeRecursive(node, value) {
  if (!node) return null;
  if (value < node.value) node.left = deleteNodeRecursive(node.left, value);
  else if (value > node.value) node.right = deleteNodeRecursive(node.right, value);
  else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    let minLargerNode = node.right;
    while (minLargerNode.left) minLargerNode = minLargerNode.left;
    node.value = minLargerNode.value;
    node.right = deleteNodeRecursive(node.right, minLargerNode.value);
  }
  return node;
}

function insert() {
  const val = parseInt(document.getElementById('value').value);
  if (!isNaN(val)) {
    root = insertNode(root, val);
    renderTree();
  }
}

function deleteNode() {
  const val = parseInt(document.getElementById('value').value);
  if (!isNaN(val)) {
    root = deleteNodeRecursive(root, val);
    renderTree();
  }
}

function renderTree() {
  const container = document.getElementById('tree');
  container.innerHTML = '';
  if (!root) return;

  const queue = [{ node: root, level: 0 }];
  const levels = [];

  while (queue.length) {
    const { node, level } = queue.shift();
    if (!levels[level]) levels[level] = [];
    if (node) {
      levels[level].push(`<div class='node'>${node.value}</div>`);
      queue.push({ node: node.left, level: level + 1 });
      queue.push({ node: node.right, level: level + 1 });
    } else {
      levels[level].push(`<div style='width: 50px;'></div>`);
    }
  }

  levels.forEach(level => {
    const div = document.createElement('div');
    div.className = 'level';
    div.innerHTML = level.join('');
    container.appendChild(div);
  });
}

function inOrderTraversal(node, res) {
  if (!node) return;
  inOrderTraversal(node.left, res);
  res.push(node.value);
  inOrderTraversal(node.right, res);
}

function preOrderTraversal(node, res) {
  if (!node) return;
  res.push(node.value);
  preOrderTraversal(node.left, res);
  preOrderTraversal(node.right, res);
}

function postOrderTraversal(node, res) {
  if (!node) return;
  postOrderTraversal(node.left, res);
  postOrderTraversal(node.right, res);
  res.push(node.value);
}

function highlightTraversal(path) {
  let i = 0;
  function highlightNext() {
    if (i >= path.length) return;

    const value = path[i];
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(n => {
      if (parseInt(n.textContent) === value) {
        n.classList.add('highlight');
        setTimeout(() => n.classList.remove('highlight'), 800);
      }
    });

    i++;
    setTimeout(highlightNext, 900);
  }
  highlightNext();
}

function inOrder() {
  const result = [];
  inOrderTraversal(root, result);
  document.getElementById('traversal-output').textContent = 'Inorder: ' + result.join(' ');
  highlightTraversal(result);
  drawChart();
}

function preOrder() {
  const result = [];
  preOrderTraversal(root, result);
  document.getElementById('traversal-output').textContent = 'Preorder: ' + result.join(' ');
  highlightTraversal(result);
  drawChart();
}

function postOrder() {
  const result = [];
  postOrderTraversal(root, result);
  document.getElementById('traversal-output').textContent = 'Postorder: ' + result.join(' ');
  highlightTraversal(result);
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById('tcChart').getContext('2d');

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Insert', 'Delete', 'Traverse'],
      datasets: [{
        label: 'Operation Cost',
        data: [1, 1, 2], // Traverse is O(n), others are O(log n)
        backgroundColor: ['#00e676', '#ff5252', '#2196F3'] // green, red, blue
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
              const labels = ['O(log n)', 'O(log n)', 'O(n)'];
              return `Time Complexity: ${labels[context.dataIndex]}`;
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