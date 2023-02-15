<script setup>
	import setsData from '../../data/SetList.json';
	import { ref, inject } from 'vue';

	const dataBase = inject('dataBase');

	//get local database
	const localData = dataBase.getData();

	let fullData = [];

	for (const set of setsData.data) {		

		if(set.code in localData.sets){
			console.log(set);

			set.inCollection = Object.keys(localData.sets[set.code]).length;
			set.keyruneCode = set.keyruneCode.toLowerCase();
			fullData.push(set);
		}
	}


</script>

<template>

	<table class="table table-light table-striped table-hover align-middle">
		<thead>
			<tr>
				<th>&nbsp;</th>
				<th>Code</th>
				<th>Name</th>
				<th>Count</th>
				<th>Release Date</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="set in fullData">
				<td class="text-center"><i class="ss ss-2x" :class="`ss-${set.keyruneCode}`"></i></td>
				<td>{{ set.code }}</td>
				<td>{{ set.name }}</td>
				<td>{{ set.inCollection }} / {{ set.totalSetSize }}</td>
				<td>{{ set.releaseDate }}</td>
			</tr>
		</tbody>
	</table>

	
</template>
  
<style>
</style>
