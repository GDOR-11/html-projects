const CARTESIAN = 'CARTESIAN';
const POLAR = 'POLAR';
class COORDINATE {
	static #mode = CARTESIAN
	constructor() {
		throw TypeError('COORDINATE is not a constructor');
	}
	static get MODE() {
		return COORDINATE.#mode;
	}
	static set MODE(mode) {
		if(mode !== CARTESIAN && mode !== POLAR) {
			throw Error('COORDINATE.MODE must be CARTESIAN or POLAR');
		}
		COORDINATE.#mode = mode;
	}
}
class Vector2d {
	#x = 0;
	#y = 0;
	#length = 0;
	#angle = 0;
	constructor(x, y) {
		var error;
		if(COORDINATE.MODE === CARTESIAN) {
			this.x = x;
			this.y = y;
			if(Number(this.y) !== this.y) {
				error = 'parameter 2 is not a number';
				this.y = 0;
			}
			if(Number(this.x) !== this.x) {
				error = 'parameter 1 is not a number';
				this.x = 0;
			}
		} else {
			this.length = x;
			this.angle = y;
			if(Number(this.angle) !== this.angle) {
				error = 'parameter 2 is not a number';
				this.angle = 0;
			}
			if(Number(this.length) !== this.length) {
				error = 'parameter 1 is not a number';
				this.length = 0;
			}
		}
		if(error) {
			throw Error(error);
		}
	}
	static isVector2d(vector) {
		try {
			return vector.constructor.name === 'Vector2d';
		} catch(error) {
			return false;
		}
	}
	static random() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector =  new Vector2d(1, Math.random() * 2 * Math.PI);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	add(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var v = new Vector2d(this.x + vector.x, this.y + vector.y);
		COORDINATE.MODE = coord_mode;
		return v;
	}
	addAngle(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var v = new Vector2d(this.length, this.angle + value);
		COORDINATE.MODE = coord_mode;
		return v;
	}
	addLength(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var v = new Vector2d(this.length + value, this.angle);
		COORDINATE.MODE = coord_mode;
		return v;
	}
	addScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var v = new Vector2d(this.x + value, this.y + value);
		COORDINATE.MODE = coord_mode;
		return v;
	}
	ceil() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var v = new Vector2d(Math.ceil(this.x), Math.ceil(this.y));
		COORDINATE.MODE = coord_mode;
		return v;
	}
	ceilAngle() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var v = new Vector2d(this.length, Math.ceil(this.angle));
		COORDINATE.MODE = coord_mode;
		return v;
	}
	ceilLength() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var v = new Vector2d(Math.ceil(this.length), this.angle);
		COORDINATE.MODE = coord_mode;
		return v;
	}
	clamp(min, max) {
		if(!Vector2d.isVector2d(min)) {
			throw Error('parameter 1 is not a Vector');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var v = new Vector2d(Math.ceil(this.length), this.angle);
		COORDINATE.MODE = coord_mode;
		return v;
		if(!Vector2d.isVector2d(max)) {
			throw Error('parameter 2 is not a Vector');
		}
		if(min.x < max.x && min.y < max.y) {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = CARTESIAN;
			var v = new Vector2d(Math.max(Math.min(this.x, max.x), min.x), Math.max(Math.min(this.y, max.y), min.y));
			COORDINATE.MODE = coord_mode;
			return v;
		} else {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = CARTESIAN;
			var v = new Vector2d(Math.max(Math.min(this.x, min.x), max.x), Math.max(Math.min(this.y, min.y), max.y));
			COORDINATE.MODE = coord_mode;
		}
	}
	clampAngle(min, max) {
		if(Number(min) !== min) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(max) !== max) {
			throw Error('parameter 2 is not a number');
		}
		if(min < max) {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = POLAR;
			var v = new Vector2d(this.length, Math.max(Math.min(this.angle, max), min));
			COORDINATE.MODE = coord_mode;
			return v;
		} else {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = POLAR;
			var v = new Vector2d(this.length, Math.max(Math.min(this.angle, min), max));
			COORDINATE.MODE = coord_mode;
			return v;
		}
	}
	clampLength(min, max) {
		if(Number(min) !== min) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(max) !== max) {
			throw Error('parameter 2 is not a number');
		}
		if(min < max) {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = POLAR;
			var v = new Vector2d(Math.max(Math.min(this.length, max), min), this.angle);
			COORDINATE.MODE = coord_mode;
			return v;
		} else {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = POLAR;
			var v = new Vector2d(Math.max(Math.min(this.length, min), max), this.angle);
			COORDINATE.MODE = coord_mode;
			return v;
		}
	}
	clampScalar(min, max) {
		if(Number(min) !== min) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(max) !== max) {
			throw Error('parameter 2 is not a number');
		}
		if(min < max) {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = CARTESIAN;
			var v = new Vector2d(Math.max(Math.min(this.x, max), min), Math.max(Math.min(this.y, max), min));
			COORDINATE.MODE = coord_mode;
			return v;
		} else {
			var coord_mode = COORDINATE.MODE;
			COORDINATE.MODE = CARTESIAN;
			var v = new Vector2d(Math.max(Math.min(this.x, min), max), Math.max(Math.min(this.y, min), max));
			COORDINATE.MODE = coord_mode;
			return v;
		}
	}
	clone() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x, this.y);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	copy(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		this.x = vector.x;
		this.y = vector.y;
	}
	distanceTo(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		return Math.hypot(this.x - vector.x, this.y - vector.y);
	}
	manhattanDistanceTo(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		return Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y);
	}
	distanceToSquared(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		var offsetx = (this.x - vector.x);
		var offsety = (this.y - vector.y);
		return offsetx * offsetx + offsety * offsety;
	}
	divide(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		if(vector.x === 0) {
			throw Error('x coordinate of parameter is 0');
		}
		if(vector.y === 0) {
			throw Error('y coordinate of parameter is 0');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x / vector.x, this.y / vector.y);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	divideAngle(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length, this.angle / value);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	divideLength(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length / value, this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	divideScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		if(value === 0) {
			throw Error('parameter is 0');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x / value, this.y / value);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	dot(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		return this.x * vector.x + this.y * vector.y;
	}
	cross(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		return this.x * vector.y - this.y * vector.x;
	}
	equals(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		return this.x === vector.x && this.y === vector.y;
	}
	floor() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(Math.floor(this.x), Math.floor(this.y));
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	floorAngle() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length, Math.floor(this.angle));
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	floorLength() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(Math.floor(this.length), this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	lerp(vector, ammount) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter 1 is not a Vector');
		}
		if(Number(ammount) !== ammount) {
			throw Error('parameter 2 is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x * (1 - ammount) + vector.x * ammount, this.y * (1 - ammount) + vector.y * ammount);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	lerpAngle(angle, ammount) {
		if(Number(angle) !== angle) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(ammount) !== ammount) {
			throw Error('parameter 2 is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length, this.angle * (1 - ammount) + angle * ammount);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	lerpLength(length, ammount) {
		if(Number(length) !== length) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(ammount) !== ammount) {
			throw Error('parameter 2 is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length * (1 - ammount) + length * ammount, this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	inverse() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(-this.x, -this.y);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	inverseAngle() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length, -this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	normalize() {
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(1, this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	multiply(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x * vector.x, this.y * vector.y);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	multiplyAngle(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length, this.angle * value);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	multiplyLength(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = POLAR;
		var vector = new Vector2d(this.length * value, this.angle);
		COORDINATE.MODE = coord_mode;
		return vector;
		this.length *= value;
	}
	multiplyScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		var coord_mode = COORDINATE.MODE;
		COORDINATE.MODE = CARTESIAN;
		var vector = new Vector2d(this.x * value, this.y * value);
		COORDINATE.MODE = coord_mode;
		return vector;
	}
	rotateAround(center, angle) {
		if(!Vector2d.isVector2d(center)) {
			throw Error('parameter 1 is not a Vector');
		}
		if(Number(angle) !== angle) {
			throw Error('parameter 2 is not a number');
		}
		var vector = this.clone();
		vector.x -= center.x;
		vector.y -= center.y;
		vector.angle += angle;
		vector.x += center.x;
		vector.y += center.y;
		return vector; ////////////////////////////////////////////////////////////////////// estava aqui //////////////////////////////////////////////////////////////////////////////////////////
	}
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}
	roundToZero() {
		if(this.x < 0) {
			this.x = Math.ceil(this.x);
		}
		if(this.x > 0) {
			this.x = Math.floor(this.x);
		}
		if(this.y < 0) {
			this.y = Math.ceil(this.x);
		}
		if(this.y > 0) {
			this.y = Math.floor(this.x);
		}
	}
	roundAwayFromZero() {
		if(this.x < 0) {
			this.x = Math.floor(this.x);
		}
		if(this.x > 0) {
			this.x = Math.ceil(this.x);
		}
		if(this.y < 0) {
			this.y = Math.floor(this.x);
		}
		if(this.y > 0) {
			this.y = Math.ceil(this.x);
		}
	}
	roundAngle() {
		this.angle = Math.round(this.angle);
	}
	roundAngleToZero() {
		if(this.angle < 0) {
			this.angle = Math.ceil(this.angle);
		}
		if(this.angle > 0) {
			this.angle = Math.floor(this.angle);
		}
	}
	roundAngleAwayFromZero() {
		if(this.angle < 0) {
			this.angle = Math.floor(this.angle);
		}
		if(this.angle > 0) {
			this.angle = Math.ceil(this.angle);
		}
	}
	roundLength() {
		this.length = Math.round(this.length);
	}
	roundLengthToZero() {
		if(this.length < 0) {
			this.length = Math.ceil(this.length);
		}
		if(this.length > 0) {
			this.length = Math.floor(this.length);
		}
	}
	roundLengthAwayFromZero() {
		if(this.length < 0) {
			this.length = Math.floor(this.length);
		}
		if(this.length > 0) {
			this.length = Math.ceil(this.length);
		}
	}
	set(x, y) {
		if(Number(x) !== x) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(y) !== y) {
			throw Error('parameter 2 is not a number');
		}
		this.x = x;
		this.y = y;
	}
	setScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		this.x = value;
		this.y = value;
	}
	setPolar(r, theta) {
		if(Number(r) !== r) {
			throw Error('parameter 1 is not a number');
		}
		if(Number(theta) !== theta) {
			throw Error('parameter 2 is not a number');
		}
		this.length = r;
		this.angle = theta;
	}
	setPolarScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter 1 is not a number');
		}
		this.length = value;
		this.angle = value;
	}
	sub(vector) {
		if(!Vector2d.isVector2d(vector)) {
			throw Error('parameter is not a Vector');
		}
		this.x -= vector.x;
		this.y -= vector.y;
	}
	subAngle(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		this.angle -= value;
	}
	subLength(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		this.length -= value;
	}
	subScalar(value) {
		if(Number(value) !== value) {
			throw Error('parameter is not a number');
		}
		this.x -= value;
		this.y -= value;
	}
	get angle() {
		return this.#angle;
	}
	set angle(angle) {
		this.#angle = angle % (2 * Math.PI);
		this.#x = this.length * Math.cos(this.angle);
		this.#y = this.length * Math.sin(this.angle);
	}
	get length() {
		return this.#length;
	}
	set length(length) {
		this.#length = length;
		this.#x = this.length * Math.cos(this.angle);
		this.#y = this.length * Math.sin(this.angle);
	}
	get x() {
		return this.#x;
	}
	set x(x) {
		this.#x = x;
		this.#length = Math.hypot(this.x, this.y);
		this.#angle = this.length === 0 ? undefined : this.y >= 0 ? Math.acos(this.x / this.length) : 3 * Math.PI / 2 + Math.asin(this.x / this.length);
	}
	get y() {
		return this.#y;
	}
	set y(y) {
		this.#y = y;
		this.#length = Math.hypot(this.x, this.y);
		this.#angle = this.length === 0 ? undefined : this.y >= 0 ? Math.acos(this.x / this.length) : 3 * Math.PI / 2 + Math.asin(this.x / this.length);
	}
}