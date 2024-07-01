
import clusterPlaces from './cluster.js';

const DistanceMatrix = [
  [0, 1, 4, 14, 21, 4, 10, 17],
  [1, 0, 4, 14, 21, 4, 10, 17],
  [4, 4, 0, 10, 21, 2, 7, 13],
  [14, 14, 10, 0, 27, 10, 10, 8],
  [21, 21, 21, 27, 0, 21, 20, 26],
  [4, 4, 2, 10, 21, 0, 6, 13],
  [10, 10, 7, 10, 20, 6, 0, 8],
  [17, 17, 13, 8, 26, 13, 8, 0]
];

const locations = [
  'Fort Kochi', 'Santa Cruz Basilica & Kerala Kathakali Centre',
  'Marine Drive & Broadway MetharBazar', 'Hill Palace Museum',
  'Cherai Beach', 'Mangalavanam Bird Sanctuary', 'Lulumall Kochi',
  'Wonderla Amusement Park'
];

const numDays = 4;
const maxDistancePerDay = 20;

const clusters = clusterPlaces(distanceMatrix, numDays, maxDistancePerDay);
console.log(clusters);
