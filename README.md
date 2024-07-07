
# MyTripzy

## Overview

MyTripzy is an application that helps users plan their trips by providing optimal routes, clustering places based on user input, and displaying interactive maps with location details.

## Features

- **Dynamic Place Search**: Search and add places to visit using the Nominatim API.
- **Optimal Route Generation**: Utilize the TSP DP algorithm to generate the best travel route.
- **Clustering**: Cluster places and generate an itinerary based on the number of days and travel distance.
- **Interactive Maps**: Display maps and routes using Leaflet and OpenStreetMap API.
- **Distance Calculation**: Compute distances between locations using the Haversine function.

## Tech Stack

**Frontend:**
- React
- Leaflet

**Backend:**
- Node.js

**Algorithms and Functions:**
- TSP DP Algorithm
- Clustering Algorithm
- Haversine Function

**APIs:**
- OpenStreetMap API
- Nominatim API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AryaV14/MyTripzy.git
   cd MyTripzy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Dependencies:
   ```bash
   npm i
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Search for places and add them to your itinerary.
3. Specify the number of days and maximum travel distance per day.
4. View the optimal route and clustered itinerary on the interactive map.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

