<script setup>
	import { ref, reactive } from 'vue';
	import { vIntersectionObserver } from '@vueuse/components';

	const props = defineProps({
		card: Object,
		showQuantity: {
			type: Boolean,
			default: true
		}
	});
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

	console.log(props);
</script>

<template>
	<div class="col pb-4">

		<div class="card" v-intersection-observer="onElementVisibility">
			<div class="row">
				<div class="col-md-8 pe-0">
					<div class="card-body p-2">
						<h6 class="card-title">
							{{cardData.name}}
							
							<i class="ss fs-4 ss-fw" :class="`ss-${cardData.setCode.toLowerCase()} ss-${cardData.rarity}`"></i>
							<span class="badge float-end bg-secondary">{{cardData.number}}</span>
						</h6>
					</div>
					<ul class="list-group list-group-flush border-top fw-light">
						<li v-if="props.showQuantity === true" class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Quantity:</span></div>
								<div class="col-8">
									{{cardData.swapQuantity}}
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Color:</span></div>
								<div class="col-8">
									<i v-for="color in cardData.colors" class="magic magic-cost" :class="'magic-'+color.toLowerCase()"></i>
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Type:</span></div>
								<div class="col-8">
									{{cardData.type}}
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Rarity:</span></div>
								<div class="col-8">
									{{cardData.rarity}}
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Mana cost:</span></div>
								<div class="col-8">
									{{cardData.manaValue}}
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
	div {
		font-size: 14px;
	}
	.card-title {
		margin-bottom: 0;
	}
</style>
