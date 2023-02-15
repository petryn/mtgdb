export default class DB
{	
	#localData = {
		sets: {}
	};

	constructor()
	{		
		const ld = localStorage.getItem('dbData');

		if(ld != null){
			this.#localData = JSON.parse(ld);
		}
	}

	getData() 
	{
		return this.#localData;
	}

	setData(set, cardId, amount) 
	{
		//add set if not available
		if(this.#localData.sets[set] == undefined){
			this.#localData.sets[set] = {};
		}

		//add card info
		if(amount == null || amount == ''){
			delete this.#localData.sets[set][cardId];
		}else{
			this.#localData.sets[set][cardId] = amount;
		}		

		//remove set if empty
		if(Object.entries(this.#localData.sets[set]).length == 0){
			delete this.#localData.sets[set];
		}

		localStorage.setItem('dbData', JSON.stringify(this.#localData));
	}
}