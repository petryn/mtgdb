<script setup>
import setsData from '../data/SetList.json';
import { ref } from 'vue';

let fullData = [];

for (const set of setsData.data) {
	if (set.isOnlineOnly === true) {
		continue;
	}

	let obj = {};

	obj.baseSetSize = set.baseSetSize;
	obj.code = set.code;
	obj.name = set.name;
	obj.releaseDate = set.releaseDate;
	obj.totalSetSize = set.totalSetSize;
	obj.type = set.type;
	obj.keyruneCode = set.keyruneCode.toLowerCase();

	fullData.push(obj);
}

let searchName = ref('');
let searchDate = ref('');
let searchCode = ref('');

function search() {

	if (searchName.value || searchDate.value || searchCode.value) {
		let out = fullData;

		if(searchName.value){
			out = out.filter(el => {
				return el.name.match(new RegExp(searchName.value, "i"));
			});
		}
		
		if(searchDate.value){
			out = out.filter(el => {
				return el.releaseDate.match(new RegExp(searchDate.value, "i"));
			});
		}

		if(searchCode.value){
			out = out.filter(el => {
				return el.code.match(new RegExp(searchCode.value, "i"));
			});
		}

		return out;
	} else {
		return fullData;
	}

}
</script>

<template>
	<div class="row mb-4 align-items-center">
		<div class="col-auto">
			<label for="name" class="ms-1 col-form-label text-white">Name:</label>
		</div>
		<div class="col-auto">
			<input v-model="searchName" id="name" />
		</div>
		<div class="col-auto">
			<label for="code" class="ms-1 col-form-label text-white">Code:</label>
		</div>
		<div class="col-auto">
			<input v-model="searchCode" id="code" />
		</div>
		<div class="col-auto">
			<label for="date" class="ms-1 col-form-label text-white">Date:</label>
		</div>
		<div class="col-auto">
			<input v-model="searchDate" id="date" />
		</div>
	</div>	

	<table class="table table-light table-striped table-hover align-middle">
		<thead>
			<tr>
				<th>&nbsp;</th>
				<th>Code</th>
				<th>Name</th>				
				<th>Release Date</th>
				<th>Total Size</th>
				<th>Base Size</th>
				<th>Type</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="set in search()">
				
				<td class="text-center"><i class="ss ss-2x" :class="`ss-${set.keyruneCode}`"></i></td>
				<td><router-link :to="`/set/${set.code}`">{{ set.code }}</router-link></td>
				<td><router-link :to="`/set/${set.code}`">{{ set.name }}</router-link></td>				
				<td>{{ set.releaseDate }}</td>
				<td>{{ set.totalSetSize }}</td>
				<td>{{ set.baseSetSize }}</td>
				<td>{{ set.type }}</td>
			</tr>
		</tbody>
	</table>

	
</template>
  
<style>

</style>
