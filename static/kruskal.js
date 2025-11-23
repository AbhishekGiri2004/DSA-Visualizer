function parseInput() {
  const input = document.getElementById("graphData").value.trim().split("\n");
  const n = parseInt(input[0]);
  const adjList = Array.from({ length: n }, () => []);
  const edges = [];
  const edgeSet = new Set();

  for (let i = 1; i <= n; i++) {
    const [node, rest] = input[i].split(":");
    const u = parseInt(node.trim());
    const pairs = rest.trim().split(" ");
    for (const pair of pairs) {
      const [v, w] = pair.split("-").map(Number);
      adjList[u].push({ to: v, weight: w });
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ u, v, w });
      }
    }
  }
  return { n, adjList, edges };
}

function runKruskal() {
  const { n, edges, adjList } = parseInput();
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = x => parent[x] === x ? x : parent[x] = find(parent[x]);
  const union = (a, b) => {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  };

  edges.sort((a, b) => a.w - b.w);
  const mstEdges = [];
  for (const { u, v } of edges) {
    if (find(u) !== find(v)) {
      union(u, v);
      mstEdges.push({ u, v });
    }
  }
  drawGraph(n, adjList, mstEdges, "orange");
}

function drawGraph(n, adjList, mstEdges, colorClass) {
  const container = document.getElementById("graph3D");
  container.innerHTML = "";
  const coords = [];
  const R = 200, cx = 350, cy = 220;

  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI / n) * i;
    const x = cx + R * Math.cos(angle);
    const y = cy + R * Math.sin(angle);
    coords.push([x, y]);

    const node = document.createElement("div");
    node.className = "node";
    node.textContent = i;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    container.appendChild(node);
  }

  for (let u = 0; u < n; u++) {
    for (const { to, weight } of adjList[u]) {
      if (u < to) drawEdge(container, coords[u], coords[to], false, weight);
    }
  }

  setTimeout(() => {
    mstEdges.forEach(({ u, v }, i) => {
      setTimeout(() => {
        const weight = adjList[u].find(e => e.to === v)?.weight || adjList[v].find(e => e.to === u)?.weight;
        drawEdge(container, coords[u], coords[v], true, weight, colorClass);
      }, i * 500);
    });
  }, 1000);
}

function drawEdge(container, from, to, highlight, weight = "", colorClass = "orange") {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1, dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const edge = document.createElement("div");
  edge.className = "edge" + (highlight ? ` ${colorClass}` : "");
  edge.style.width = `${length}px`;
  edge.style.left = `${x1}px`;
  edge.style.top = `${y1}px`;
  edge.style.transform = `rotate(${angle}deg)`;
  container.appendChild(edge);

  const label = document.createElement("div");
  label.className = "weight-label";
  label.textContent = weight;
  label.style.left = `${(x1 + x2) / 2 + 10}px`;
  label.style.top = `${(y1 + y2) / 2 + 5}px`;
  container.appendChild(label);
}
