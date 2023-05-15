import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef } from 'firebase/database';
import { useDatabase, useCurrentUser } from 'vuefire';

const firebaseConfig = {
	apiKey: "AIzaSyBa0hF12Vrt4gHMRQmRmKVSZjc63E_THm4",
	authDomain: "mtgdb-7c3f1.firebaseapp.com",
	databaseURL: "https://mtgdb-7c3f1-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "mtgdb-7c3f1",
	storageBucket: "mtgdb-7c3f1.appspot.com",
	messagingSenderId: "275316364548",
	appId: "1:275316364548:web:49f57caab513716827ec51"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);