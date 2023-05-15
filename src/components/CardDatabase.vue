<script setup>
	import { ref, computed, reactive } from 'vue';
	import { vIntersectionObserver } from '@vueuse/components';

	const props = defineProps(['card']);
	const cardData = reactive(props.card);
	const imgEl = ref(null);
	const spinner = ref(null);

	let isVisible = false;
	let loadedId = false;	

	function onElementVisibility([{ isIntersecting }]) {
		isVisible = isIntersecting;
		loadImage();
	}

	function loadImage(){
		if(isVisible && loadedId != cardData.uuid && imgEl.value){
			let imgUrl = 'https://api.scryfall.com/cards/'+cardData.identifiers.scryfallId+'?format=image';

			if(cardData.side == 'b'){
				imgUrl += '&face=back';
			}

			imgEl.value.src = imgUrl;
			loadedId = cardData.uuid;
			spinner.value.style.display = "none";
		}
		
	}

	const emit = defineEmits(['upd']);

	const collection = computed({
		get() {
			return cardData.collection;
		},
		set(value) {
			cardData.collection = value;
			emit('upd', cardData);
		}
	});

	const swap = computed({
		get() {
			return cardData.swap;
		},
		set(value) {
			cardData.swap = value;
			emit('upd', cardData);
		}
	});

	const notes = computed({
		get() {
			return cardData.notes;
		},
		set(value) {
			cardData.notes = value;
			emit('upd', cardData);
		}
	});

	defineExpose({
		loadImage
	});

</script>

<template>
	<div class="col pb-4">

		<div class="card" v-intersection-observer="onElementVisibility" >
			<div class="row">
				<div class="col-md-8 pe-0">
					<div class="card-body p-2">
						<h5 class="card-title ">
							{{cardData.name}}
							<span :class="collection > 0 ? 'bg-success' : 'bg-secondary'" class="badge float-end">{{cardData.number}}</span>
						</h5>
					</div>
					<ul class="list-group list-group-flush border-top fw-light">
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Collection:</span></div>
								<div class="col-8">
									<input class="form-control form-control-sm border-0 rounded-0" v-model="collection" type="number"/>
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Swap:</span></div>
								<div class="col-8">
									<input class="form-control form-control-sm border-0 rounded-0" v-model="swap" type="number" />
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Notes:</span></div>
								<div class="col-8">
									<input class="form-control form-control-sm border-0 rounded-0" v-model="notes" />
								</div>
							</div>	
						</li>
					</ul>
					
				</div>

				<div class="col-md-4 border-start d-flex justify-content-center align-items-center ps-0">
					<a :href="`https://api.scryfall.com/cards/${cardData.identifiers.scryfallId}?format=image`" target="_blank">								
						<img ref="imgEl" class="img-fluid rounded p-2" />
					</a>
					<div ref="spinner" class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<style scoped>
	.form-control-sm {
		font-size: .800rem;
	}
</style>
