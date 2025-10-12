import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.init";

// Function to upload the PDF
const uploadPdfToFirebase = async (file) => {
    if (!file) {
        return ''
    };

    const storageRef = ref(storage, `pdfs/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

export default uploadPdfToFirebase;