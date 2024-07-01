import Graph from './graph';

// Function to cluster places into days
function clusterPlaces(distanceMatrix, numDays, maxDistancePerDay, loca) {
  const graph = new Graph(distanceMatrix);
  const startNode = 0; // assuming we start from the first place
  const distances = graph.dijkstra(startNode);

  let clusters = Array(numDays).fill().map(() => ({ places: [], totalDistance: 0 }));

  let currentDay = 0;
  let currentDistance = 0;
  let currentTime = new Date();
  currentTime.setHours(9, 0, 0); // Start time at 9:00 AM

  distances.forEach((distance, place) => {
    if (currentDistance + distance > maxDistancePerDay) {
      currentDay++;
      currentDistance = 0;
      currentTime.setHours(9, 0, 0); // Reset start time for the new day
    }

    if (currentDay < numDays) {
      const travelTime = (distance / 50) * 60 * 60 * 1000; // Assume average speed is 50 km/h
      const arriveTime = new Date(currentTime.getTime() + travelTime);
      
      clusters[currentDay].places.push({
        ...loca[place],
        distance: distance,
        leaveTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        arriveTime: arriveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      clusters[currentDay].totalDistance += distance;
      currentDistance += distance;
      currentTime = new Date(arriveTime.getTime() + 10800 * 1000); // Assume 3 hour stay time
    }
  });

  return clusters;
}

export default clusterPlaces;
