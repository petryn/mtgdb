<script setup>
    import { ref, computed } from 'vue';

	const props = defineProps(['cards']);
	const cards = props.cards;

    let searchName = ref('');
	let searchNumber = ref('');

    const emit = defineEmits(['return']);

	function filterCards(){
		let outFiltered = cards;

		if (searchName.value || searchNumber.value) {

			if(searchName.value){
				outFiltered = outFiltered.filter(el => {
					return el.name.match(new RegExp(searchName.value, "i"));
				});
			}

			if(searchNumber.value){
				outFiltered = outFiltered.filter(el => {
					return el.number.match(new RegExp(searchNumber.value, "i"));
				});				
			}
		}

		emit('return', outFiltered);
	}

</script>

<template>
    <div class="col-auto">
        <label for="name" class="ms-1 col-form-label text-light">Name:</label>
    </div>
    <div class="col-auto">			
        <input class="form-control form-control-sm" @input="filterCards()" v-model="searchName" />
    </div>
    <div class="col-auto">
        <label for="name" class="ms-1 col-form-label text-light">Number:</label>
    </div>
    <div class="col-auto">			
        <input class="form-control form-control-sm" @input="filterCards()" v-model="searchNumber" />
    </div>
</template>