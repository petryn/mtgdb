<script setup>
	import { ref, onUpdated, computed } from 'vue';
	import { vElementVisibility } from '@vueuse/components'

	const props = defineProps(['card']);
	const imgEl = ref(null);
	let isVisible = false;
	let loadedId = false;

	onUpdated(() => {
		loadImage();		
	});

	function onElementVisibility(state) {
		isVisible = state;
		loadImage();
	}

	function loadImage(){
		if(isVisible && loadedId != props.card.uuid && imgEl.value){
			let imgUrl = 'https://api.scryfall.com/cards/'+props.card.identifiers.scryfallId+'?format=image';

			if(props.card.side == 'b'){
				imgUrl += '&face=back';
			}

			imgEl.value.src = imgUrl;
			loadedId = props.card.uuid;
		}
	}

	const emit = defineEmits(['upd'])

	const inCollection = computed({
		get() {
			return props.card.incollection;
		},
		set(value) {
			props.card.incollection = value;
			emit('upd', value, props.card);
		}
	});

	console.log(parseInt(inCollection.value) > 0);

</script>

<template>
	<div class="col pb-4">

		<div class="card" :class="inCollection > 0 ? 'bg-success-subtle' : ''" v-element-visibility="onElementVisibility">
			<div class="row">
				<div class="col-md-8 pe-0">
					<div class="card-body p-2">
						<h6 class="card-title ">{{card.name}}</h6>
					</div>
					<ul class="list-group list-group-flush border-top fw-light lh-1">
						<li class="list-group-item p-2">
							<span class="float-start">Num:</span>
							<span class="float-end">{{card.number}}</span>
						</li>
						<li class="list-group-item p-2">
							<span class="float-start">Foil:</span>
							<span class="float-end">{{card.hasFoil}}</span>
						</li>
						<li class="list-group-item p-2">
							<span class="float-start">Side:</span>
							<span class="float-end">{{card.side}}</span>
						</li>
						<li class="list-group-item p-2">
							<span class="float-start">Collection:</span>
							<span class="float-end">
								<input class="form-control form-control-sm" v-model="inCollection" />
							</span>
						</li>
					</ul>
				</div>

				<div class="col-md-4 border-start ">
					<a :href="`https://api.scryfall.com/cards/${card.identifiers.scryfallId}?format=image`" target="_blank">
						<img ref="imgEl" class="img-fluid rounded p-2" />
					</a>
				</div>
			</div>
		</div>

	</div>

</template>