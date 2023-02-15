<script setup>
	import { inject } from 'vue';
	const dataBase = inject('dataBase');

	function download() {
		const data = JSON.stringify(dataBase.getData());

		var a = document.createElement("a");
		var file = new Blob([data], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'json.txt';
		a.click();
	}
</script>

<template>
	<header class="pt-2 pb-2">
		<div class="container">
			<div class="d-flex align-items-center ">
				<router-link to="/" class="navbar-brand">
					<i class="ss ss-2x"></i>
				</router-link>

				<ul class="nav flex-fill">
					<li>
						<router-link to="/" class="nav-link text-white">Sets lists</router-link>
					</li>
					<li>
						<router-link to="/collection/sets" class="nav-link text-white">Sets Collection</router-link>
					</li>
					<li>
						<router-link to="/test" class="nav-link text-white">Test</router-link>
					</li>
				</ul>

				<div>
					<button type="button" class="btn btn-outline-light me-2" >Import</button>
					<button type="button" class="btn btn-outline-light" @click="download">Export</button>
				</div>
			</div>
		</div>
	</header>
	
	<div class="container-fluid pt-4">
		<Suspense>
			<router-view></router-view>
		</Suspense>
		
	</div>

</template>

<style scoped>
</style>