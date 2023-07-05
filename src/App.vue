<script setup>
	import Header from './components/Header.vue';
</script>

<template>
	<Suspense>
		<Header />
	</Suspense>
	
	<div class="container-fluid">
		<Suspense>
			<router-view></router-view>
		</Suspense>		
	</div>
</template>

<style>
	body {
		background-color: #31314B;
	}

	.list-group-item {
		background-color: transparent;
	}

	h1, h3 {
		color: #F5F6F4;
	}

	h6 {
		color: #31314B;
	}

	.card {
		background-color: #F5F6F4;
	}

	a {
		color: #D85333;
		text-decoration: none;
	}

	a:hover {
		color: #E68564;
	}
	
</style>

<style scoped>
	header {
		background-color: #D85333;		
	}
	header .nav{
		text-transform: uppercase;
	}
	
	header .dropdown-menu {
		background-color: #D85333;	
		border-color: #F5F6F4;
	}
	
</style>