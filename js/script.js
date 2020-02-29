/*
FUNCTIONS
*/

function changeColours() {
	this.className = this.className == 'dead' ? 'alive' : 'dead';
}

//takes in a 2d array of live (1) or dead (0) cells
//return the number of live neighbours that it has
function numberOfNeighbours(grid, row, column) {
	let neighbours = 0;
	for (let r = row - 1; r <= row + 1; r++) {
		for (let c = column - 1; c <= column + 1; c++) {
			//test if this is valid
			if (r in grid && c in grid[r])
				neighbours += grid[r][c]; 
		}
	}
	//account for the fact that if the centre cell is alive, it will be counted
	neighbours -= grid[row][column];
	return neighbours;
}

//take in a grid of elements, each which is either alive or dead (by class)
//copy this to another array, but this one consisting only of 1 (alive) or dead (0)
//traverse thorugh the grid of 0s and 1s, and apply the rules of the game of life
//push changes to the grid of elements
function gameOfLife(grid) {
	let symbolic = [];
	for (let row = 0; row < grid.length; row++) {
		let currentRow = [];
		for (let column = 0; column < grid[row].length; column++) {
			switch (grid[row][column].className) {
				case 'dead':
					currentRow.push(0);
					break;
				case 'alive':
					currentRow.push(1);
					break;
				default:
					console.log('Encountered an element that is neither dead nor alive. Abort!');
					break;
			}
		}
		symbolic.push(currentRow);
	}

	//now go through and for each cell, determine the number of live neighbours
	for (let row = 0; row < grid.length; row++) {
		for (let column = 0; column < grid[row].length; column++) {
			//console.log(`row: ${row}; column ${column}; neighbours: ${numberOfNeighbours(symbolic, row, column)}`);
			let neighbours = numberOfNeighbours(symbolic, row, column);
			if ((neighbours == 2 && symbolic[row][column] == 1) || neighbours == 3) {
				grid[row][column].className = 'alive';
			} else {
				grid[row][column].className = 'dead';
			}
		}
	}
}

const nextGeneration = () => {console.log('Next generation'); gameOfLife(cells);};

//check to see if there is already an interval running; if so, remove it. Otherwise, start one
const runAutomatically = () => {
	if (autoId !== undefined) {
		console.log('Stopping interval');
		clearInterval(autoId);
		autoId = undefined;

		//reenable the ability to move forward by one generation
		advance.addEventListener('click', nextGeneration);

		//style the button
		automatic.innerHTML = 'Start';
	} else {
		console.log('Starting interval');
		autoId = setInterval(nextGeneration, 250);
		//reenable the ability to move forward by one generation
		advance.removeEventListener('click', nextGeneration);


		//style the button
		automatic.innerHTML = 'Stop';
	}
};

/*
VARIABLES
*/

let cells = []; //container to hold all of the cells
let autoId; //holds the ID for the interval timer when the game is run automatically

window.onload = () => {
	let generate = document.getElementById('generate');
	let container = document.getElementsByClassName('container')[0]; //container for all of the cells
	let advance = document.getElementById('advance'); //button to advance the game one step
	let automatic = document.getElementById('automatic'); //begin to automatically generate generations
	let reset = document.getElementById('reset');
	let sizeInput = document.getElementById('size'); // input field for the size

	console.log(container);
	generate.addEventListener('click', () => {

		//get the size
		let size = Number(document.getElementById('size').value);
		if (Number.isNaN(size) || size <= 0) {
			return;
		}

		//Set the background colour
		container.style.backgroundColor = 'black';

		//clear the existing contents, both from the div and from the array containing them
		while (container.children.length != 0) {
			container.firstChild.remove();
		}
		cells = [];

		//build the grid by appending divs

		console.log(`size: ${size}`);
		for (let row = 0; row < size; row++) {
			let currentRow = [];
			for (let col = 0; col < size; col++) {
				let div = document.createElement('div');	
				div.className = 'dead';
				div.addEventListener('click', changeColours);
				currentRow.push(div);
				container.appendChild(div);
				console.log(`Appending Child`);
			}
			cells.push(currentRow);
		}
		console.log(`cells: `, cells);
		let gridSize = '1fr '.repeat(size);
		console.log(`gridSize: ${gridSize}`);
		container.style.gridTemplateColumns = gridSize;
		container.style.gridTemplateRows = gridSize;
	});

	advance.addEventListener('click', nextGeneration); 

	automatic.addEventListener('click', runAutomatically);

	reset.addEventListener('click', () => {
		for (let row of cells) {
			for (let elem of row) {
				elem.className = 'dead';
			}
		}
	});

	// if they hit enter, the box will be generated
	size.addEventListener('keyup', (e) => {
		if (e.keyCode == 13) {
			generate.dispatchEvent(new Event('click'));
		}
	});
};
