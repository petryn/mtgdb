<script setup>
import { inject } from 'vue';

const res = await fetch('/data/prices.json');
const prices = await res.json();

const dataBase = inject('dataBase');
const localData = dataBase.getData();

for (const [set, setData] of Object.entries(localData.sets)) {

	let setSum = 0;
	let setSumFoil = 0;

	for (const uuid in setData) {
		const priceData = prices.data[uuid];

		let cardPrice = 'no data';
		let cardPriceFoil = 'no data';

		if (priceData != undefined) {
			let cardSum = 0;
			let cardPriceCount = 0;

			let cardSumFoil = 0;
			let cardPriceCountFoil = 0;

			for (const [provider, pdata] of Object.entries(priceData)) {
				if (pdata.retail.normal != undefined) {
					cardSum += pdata.retail.normal;
					cardPriceCount++;
				}

				if (pdata.retail.foil != undefined) {
					cardSumFoil += pdata.retail.foil;
					cardPriceCountFoil++;
				}
			}

			cardPrice = cardSum / cardPriceCount;
			cardPriceFoil = cardSumFoil / cardPriceCountFoil;

			setSum += cardPrice;
			setSumFoil += cardPriceFoil;
		}

		setData[uuid] = {
			'count': setData[uuid],
			'normal': cardPrice,
			'foil': cardPriceFoil
		}
	}

	setData.price = {
		'normal': setSum,
		'foil': setSumFoil,
	};
}

console.log(localData);

</script>

<template>
	<div class="accordion" id="accordionExample">
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingOne">
				<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
					aria-expanded="true" aria-controls="collapseOne">
					Accordion Item #1
				</button>
			</h2>
			<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
				data-bs-parent="#accordionExample">
				<div class="accordion-body">
					<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
					plugin adds the appropriate classes that we use to style each element. These classes control the
					overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of
					this with custom CSS or overriding our default variables. It's also worth noting that just about any
					HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingTwo">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
					Accordion Item #2
				</button>
			</h2>
			<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
				data-bs-parent="#accordionExample">
				<div class="accordion-body">
					<strong>This is the second item's accordion body.</strong> It is hidden by default, until the
					collapse plugin adds the appropriate classes that we use to style each element. These classes
					control the overall appearance, as well as the showing and hiding via CSS transitions. You can
					modify any of this with custom CSS or overriding our default variables. It's also worth noting that
					just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
					overflow.
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingThree">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
					Accordion Item #3
				</button>
			</h2>
			<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
				data-bs-parent="#accordionExample">
				<div class="accordion-body">
					<strong>This is the third item's accordion body.</strong> It is hidden by default, until the
					collapse plugin adds the appropriate classes that we use to style each element. These classes
					control the overall appearance, as well as the showing and hiding via CSS transitions. You can
					modify any of this with custom CSS or overriding our default variables. It's also worth noting that
					just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
					overflow.
				</div>
			</div>
		</div>
	</div>
</template>