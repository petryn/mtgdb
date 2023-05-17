<script setup>
    import { ref } from 'vue';

	const props = defineProps({
		cards: Array,
		filters: {
			type: Array,
			default: ['name', 'number']
		},
		colors: Array
	});

	const filters = props.filters;

    const searchName = ref();
	const searchNumber = ref();
	const searchColor = ref([]);

    const emit = defineEmits(['return']);

	function filterCards(){
		let outFiltered = props.cards;

		if(searchName.value !== undefined){
			outFiltered = outFiltered.filter(el => {
				return el.name.match(new RegExp(searchName.value, "i"));
			});
		}

		if(searchNumber.value !== undefined){
			outFiltered = outFiltered.filter(el => {
				return el.number.match(new RegExp(searchNumber.value, "i"));
			});				
		}

		if(searchColor.value.length > 0){
			for(const colorSelected of searchColor.value){
				outFiltered = outFiltered.filter(el => {
					return el.colors.includes(colorSelected);
				});	
			}
		}

		emit('return', outFiltered);
	}

</script>

<template>

	<template v-if="filters.includes('name')">
		<div class="col-auto">
			<label class="ms-1 col-form-label text-light">Name:</label>
		</div>
		<div class="col-auto">			
			<input class="form-control form-control-sm" @input="filterCards()" v-model="searchName" />
		</div>
	</template>
		
	<template v-if="filters.includes('number')">
		<div class="col-auto">
			<label class="ms-1 col-form-label text-light">Number:</label>
		</div>
		<div class="col-auto">			
			<input class="form-control form-control-sm" @input="filterCards()" v-model="searchNumber" />
		</div>
	</template>

	<template v-if="filters.includes('color')">
		<div class="col-auto">
			<label class="ms-1 col-form-label text-light">Color:</label>
		</div>

		<div class="col-auto">	
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorWhite" value="W" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorWhite"><i class="magic magic-w magic-cost"></i></label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorBlue" value="U" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorBlue"><i class="magic magic-u magic-cost"></i></label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorBlack" value="B" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorBlack"><i class="magic magic-b magic-cost"></i></label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorRed" value="R" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorRed"><i class="magic magic-r magic-cost"></i></label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorGreen" value="G" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorGreen"><i class="magic magic-g magic-cost"></i></label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" id="colorLess" value="C" v-model="searchColor" @change="filterCards()">
				<label class="form-check-label" for="colorLess"><i class="magic magic-c magic-cost"></i></label>
			</div>
		</div>

	</template>

</template>

<style scoped>
	.magic {
		margin-top: -5px;
	}
</style>