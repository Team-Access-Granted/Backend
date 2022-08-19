import admin from "firebase-admin";
import serviceAccount from "../firebase_secretKey.json";

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'gs://placement-portal-8c33e.appspot.com'
});

const bucket = admin.storage().bucket()

export default bucket;
