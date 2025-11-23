function runDijkstra() {
  const input = document.getElementById("graphData").value.trim().split("\n");
  const n = parseInt(input[0]);
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  const source = parseInt(input[n + 1]);

  const dist = Array(n).fill(Infinity);
  const visited = Array(n).fill(false);
  const parent = Array(n).fill(-1);
  dist[source] = 0;

  for (let i = 0; i < n - 1; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    visited[u] = true;
    for (let v = 0; v < n; v++) {
      if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
        parent[v] = u;
      }
    }
  }

  const container = document.getElementById("graphContainer");
  container.innerHTML = "";

  const coords = [
    [100, 50],
    [600, 50],
    [350, 100],
    [200, 350],
    [500, 350]
  ];

  for (let i = 0; i < n; i++) {
    const node = document.createElement("div");
    node.className = "node";
    node.style.left = coords[i][0] + "px";
    node.style.top = coords[i][1] + "px";
    node.textContent = i;
    container.appendChild(node);
  }

  // Draw all edges as white
  for (let u = 0; u < n; u++) {
    for (let v = u + 1; v < n; v++) {
      if (graph[u][v]) {
        drawEdge(container, coords[u], coords[v], graph[u][v], false);
      }
    }
  }

  // Animate shortest paths
  animatePerson(container, parent, coords, source, graph);
}

function drawEdge(container, from, to, weight, isPink) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  const edge = document.createElement("div");
  edge.className = "edge" + (isPink ? " pink" : "");
  edge.style.width = `${length}px`;
  edge.style.left = `${x1}px`;
  edge.style.top = `${y1}px`;
  edge.style.transform = `rotate(${angle}deg)`;
  container.appendChild(edge);

  const label = document.createElement("div");
  label.className = "label";
  label.textContent = weight;
  label.style.left = `${(x1 + x2) / 2}px`;
  label.style.top = `${(y1 + y2) / 2}px`;
  container.appendChild(label);
}

function animatePerson(container, parent, coords, source, graph) {
  for (let target = 0; target < parent.length; target++) {
    if (target === source) continue;

    let path = [], curr = target;
    while (curr !== -1) {
      path.push(curr);
      curr = parent[curr];
    }
    path = path.reverse();

    const person = document.createElement("div");
    person.className = "person";
    container.appendChild(person);

    let segment = 0;
    let progress = 0;
    const speed = 0.01; // adjust speed (lower = slower)

    function moveStep() {
      if (segment >= path.length - 1) return;

      const [x1, y1] = coords[path[segment]];
      const [x2, y2] = coords[path[segment + 1]];

      const x = x1 + (x2 - x1) * progress;
      const y = y1 + (y2 - y1) * progress;

      person.style.left = `${x}px`;
      person.style.top = `${y}px`;

      if (progress < 1) {
        progress += speed;
        requestAnimationFrame(moveStep);
      } else {
        drawEdge(container, coords[path[segment]], coords[path[segment + 1]], graph[path[segment]][path[segment + 1]], true);
        segment++;
        progress = 0;
        requestAnimationFrame(moveStep);
      }
    }

    requestAnimationFrame(moveStep);
  }
}
