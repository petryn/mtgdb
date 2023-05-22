<script setup>
    import { ref, inject } from 'vue';
    import CardCollComponent from '@/components/CardCollection.vue';
    import FilterCardsComponent from '@/components/FilterCards.vue';

    //init
    const userData = inject('userData', {});

    //filters setup
    const selectedFilters = ['name', 'number', 'color', 'type', 'rarity', 'text'];
    let availableColors = [];
    let availableTypes = [];

    //array for all cards
    let allCards = [];    

    //get all collection cards
    if(userData.collection !== undefined){

        for(const [collSetCode, collSetCards] of Object.entries(userData.collection)){

            const res = await fetch('/data/' + collSetCode + '.json');
            const setData = await res.json();

            //merge cards and tokens
            let setCards = setData.data.cards;
            setCards = setCards.concat(setData.data.tokens);
           
            for(const [cardId, q] of Object.entries(collSetCards)){
                //if empty or 0 skip
                if(typeof q !== 'number' || q <= 0){
                    continue;
                }               

                const cardData = setCards.find(e => e.uuid === cardId);

                //loop card colors
                for(const color of cardData.colors){
                    //add if not in filters already
                    if(availableColors.includes(color) === false){
                        availableColors.push(color);
                    }
                }

                if(availableTypes.includes(cardData.type) === false){
                    availableTypes.push(cardData.type);
                }

                allCards.push(cardData);
            }
        }
    }

    //holds cards to show on page
    let filteredCards = ref(allCards);

    //update function from filter component
    function updateCards(cards){
        filteredCards.value = cards;
    }

</script>

<template>
    <div v-if="allCards.length === 0">No cards in collection!</div>

    <div class="row mb-3 align-items-center">
		<div class="col-10">
			<h3>Swap list</h3>
		</div>
		
        <div class="col-2">        
            <FilterCardsComponent @return="updateCards" :cards="allCards" :filters="selectedFilters" :colors="availableColors" :types="availableTypes" />
        </div>
	</div>
	<div class="row row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
		<CardCollComponent v-for="card in filteredCards" :card="card" :key="card.uuid" />
	</div>
</template>