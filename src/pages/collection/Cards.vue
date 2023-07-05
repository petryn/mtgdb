<script setup>
    import { ref, inject } from 'vue';
    import CardCollComponent from '@/components/CardCollection.vue';
    import FilterCardsComponent from '@/components/FilterCards.vue';
    import SubHeader from '@/components/SubHeader.vue';
    import Pagination from '@/components/Pagination.vue';

    //init
    const userData = inject('userData', {});

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

                allCards.push(cardData);
            }
        }
    }

    //holds cards to show on page
    const pagedCards = ref();
    const currentPage = ref(1);

    //holds cards to show on page
    let filteredCards = ref(allCards);

    //update function from filter component
    function updateCards(cards){
        filteredCards.value = cards;
    }

    //update function from paginator component
    function updatePaged(cards, cp){
        pagedCards.value = cards;
        currentPage.value = cp;
    }

</script>

<template>
    <div v-if="allCards.length === 0">No cards in collection!</div>

    <SubHeader>
        <template #title>
            Collection cards
        </template>        
        <template #pagination>
            <Pagination :cards="filteredCards" :selectedPage="currentPage" @return="updatePaged" />
        </template>
        <template #filter>
            <FilterCardsComponent @return="updateCards" :cards="allCards" />
        </template>
    </SubHeader>

	<div class="row row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
		<CardCollComponent v-for="card in pagedCards" :card="card" :key="card.uuid" :showQuantity="false" />
	</div>
</template>