// graph.js

export default class Graph {
  constructor(matrix) {
    this.matrix = matrix;
    this.nodes = matrix.length;
  }

  // Dijkstra's algorithm to find the shortest path from a given start node
  dijkstra(startNode) {
    let distances = Array(this.nodes).fill(Infinity);
    distances[startNode] = 0;

    let visited = Array(this.nodes).fill(false);

    for (let i = 0; i < this.nodes - 1; i++) {
      let minDistance = Infinity;
      let minIndex = -1;

      for (let j = 0; j < this.nodes; j++) {
        if (!visited[j] && distances[j] < minDistance) {
          minDistance = distances[j];
          minIndex = j;
        }
      }

      visited[minIndex] = true;

      for (let k = 0; k < this.nodes; k++) {
        if (!visited[k] && this.matrix[minIndex][k] && distances[minIndex] !== Infinity && distances[minIndex] + this.matrix[minIndex][k] < distances[k]) {
          distances[k] = distances[minIndex] + this.matrix[minIndex][k];
        }
      }
    }

    return distances;
  }
}
