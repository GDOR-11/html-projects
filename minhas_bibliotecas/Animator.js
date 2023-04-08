const [Animation, AnimationManager] = (function() {
	function validateNumber(number, variableName, positive = false) {
		let errorMessage = variableName + ' should be a ' + (positive ? 'positive' : '') + ' number';
		number = Number(number);
		if(!isNaN(number)) {
			if(positive && number < 0) {
				throw TypeError(errorMessage);
			}
			return number;
		} else {
			throw TypeError(errorMessage);
		}
	}
	class Animation {
		#animationFunction = t => undefined;
		#frameId = NaN;
		#running = false;
		#lastFrameTime = NaN;
		#duration = 0;
		#t = 0;
		constructor(animationFunction, duration, autoStart = true) {
			this.#duration = duration = validateNumber(duration, 'duration', true);
			if(typeof animationFunction != 'function' || (animationFunction + '')[0] == '/') { //     typeof /regex/ == 'function'   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#regular_expressions
				throw TypeError('animationFunction should be a function');
			}
			if(Boolean(autoStart) !== autoStart) {
				throw TypeError('autoStart should be a boolean');
			}
			this.#animationFunction = () => {
				if(!this.#running) {
					return;
				}
				this.#t += (Date.now() - this.#lastFrameTime) / 1000;
				this.#lastFrameTime = Date.now();
				if(this.#t >= duration) {
					this.#stop();
					return;
				}
				animationFunction(this.#t);
				this.#frameId = requestAnimationFrame(this.#animationFunction);
			}
			if(autoStart) {
				this.#start();
			}
		}
		#start() {
			if(!this.#running) {
				this.#running = true;
				this.#lastFrameTime = Date.now();
				this.#frameId = requestAnimationFrame(this.#animationFunction);
			}
		}
		#stop() {
			this.#running = false;
			cancelAnimationFrame(this.#frameId);
		}
		get duration() {
			return this.#duration;
		}
		get running() {
			return this.#running;
		}
		get start() {
			return this.#start;
		}
		get stop() {
			return this.#stop;
		}
	}
	class AnimationManager {
		#x;
		#y;
		#width;
		#height;
		#domElement;
		#animations = [];
		#renderer = null;
		constructor(x = 0, y = 0, width = 0, height = 0, options = {}) {
			this.#domElement = document.createElement('canvas');
			this.#domElement.style.position = 'absolute';
			this.x = x;
			this.y = y;
			if(options.autoSize === true) {
				let resize = e => {
					this.width = window.innerWidth;
					this.height = window.innerHeight
				}
				resize();
				let passive = false;
				try {
					window.addEventListener('event-listener', null, Object.defineProperty({}, 'passive', {get: () => passive = {passive: true}}));
				} catch(error) {}
				window.addEventListener('resize', resize, passive);
			} else {
				this.width = width;
				this.height = height;
			}
			document.body.append(this.#domElement);
			if(options.container instanceof HTMLElement) {
				this.container = options.container;
			}
		}
		addAnimation(animation) {
			if(!animation instanceof Animation) {
				throw TypeError('animation is not an Animation object');
			}
			this.#animations.push(animation);
		}
		removeAnimation(animation) {
			animation = validateNumber(animation)
		}
		get animations() {
			return this.#animations;
		}
		get domElement() {
			return this.#domElement;
		}
		get renderer() {
			if(!this.#renderer) {
				this.#renderer = this.#domElement.getContext('2d');
			}
			return this.#renderer;
		}
		get container() {
			return this.#domElement.parentNode;
		}
		set container(container) {
			if(container instanceof HTMLElement) {
				this.#domElement.parentNode = container;
			}
		}
		get x() {
			return this.#x;
		}
		set x(x) {
			x = validateNumber(x, 'x', false);
			this.#x = x;
			this.#domElement.style.left = x + 'px';
		}
		get y() {
			return this.#y;
		}
		set y(y) {
			y = validateNumber(y, 'y', false);
			this.#y = y;
			this.#domElement.style.top = y + 'px';
		}
		get width() {
			return this.#width;
		}
		set width(width) {
			width = validateNumber(width, 'width', true);
			this.#width = width;
			this.#domElement.width = width;
		}
		get height() {
			return this.#height;
		}
		set height(height) {
			height = validateNumber(height, 'height', true);
			this.#height = height;
			this.#domElement.height = height;
		}
	}
	return [Animation, AnimationManager];
})();