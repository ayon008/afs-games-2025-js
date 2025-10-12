const calculateTotalTimeAndDistance = (geojson) => {
    let totalTime = 0;
    let totalDistance = 0;

    geojson.features.forEach((feature) => {
        if (feature.geometry.type === 'LineString') {
            const coordinates = feature.geometry.coordinates;
            const times = feature.properties.coordTimes; // GPX often stores time as an array in properties
            if (coordinates.length > 1 && times.length > 1) {
                // Calculate total time
                const startTime = new Date(times[0]).getTime();
                const endTime = new Date(times[times.length - 1]).getTime();
                totalTime += (endTime - startTime) / 1000; // Total time in seconds

                // Calculate total distance using Haversine formula
                for (let i = 0; i < coordinates.length - 1; i++) {
                    const [lon1, lat1] = coordinates[i];
                    const [lon2, lat2] = coordinates[i + 1];
                    totalDistance += haversineDistance(lat1, lon1, lat2, lon2);
                }
            }
        }
    });

    return { totalTime: totalTime / 3600, totalDistance: totalDistance / 1000 };
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};


export default calculateTotalTimeAndDistance;