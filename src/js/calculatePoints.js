// const calCulatePointsByTime = (totalTime) => {
//     if (totalTime <= 2) {
//         let points = 500 / 2 * totalTime;
//         return Math.ceil(points);
//     }
//     else if (totalTime > 2 && totalTime <= 6) {
//         let points = 1000 / 6 * totalTime;
//         return Math.ceil(points);
//     }
//     else if (totalTime > 6 && totalTime <= 10) {
//         let points = 1500 / 10 * totalTime;
//         return Math.ceil(points);
//     }
//     else if (totalTime > 10 && totalTime <= 15) {
//         let points = 2000 / 15 * totalTime;
//         return Math.ceil(points);
//     }
//     else if (totalTime > 15) {
//         let points = 3000 / 20 * totalTime;
//         return Math.ceil(points);
//     }
// }

// const calCulatePointsByDistance = (totalDistance) => {
//     if (totalDistance <= 20) {
//         let points = totalDistance * 500 / 20;
//         return Math.ceil(points);
//     }
//     else if (totalDistance > 20 && totalDistance <= 50) {
//         let points = totalDistance * 1000 / 50;
//         return Math.ceil(points);
//     }
//     else if (totalDistance > 50 && totalDistance <= 150) {
//         let points = totalDistance * 1500 / 150;
//         return Math.ceil(points);
//     }
//     else if (totalDistance > 150 && totalDistance <= 250) {
//         let points = totalDistance * 2000 / 250;
//         return Math.ceil(points);
//     }
//     else if (totalDistance > 250) {
//         let points = totalDistance * 3000 / 300;
//         return Math.ceil(points);
//     }
// }

// export { calCulatePointsByDistance, calCulatePointsByTime }