// (() => {
	let TWO_PI = 2 * Math.PI;
	function validateNumber(number, variableName, positive = false) {
		let errorMessage = variableName + ' should be a ' + (positive ? 'positive' : '') + ' number';
		number = Number(number);
		if(!isNaN(number)) {
			if(positive && number < 0) {
				throw RangeError(errorMessage);
			}
			return number;
		} else {
			throw TypeError(errorMessage);
		}
	}
	let pcc = new PrivateClassCreator('PoissonDiscSampler', `function(r, k, width, height) {
		console.log(this);
		this.r = r;
		this.k = k;
		this.width = width;
		this.height = height;
		this.#clearGrid();
	}`);
	pcc.addProperty('r', 1, true, true, `() => this.#r`, `r => {this.#r = validateNumber(r, 'r');this.#sqrt2_r = Math.SQRT2 / this.#r;}`);
	pcc.addProperty('k', 1, true, true, `() => this.#k`, `k => this.#k = validateNumber(k, 'k')`);
	pcc.addProperty('sqrt2_r', Math.SQRT2, false, false);
	pcc.addProperty('width', 1, true, true, `() => this.#width`, `w => this.#width = validateNumber(w, 'width')`);
	pcc.addProperty('height', 1, true, true, `() => this.#height`, `h => this.#height = validateNumber(h, 'height')`);
	pcc.addProperty('grid', [], true, false, `() => this.#grid`);
	pcc.addProperty('activeList', [], true, false, `() => this.#activeList`);
	pcc.addProperty('points', [], true, false, `() => this.#points`);
	pcc.addMethod('sample', `function(initialPoint = {x: Math.random() * this.#width, y: Math.random() * this.#height}) {
		this.#clear();
		this.#addPoint(initialPoint);
		while(this.#activeList.length > 0) {
			this.#sampleStep();
		}
		return this.#points;
	}`, true, false);
	pcc.addMethod('sampleStep', `function() {
		if(this.#activeList.length == 0) {
			return;
		}
		let index = Math.floor(Math.random() * this.#activeList.length);
		let point = this.#activeList[index];
		let found = false;
		let newPoints = [];
		loop: for(let n = 0;n < this.#k;n++) {
			let angle = Math.random() * TWO_PI;
			let length = (1 + Math.random()) * this.#r;
			let newPoint = {
				x: length * Math.cos(angle) + point.x,
				y: length * Math.sin(angle) + point.y
			}
			if(newPoint.x < 0 || newPoint.x > this.#width || newPoint.y < 0 || newPoint.y > this.#height) {
				continue loop;
			}
			let indexNewPoint = {i: Math.floor(newPoint.x * this.#sqrt2_r), j: Math.floor(newPoint.y * this.#sqrt2_r)};
			for(let di = -2;di <= 2;di++) {
				let i = di + indexNewPoint.i;
				if(i >= 0 && i < this.#grid.length) {
					for(let dj = -2;dj <= 2;dj++) {
						let j = dj + indexNewPoint.j;
						if(j >= 0 && j < this.#grid[0].length) {
							let comparationPoint = this.#grid[i][j];
							let dx = comparationPoint.x - newPoint.x;
							let dy = comparationPoint.y - newPoint.y;
							if(Math.random() < 1 / 100000) {
								console.log({dx, dy}, this.#r, comparationPoint, newPoint, dx * dx + dy * dy < this.#r * this.#r);
							}
							if(dx * dx + dy * dy < this.#r * this.#r) {
								continue loop;
							}
						}
					}
				}
			}
			this.#addPoint(newPoint, indexNewPoint.i, indexNewPoint.j);
			newPoints.push(newPoint);
			found = true;
		}
		if(!found) {
			this.#activeList.splice(index, 1);
		}
		return newPoints;
	}`, true, false);
	pcc.addMethod('clear', `function() {
		this.#activeList = [];
		this.#clearGrid();
		this.#points = [];
	}`, true, false);
	pcc.addMethod('clearGrid', `function() {
		this.#grid = [];
		for(let i = 0;i < this.#sqrt2_r * this.#width;i++) {
			this.#grid.push([]);
			for(let j = 0;j < this.#sqrt2_r * this.#height;j++) {
				this.#grid[i].push(-1);
			}
		}
	}`, false, false);
	pcc.addMethod('addPoint', `function(newPoint = {x: Math.random() * this.#width, y: Math.random() * this.#height}, i = NaN, j = NaN) {
		newPoint.x = validateNumber(newPoint != null ? newPoint.x : NaN, 'newPoint.x should be a number');
		newPoint.y = validateNumber(newPoint != null ? newPoint.y : NaN, 'newPoint.y should be a number');
		i = !isNaN(i) ? i : Math.floor(newPoint.x * this.#sqrt2_r);
		j = !isNaN(j) ? j : Math.floor(newPoint.y * this.#sqrt2_r);
		i = validateNumber(i, 'i should be a number');
		j = validateNumber(j, 'j should be a number');
		this.#activeList.push(newPoint);
		this.#grid[i][j] = newPoint;
		this.#points.push(newPoint);
	}`, true, false);
	pcc.createClass();
// });