import { createApp } from 'vue';
import { VueFire, VueFireAuth, getCurrentUser, useDatabase } from 'vuefire';
import { firebaseApp } from './firebase';
import { ref as dbRef, get } from 'firebase/database';

import "bootstrap/dist/css/bootstrap.min.css";

import router from './router/index.js';
import App from './App.vue';

const app = createApp(App);

app.use(VueFire, {
	firebaseApp,
	modules: [
		VueFireAuth(),
	],
});

const db = useDatabase();
const currentUser = await getCurrentUser();

app.provide('currentUser', currentUser);

if (currentUser) {
	const dbPath = 'users/'+currentUser.uid;
	const userData = await get(dbRef(db, dbPath));

	if(userData.exists()){
		app.provide('userData', userData.val());
	}
}

app.use(router);

app.mount('#app');
