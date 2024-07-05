export default class Graph {
  constructor(matrix) {
    this.matrix = matrix;
    this.nodes = matrix.length;
  }

  // Function to calculate TSP path using dynamic programming
  tsp() {
    const n = this.nodes;
    const dp = Array(1 << n).fill(null).map(() => Array(n).fill(Number.POSITIVE_INFINITY));

    // Base case: Starting point to itself has zero cost
    dp[1][0] = 0;

    // Populate the DP table
    for (let mask = 1; mask < (1 << n); mask++) {
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          for (let j = 0; j < n; j++) {
            if (i !== j && (mask & (1 << j))) {
              dp[mask][i] = Math.min(dp[mask][i], dp[mask ^ (1 << i)][j] + this.matrix[j][i]);
            }
          }
        }
      }
    }

    // Calculate the minimum cost of completing the tour
    let minCost = Number.POSITIVE_INFINITY;
    let lastIndex = -1;
    for (let i = 1; i < n; i++) {
      if (dp[(1 << n) - 1][i] + this.matrix[i][0] < minCost) {
        minCost = dp[(1 << n) - 1][i] + this.matrix[i][0];
        lastIndex = i;
      }
    }

    // Reconstruct the path from DP table
    let path = [];
    let mask = (1 << n) - 1;

    // Start from the last node in the optimal path
    let currentNode = lastIndex;

    // Traverse backwards to construct the path
    while (currentNode !== -1) {
      path.unshift(currentNode); // Add current node to the beginning of path

      let nextNode = -1;
      // Find the next node to go to, using the DP table
      for (let j = 0; j < n; j++) {
        if (currentNode !== j && (mask & (1 << j)) && dp[mask][currentNode] === dp[mask ^ (1 << currentNode)][j] + this.matrix[j][currentNode]) {
          nextNode = j;
          break;
        }
      }

      mask ^= (1 << currentNode); // Update the mask
      currentNode = nextNode; // Move to the next node
    }

    // Ensure the path doesn't end with the starting node repeated
    if (path[0] === 0 && path[path.length - 1] === 0) {
      path.pop(); // Remove the last occurrence of starting node
    }

    // Add the starting node at the beginning of the path if not already there
    if (path[0] !== 0) {
      path.unshift(0);
    }

    return { path, cost: minCost };
  }
}
