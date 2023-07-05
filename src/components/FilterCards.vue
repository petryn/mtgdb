<script setup>
    import { ref } from 'vue';

	const props = defineProps({
		cards: Array,
		filters: {
			type: Array,
			default: ['name', 'number', 'color', 'type', 'subtype', 'supertype', 'rarity', 'text']
		}
	});

	const filters = props.filters;
	const cardsTotal = props.cards.length;
	let outFiltered = ref(props.cards);

	//search models
    const searchName = ref();
	const searchNumber = ref();
	const searchColor = ref([]);
	const searchRarity = ref();
	const searchType = ref();
	const searchSubType = ref();
	const searchSuperType = ref();
	const searchText = ref();	

    const emit = defineEmits(['return']);

	//
	let availableTypes = [];
	let availableSubTypes = [];
	let availableSuperTypes = [];

	//loop all cards and set available filters
	for(const card of props.cards){		

		for(const t of card.types){
			if(availableTypes.includes(t) === false){
				availableTypes.push(t);
			}
		}

		for(const s of card.subtypes){
			if(availableSubTypes.includes(s) === false){
				availableSubTypes.push(s);
			}
		}

		for(const s of card.supertypes){
			if(availableSuperTypes.includes(s) === false){
				availableSuperTypes.push(s);
			}
		}
	}

	function filterCards(){	
		outFiltered.value = props.cards;
		let tmp = outFiltered.value;

		if(searchName.value !== undefined){
			tmp = tmp.filter(el => {
				return el.name.match(new RegExp(searchName.value, "i"));
			});
		}

		if(searchNumber.value !== undefined){
			tmp = tmp.filter(el => {
				return el.number.match(new RegExp(searchNumber.value, "i"));
			});
		}
		
		if(searchRarity.value !== undefined && searchRarity.value !== ''){
			tmp = tmp.filter(el => {
				return el.rarity === searchRarity.value;
			});
		}

		//TYPE
		if(searchType.value !== undefined && searchType.value !== ''){
			tmp = tmp.filter(el => {				
				return el.types.includes(searchType.value);
			});
		}

		//SUBTYPE
		if(searchSubType.value !== undefined && searchSubType.value !== ''){
			tmp = tmp.filter(el => {				
				return el.subtypes.includes(searchSubType.value);
			});
		}

		//SUPERTYPES
		if(searchSuperType.value !== undefined && searchSuperType.value !== ''){
			tmp = tmp.filter(el => {				
				return el.supertypes.includes(searchSuperType.value);
			});
		}


		if(searchColor.value.length > 0){
			for(const colorSelected of searchColor.value){
				tmp = tmp.filter(el => {
					return el.colors.includes(colorSelected);
				});	
			}
		}

		if(searchText.value !== undefined){
			tmp = tmp.filter(el => {
				return el.originalText?.match(new RegExp(searchText.value, "i"));
			});
		}

		outFiltered.value = tmp;

		emit('return', outFiltered.value);
	}

</script>

<template>

	<div class="row justify-content-end">

		<div class="col-auto">
			<span class="text-light me-2 align-middle">{{ outFiltered.length }} / {{ cardsTotal }}</span>
			<button class="btn btn-sm btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilter">
				Filters
			</button>
		</div>	
	</div>

	<div class="offcanvas offcanvas-start" data-bs-theme="dark" data-bs-scroll="true" tabindex="-1" id="offcanvasFilter" >
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" >Filters</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
		</div>
		<div class="offcanvas-body">

			<template v-if="filters.includes('name')">
				<label class="ms-1 col-form-label text-light">Name:</label>	
				<input class="form-control form-control-sm" @input="filterCards()" v-model="searchName" />
			</template>
				
			<template v-if="filters.includes('rarity')">
				<label class="ms-1 col-form-label text-light">Rarity:</label>
				<select class="form-select form-select-sm" @change="filterCards()" v-model="searchRarity">
					<option values="" selected></option>
					<option value="common">Common</option>
					<option value="uncommon">Uncommon</option>
					<option value="rare">Rare</option>
					<option value="mythic">Mythic</option>
				</select>
			</template>

			<template v-if="filters.includes('type')">
				<label class="ms-1 col-form-label text-light">Type:</label>
				<select class="form-select form-select-sm" @change="filterCards()" v-model="searchType">
					<option values="" selected></option>
					<option v-for="type in availableTypes" :value="type">{{type}} </option>
				</select>
			</template>

			<template v-if="filters.includes('subtype')">
				<label class="ms-1 col-form-label text-light">Sub Type:</label>
				<select class="form-select form-select-sm" @change="filterCards()" v-model="searchSubType">
					<option values="" selected></option>
					<option v-for="type in availableSubTypes" :value="type">{{type}} </option>
				</select>
			</template>

			<template v-if="filters.includes('supertype')">
				<label class="ms-1 col-form-label text-light">Super Type:</label>
				<select class="form-select form-select-sm" @change="filterCards()" v-model="searchSuperType">
					<option values="" selected></option>
					<option v-for="type in availableSuperTypes" :value="type">{{type}} </option>
				</select>
			</template>

			<template v-if="filters.includes('color')">
				<label class="ms-1 col-form-label text-light">Color:</label>
				<br>
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
				<br>
			</template>

			<template v-if="filters.includes('number')">
				<label class="ms-1 col-form-label text-light">Number:</label>	
				<input class="form-control form-control-sm" @input="filterCards()" v-model="searchNumber" />
			</template>

			<template v-if="filters.includes('text')">
				<label class="ms-1 col-form-label text-light">Text:</label>	
				<input class="form-control form-control-sm" @input="filterCards()" v-model="searchText" />
			</template>
		</div>
	</div>

</template>

<style scoped>
	.magic {
		margin-top: -5px;
	}

	
</style>