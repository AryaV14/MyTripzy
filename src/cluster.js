import Graph from './graph';

// Function to cluster places into days using TSP
function clusterPlaces(distanceMatrix, numDays, maxDistancePerDay, loca) {
  const graph = new Graph(distanceMatrix);
  
  // Calculate TSP to get the optimal path
  const { path, cost } = graph.tsp();
  console.log(path);
  let clusters = Array(numDays).fill().map(() => ({ places: [], totalDistance: 0 }));

  let currentDay = 0;
  let currentDistance = 0;
  let currentTime = new Date();
  currentTime.setHours(9, 0, 0); // Start time at 9:00 AM

  // Use the optimal path (path) to iterate over places in the order of visit
  path.forEach((placeIndex, index) => {
    const place = loca[placeIndex];
    const distance = index > 0 ? distanceMatrix[path[index - 1]][placeIndex] : 0; // Distance from previous place

    if (currentDistance + distance > maxDistancePerDay) {
      currentDay++;
      currentDistance = 0;
      currentTime.setHours(9, 0, 0); // Reset start time for the new day
    }

    if (currentDay < numDays) {
      const travelTime = (distance * 1.25/ 50) * 60 * 60 * 1000; // Assume average speed is 50 km/h
      const arriveTime = new Date(currentTime.getTime() + travelTime);
      
      clusters[currentDay].places.push({
        ...place,
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
