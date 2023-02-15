<script setup>
	import { useRoute } from 'vue-router';
	import { ref, inject } from 'vue';
	import card from '../components/Card.vue';

	const route = useRoute();

	const setData = await import('../data/' + route.params.code + '.json');

	let cards = setData.data.cards;
	if(setData.data.tokens.length > 0){
		cards = cards.concat(setData.data.tokens);
	}

	const dataBase = inject('dataBase');

	//get local database
	const localData = dataBase.getData();

	for(const card of cards){

		const lv = localData.sets?.[setData.data.code]?.[card.uuid];

		if(lv != undefined){
			card.incollection = lv;
		}else{
			card.incollection = '';
		}
	}

	function updateCard(val, card){
		dataBase.setData(setData.data.code, card.uuid, val);
	}

	let searchName = ref('');
	let searchNumber = ref('');

	function search() {
		if (searchName.value || searchNumber.value) {
			let out = cards;

			if(searchName.value){
				out = out.filter(el => {
					return el.name.match(new RegExp(searchName.value, "i"));
				});
			}

			if(searchNumber.value){
				out = out.filter(el => {
					return el.number.match(new RegExp(searchNumber.value, "i"));
				});
			}

			return out;
		} else {
			return cards;
		}
	}

</script>

<template>
	<div class="row mb-3 align-items-center">
		<div class="col-auto">
			<h3 >{{setData.data.name}}</h3>
		</div>
		<div class="col-auto">
			<label for="name" class="ms-1 col-form-label text-white">Name:</label>
		</div>
		<div class="col-auto">			
			<input class="form-control form-control-sm" v-model="searchName" />
		</div>
		<div class="col-auto">
			<label for="name" class="ms-1 col-form-label text-white">Number:</label>
		</div>
		<div class="col-auto">			
			<input class="form-control form-control-sm" v-model="searchNumber" />
		</div>
	</div>
	<div class="row row-cols-4">
		<card v-for="card in search()" :card="card" @upd="updateCard" />
	</div>
</template>
  
<style>

</style>
