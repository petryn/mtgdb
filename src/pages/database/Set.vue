<script setup>
	import { useRoute } from 'vue-router';
	import { ref, inject } from 'vue';
	import { useDatabase, useCurrentUser } from 'vuefire';
	import { ref as dbRef, set } from 'firebase/database';
	import CardDbComponent from '@/components/CardDatabase.vue';
	import FilterCardsComponent from '@/components/FilterCards.vue';

	const db = useDatabase();
	const route = useRoute();
	const setCode = route.params.code;

	//get cards data
	const res = await fetch('/data/' + setCode + '.json');
	const setData = await res.json();
	let cards = setData.data.cards;

	//add tokens cards
	if(setData.data.tokens.length > 0){
		cards = cards.concat(setData.data.tokens);
	}

	//load set collection data from database
	const user = useCurrentUser();

	const dbPath = 'users/'+user.value.uid;
	const collectionDbPath = dbPath+'/collection/'+setCode;
	const swapDbPath = dbPath+'/swap/'+setCode;
	const notesDbPath = dbPath+'/notes/'+setCode;

	//get cached user data
	const userData = inject('userData', {});

	for(const card of cards){
		const isSetColl = userData?.collection?.[setCode]?.[card.uuid] ?? false;
		const isSetSwap = userData?.swap?.[setCode]?.[card.uuid] ?? false;
		const isSetNotes = userData?.notes?.[setCode]?.[card.uuid] ?? false;

		card.collection = isSetColl ? isSetColl: '';
		card.swap = isSetSwap ? isSetSwap: '';
		card.notes = isSetNotes ? isSetNotes: '';
	}

	//update database
	function updateCard(card){		
		set(dbRef(db, collectionDbPath+'/'+card.uuid), card.collection);
		set(dbRef(db, swapDbPath+'/'+card.uuid), card.swap);
		set(dbRef(db, notesDbPath+'/'+card.uuid), card.notes);
	}

	//holds cards to show on page
	let filteredCards = ref(cards);

	//update card list from filter component
	function updateCards(cards){
		filteredCards.value = cards;
	}
</script>

<template>
	<div class="row mb-3 align-items-center">
		<div class="col-auto">
			<h3 >{{setData.data.name}}</h3>
		</div>

		<FilterCardsComponent @return="updateCards" :cards="cards" />
		
	</div>
	<div class="row row-cols-4">
		<CardDbComponent v-for="card in filteredCards" :card="card" @upd="updateCard" :key="card.uuid" />
	</div>
</template>  
