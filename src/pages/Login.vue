<script setup>
	import { useFirebaseAuth } from 'vuefire';
	import * as firebaseui from 'firebaseui';
	import 'firebaseui/dist/firebaseui.css';

	const auth = useFirebaseAuth();

	var uiConfig = {
		signInSuccessUrl: '/',
		signInOptions: [
			'password'
		]
	};
	
	// Initialize the FirebaseUI Widget using Firebase.
	var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

	ui.reset();

	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);
</script>

<template>
	<div id="firebaseui-auth-container"></div>
</template>