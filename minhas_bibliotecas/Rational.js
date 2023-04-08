function isRational(x) {
	return x != null && typeof x == 'object' && x.constructor.name == 'Rational';
}
class Rational {
	#num = 0n;
	#den = 1n;
	static precision = 10;
	constructor(num, den) {
		this.set(num, den, true);
	}
	set(num, den) {
		let isConstructor = arguments[2];
		if(arguments.length < 1) {
			throw Error('constructor should have at least one parameter');
		}
		if(arguments.length > 2 && !isConstructor) {
			console.warn(' constructor have unnecessary parameters, only two are needed');
		}
		if(num == null) {
			num = 0;
		}
		if(den == null) {
			den = 1;
		}
		let num_is_integer;
		let den_is_integer;
		if(typeof num == 'bigint') {
			num_is_integer = num % 1n == 0;
		} else {
			num_is_integer = num % 1 == 0n;
		}
		if(typeof den == 'bigint') {
			den_is_integer = den % 1n == 0;
		} else {
			den_is_integer = den % 1 == 0n;
		}
		if(num_is_integer) {
			num = BigInt(num);
		}
		if(den_is_integer) {
			den = BigInt(den);
		}
		if(!(num_is_integer && den_is_integer)) {
			if(Number(den) != den) {
				den = 1;
			}
			function amount_of_digits(x) {                        /////////////////////              mudei para usar replce ao inves de % 1 para melhorar precisao (estava dando resultados maiores que o esperado)
				let x_str;
				if(typeof x == 'bigint') {
					let x_str = x + '';
				} else {
					let x_str = (x + '').replace(/\d*./, '');
				}
				let x_arr = x_str.split('');
				let index = x_str.search(/e-/);
				if(index != -1) {
					return x_arr.slice(0, index).join('').replace(/\d*\.?/, '').length + parseInt(x_arr.slice(index + 2).join(''));
				}
				return x_str.replace(/\d*\./, '').length;
			}
			let multiplier = 1 + '0'.repeat(Math.max(amount_of_digits(num), amount_of_digits(den)));
			if(typeof num == 'bigint') {
				num *= BigInt(multiplier)
			} else if(/e-/.test(num + '')) {
				let num_2 = parseFloat((num + '').replace(/e-\d+/, ''));
				num = BigInt(num_2 * (1 + '0'.repeat(amount_of_digits(num_2))));
			} else {
				num *= multiplier;
			}
			if(typeof den == 'bigint') {
				den *= BigInt(multiplier)
			} else if(/e-/.test(den + '')) {
				let den_2 = parseFloat((den + '').replace(/e-\d+/, ''));
				den = BigInt(den_2 * (1 + '0'.repeat(amount_of_digits(den_2))));
			} else {
				den *= multiplier;
			}
		}
		if(typeof num == 'bigint' || Number(num) == num) {
			this.#num = BigInt(num);
		}
		if((typeof den == 'bigint' || Number(den) == den) && den != 0) {
			this.#den = BigInt(den);
		}
		let a = this.#den;
		let b = this.#num;
		while(b != 0n) {
			let b_temp = b;
			b = a % b;
			a = b_temp;
		}
		this.#num /= a;
		this.#den /= a;
		if(!isConstructor) {
			return this.copy();
		}
	}
	add(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return new Rational(this.#num * number.den + number.num * this.#den, this.#den * number.den);
	}
	sub(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return new Rational(this.#num * number.den - number.num * this.#den, this.#den * number.den);
	}
	mult(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return new Rational(this.#num * number.num, this.#den * number.den);
	}
	div(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return new Rational(this.#num * number.den, this.#den * number.num);
	}
	sign() {
		if(arguments.length > 0) {
			console.warn(' method have unnecessary parameters, no argument is needed');
		}
		let mult = this.#num * this.#den + '';
		return mult == 0n ? 0 : mult[0] == '-' ? -1 : 1;
	}
	abs() {
		if(arguments.length > 0) {
			console.warn(' method have unnecessary parameters, no argument is needed');
		}
		return new Rational((this.#num + '')[0] == '-' ? -this.#num : this.#num, (this.#den + '')[0] == '-' ? -this.#den : this.#den)
	}
	copy() {
		if(arguments.length > 0) {
			console.warn(' method have unnecessary parameters, no argument is needed');
		}
		return new Rational(this.#num, this.#den);
	}
	equals(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return this.#num == number.num && this.#den == number.den;
	}
	greaterThan(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return this.#num * number.den > number.num * this.#den;
	}
	smallerThan(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return this.#num * number.den < number.num * this.#den;
	}
	greaterOrEqualThan(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return this.#num * number.den >= number.num * this.#den;
	}
	smallerOrEqualThan(number) {
		if(!isRational(number)) {
			throw Error('parameter is not a Rational object');
		}
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, only one is needed');
		}
		return this.#num * number.den <= number.num * this.#den;
	}
	toString() {                                                              ////////////////////////////          usar goldschmidt division                 //////////////////////////////////////
		// function two_plus(x) {
		// 	let index = x.indexOf('.');
		// 	if(index == -1) {
		// 		index = x.length;
		// 	}
		// 	let y = '0'.repeat(index - 1) + '2';
		// 	let sum = '';
		// 	let remainder = 0;
		// 	for(let i = x.length - 1;i >= 0;i--) {
		// 		if(x[i] == '.') {
		// 			sum = '.' + sum;
		// 			continue;
		// 		}
		// 		let digit_sum = (Number(x[i]) || 0) + (Number(y[i]) || 0) + remainder;
		// 		remainder = Math.floor(digit_sum / 10);
		// 		digit_sum %= 10;
		// 		sum = digit_sum + sum;
		// 	}
		// 	let result = remainder + sum;
		// 	return result.slice(result.split('').findIndex(n => n != 0));
		// }
		// function greaterThan(x, y) {
		// 	let index_x = x.indexOf('.');
		// 	if(index_x == -1) {
		// 		index_x = x.length;
		// 	}
		// 	let index_y = y.indexOf('.');
		// 	if(index_y == -1) {
		// 		index_y = y.length;
		// 	}
		// 	if(index_x == index_y) {
		// 		for(let i = 0;i < Math.max(x.length, y.length);i++) {
		// 			if(typeof y[i] == 'undefined' && x[i] != 0 || (x[i] > y[i])) {
		// 				return true;
		// 			}
		// 			if(typeof x[i] == 'undefined' && y[i] != 0 || (y[i] > x[i])) {
		// 				return false;
		// 			}
		// 		}
		// 		return false;
		// 	} else {
		// 		return index_x - index_y > 0;
		// 	}
		// }
		// function minus_two(x) {
		// 	let index = x.indexOf('.');
		// 	if(index == -1) {
		// 		index = x.length;
		// 	}
		// 	let y = '0'.repeat(index - 1) + '2';
		// 	let x_1 = x.slice(0, index);
		// 	let x_2 = x.slice(index);
		// 	let sub = '';
		// 	let remainder = 0;
		// 	for(let i = x_1.length - 1;i >= 0;i--) {
		// 		let digit_sum = Number(x_1[i]) - Number(y[i]) + remainder;
		// 		remainder = Math.floor(digit_sum / 10);
		// 		digit_sum %= 10;
		// 		sub = digit_sum + sub;
		// 	}
		// 	return sub + x_2;
		// }
		// function two_minus(x) {
		// 	if(x[0] == '-') {
		// 		return two_plus(x);
		// 	}
		// 	if(greaterThan(x, '2')) {
		// 		return '-' + minus_two(x);
		// 	}
		// 	x = x.split('').map(n => n == '.' ? n : 9 - n);
		// 	x[x.length - 1]++;
		// 	let result = two_plus(x.join(''));
		// 	return two_plus(x.join('')).slice(1);
		// }
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, no argument is needed');
		}
		// let n = this.num + '';
		// let d = this.den + '';
		// if(n.length == d.length) {
		// 	n = '0.' + n;
		// 	d = '0.' + d;
		// } else if(n.length > d.length) {
		// 	n = n.slice(0, n.length - d.length) + '.' + n.slice(n.length - d.length);
		// 	d = '0.' + d;
		// } else {
		// 	n = '0.' + '0'.repeat(Math.max(d.length - n.length, 0)) + n.slice(n.length - d.length);
		// 	d = '0.' + d;
		// }
		// let n_prev = n;
		// console.log(n, d)
		// do {
		// 	n_prev = n;
		// 	let f = two_minus(d + ''); // tirar o + '' depois de implementar multiplicacao
		// 	n *= f;
		// 	d *= f;
		// } while(n_prev != n);
		// return n;

		function f(x) {
			
		}
	}
	log(base) {
		if(arguments.length > 1) {
			console.warn(' method have unnecessary parameters, no argument is needed');
		}
		if(isRational(base)) {                         ////////////////////////////////////////                       logaritmo                        //////////////////////////////////////////////////////////////

		} else {
			let difference = BigInt((this.#num + '').split('').length) - BigInt((this.#den + '').split('').length);
			let spaces = '';
			for(let i = 0n;i < (difference > 0n ? difference / 2n : -difference / 2n);i++) {
				spaces += ' ';
			}
			if(difference > 0) {
				console.log(`%c${this.#num}`, 'text-decoration: underline;', `\n${spaces}${this.#den}`);
			} else {
				console.log(`%c${spaces}${this.#num}${difference % 2n == 0n ? spaces : spaces + ' '}`, 'text-decoration: underline;', `\n${this.#den}`);
			}
			return this.copy();
		}
	}
	get num() {
		return this.#num;
	}
	get den() {
		return this.#den;
	}
	set num(num) {
		this.set(num, this.#den);
	}
	set den(den) {
		this.set(this.#num, den);
	}
}