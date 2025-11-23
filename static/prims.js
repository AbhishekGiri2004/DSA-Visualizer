function parseAdjListInput() {
  const input = document.getElementById("graphData").value.trim().split("\n");
  const n = parseInt(input[0]);
  const adjList = Array.from({ length: n }, () => []);

  for (let i = 1; i <= n; i++) {
    const [node, rest] = input[i].split(":");
    const edges = rest.trim().split(" ");
    edges.forEach(edge => {
      const [to, weight] = edge.split("-").map(Number);
      adjList[parseInt(node)].push({ to, weight });
    });
  }

  return { n, adjList };
}

function primsFromAdjList(n, adjList) {
  const selected = Array(n).fill(false);
  const edges = [];
  const minEdge = Array(n).fill(Infinity);
  const parent = Array(n).fill(-1);
  minEdge[0] = 0;

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!selected[v] && (u === -1 || minEdge[v] < minEdge[u])) {
        u = v;
      }
    }

    selected[u] = true;
    if (parent[u] !== -1) {
      edges.push([parent[u], u]);
    }

    for (const { to, weight } of adjList[u]) {
      if (!selected[to] && weight < minEdge[to]) {
        minEdge[to] = weight;
        parent[to] = u;
      }
    }
  }

  return edges;
}

function runFinalPrims() {
  const { n, adjList } = parseAdjListInput();
  const mstEdges = primsFromAdjList(n, adjList);
  const container = document.getElementById("graph3D");
  container.innerHTML = "";

  const coords = [];
  const R = 200;
  const cx = 350, cy = 220;

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

  // Draw all edges in white
  for (let u = 0; u < n; u++) {
    for (const { to, weight } of adjList[u]) {
      if (u < to) {
        drawEdge(container, coords[u], coords[to], false, weight);
      }
    }
  }

  // Draw MST edges in green
  mstEdges.forEach(([u, v]) => {
    const weight = adjList[u].find(e => e.to === v)?.weight || adjList[v].find(e => e.to === u)?.weight;
    drawEdge(container, coords[u], coords[v], true, weight);
  });
}

function drawEdge(container, from, to, isGreen, weight) {
  const x1 = from[0], y1 = from[1];
  const x2 = to[0], y2 = to[1];
  const dx = x2 - x1, dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const edge = document.createElement("div");
  edge.className = "edge" + (isGreen ? " green" : "");
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
