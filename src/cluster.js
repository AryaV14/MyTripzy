import Graph from './graph';

// Function to cluster places into days
function clusterPlaces(distanceMatrix, numDays, maxDistancePerDay) {
  const graph = new Graph(distanceMatrix);
  const startNode = 0; // assuming we start from the first place
  const distances = graph.dijkstra(startNode);

  let clusters = Array(numDays).fill().map(() => []);

  let currentDay = 0;
  let currentDistance = 0;

  distances.forEach((distance, place) => {
    if (currentDistance + distance > maxDistancePerDay) {
      currentDay++;
      currentDistance = 0;
    }

    if (currentDay < numDays) {
      clusters[currentDay].push(place);
      currentDistance += distance;
    }
  });

  return clusters;
}

export default clusterPlaces;
