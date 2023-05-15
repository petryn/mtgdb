<script setup>
	import { ref, onUpdated, reactive } from 'vue';
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

</script>

<template>
	<div class="col pb-4">

		<div class="card" v-intersection-observer="onElementVisibility">
			<div class="row">
				<div class="col-md-8 pe-0">
					<div class="card-body p-2">
						<h6 class="card-title ">
							{{cardData.name}}
							<i class="ss float-end ss-2x ss-fw" :class="`ss-${cardData.setCode.toLowerCase()} ss-${cardData.rarity}`"></i>
						</h6>
					</div>
					<ul class="list-group list-group-flush border-top fw-light">
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Quantity:</span></div>
								<div class="col-8">
									{{cardData.number}}
								</div>
							</div>	
						</li>
						<li class="list-group-item p-0">
							<div class="row my-1">
								<div class="col-4"><span class="align-middle ms-2">Color:</span></div>
								<div class="col-8">
									<span></span>
									
									{{cardData.colors}}
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
								<div class="col-4"><span class="align-middle ms-2">Number:</span></div>
								<div class="col-8">
									{{cardData.number}}
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


