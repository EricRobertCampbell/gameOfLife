function generateGrid(size) {
	let container = document.getElementById('gameContainer');
	for (let row = 0; row < size; row++) {
		currentRow = [];
		for (let column = 0; column < size; column++) {
			currentRow.push(document.createElement('div'));
		}
	}

}





window.onload = () => {
	let size; //dimensions of the game board
	let generation; //current generation
	let maxGeneration; //the maximum number of generations to compute
	let grid = []; //multidimensional list of divs representing the game board


	let start = document.getElementsByTagName('button')[0];
	start.addEventListener('click', () => {
		console.log('Button clicked!');
		let sizeInput = document.getElementById('size');
	 	size = Number.isNaN(Number(sizeInput.value)) ? 0 : Number(sizeInput.value);
	});





};
