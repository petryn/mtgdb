<script setup>
    import { ref, watch } from 'vue';

    const emit = defineEmits(['return']);

    const props = defineProps({
		cards: Array,
        selectedPage: Number
	});

    const perPage = 60;
    const pages = ref(0);
    const currentPage = ref(1);

    watch(() => props.cards, initPages);

    function initPages(cards){
        pages.value = Math.ceil(cards.length / perPage);
        currentPage.value = props.selectedPage;
        pagedReturn();
    }

    function changePage(page, incremental = false){
        let cp = currentPage.value;

        if(incremental){            
            cp = cp + page;
        }else{
            cp = page;
        }
        
        if(cp < 1){
            cp = 1;
        }

        if(cp > pages.value){
            cp = pages.value;
        }

        currentPage.value = cp;

        pagedReturn();
    }

    function pagedReturn(){
        const pagedData = props.cards.slice((currentPage.value - 1) * perPage, currentPage.value * perPage);
        emit('return', pagedData, currentPage.value);
    }

    initPages(props.cards);
    pagedReturn();

</script>

<template>
    <div id="pagination" class="d-flex justify-content-center">
        <ul class="pagination pagination-sm">
            <li class="page-item">
                <a class="page-link" @click="changePage(-1, true)">
                    <span>&laquo;</span>
                </a>
            </li>     

            <template v-for="page in pages">
                <li class="page-item">
                    <a class="page-link" :class="(page == currentPage)? `active` : ``" @click="changePage(page)">{{page}}</a>
                </li>
            </template>            
            
            <li class="page-item">
                <a class="page-link" @click="changePage(1, true)">
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </div>    
</template>

<style scoped>
    ul {
        margin-bottom: 0;
    }

    .page-link {
        background-color: #31314B;
        border-color: #F5F6F4;
        color: #F5F6F4;
        cursor: pointer;
    }

    .page-link.active {
        background-color: #F5F6F4;
        color: #31314B;
    }

    .page-link:hover {
        background-color: #F5F6F4;
        color: #31314B;
    }
</style>