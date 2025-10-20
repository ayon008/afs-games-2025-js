import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.init";

// Upload a GeoJSON object (or any JSON) as a file to Firebase Storage and return its download URL
const storeGeojson = async (geojsonObj, originalFilename) => {
    if (!geojsonObj) return '';

    try {
        const baseName = originalFilename ? originalFilename.replace(/\.[^/.]+$/, '') : `geojson-${Date.now()}`;
        const filename = `${baseName}.geojson`;
        const blob = new Blob([JSON.stringify(geojsonObj)], { type: 'application/json' });
        const storageRef = ref(storage, `gpxs/${filename}`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (err) {
        console.error('storeGeojson error:', err);
        return '';
    }
};

export default storeGeojson;
