<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useDatabase } from 'vuefire';
	import { ref as dbRef, get } from 'firebase/database';
    import CardCollComponent from '@/components/CardCollection.vue';
    import FilterCardsComponent from '@/components/FilterCards.vue';
    import SubHeader from '@/components/SubHeader.vue';
    import Pagination from '@/components/Pagination.vue';

    //init
    const db = useDatabase();
	const route = useRoute();
    const getUid = route.params.uid;
    const dbPath = 'users/'+getUid+'/swap/';

    //get database
    const swapDb = await get(dbRef(db, dbPath));

    //array for all cards
    let allCards = [];

    //loop all swaps if exists
    if(swapDb.exists()){
        const swapData = swapDb.val();

        for(const [swapSetCode, swapSetCards] of Object.entries(swapData)){

            const res = await fetch('/data/' + swapSetCode + '.json');
            const setData = await res.json();

            //merge cards and tokens
            let setCards = setData.data.cards;
            setCards = setCards.concat(setData.data.tokens);

            for(const [cardId, q] of Object.entries(swapSetCards)){
                //if empty or 0 skip
                if(typeof q !== 'number' || q <= 0){
                    continue;
                }

                let cardData = setCards.find(e => e.uuid === cardId);
                cardData.swapQuantity = q;               

                allCards.push(cardData);
            }
        }
    }

    //holds cards to show on page
    const pagedCards = ref();
    const currentPage = ref(1);

    //filtered cards
    const filteredCards = ref(allCards);

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
    <div v-if="allCards.length === 0">No swap data found!</div>

    <SubHeader>
        <template #title>
            Swap list
        </template>        
        <template #pagination>
            <Pagination :cards="filteredCards" :selectedPage="currentPage" @return="updatePaged" />
        </template>
        <template #filter>
            <FilterCardsComponent @return="updateCards" :cards="allCards" />
        </template>
    </SubHeader>

	<div class="row row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-3">
		<CardCollComponent v-for="card in pagedCards" :card="card" :key="card.uuid" />
	</div>

    <div class="mb-4">
        <Pagination :cards="filteredCards" :selectedPage="currentPage" @return="updatePaged" />
    </div>
    
</template>