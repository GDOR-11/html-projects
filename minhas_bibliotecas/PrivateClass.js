deleteVariables = (pcc) => {
	delete PrivateClassCreator;
	delete deleteVariables;
	delete window[pcc];
}
PrivateClassCreator = (() => {
	function minimizeFunc(f) {
		let str = f + '';
		if(!(str[0] == 'f')) { // checking if it is already minimized (not minimized functions start with f(unction))
			return str;
		}
		let args = getFuncArgs(str);
		return `(${args}) => ` + str.slice(str.indexOf('(') + args.length + 2);
	}
	function getFuncContent(f) {
		let str = f + '';
		let amt_parentheses = 0;
		for(var i = 0;(str[i] != '{' || amt_parentheses > 0) && i < str.length;i++) {
			if(str[i] == '(') {
				amt_parentheses++;
			} else if(str[i] == ')') {
				amt_parentheses--;
			}
		}
		let result;
		if(i != str.length) {
			result = str.slice(i + 1, str.lastIndexOf('}'));
		} else {
			result = str.slice(str.indexOf('>') + 1, str.length);
		}
		return result;
	}
	function getFuncArgs(f) {
		let str = f + '';
		let idx1 = str.indexOf('(');
		let idx2 = str.indexOf('function');
		let idx3 = str.indexOf('=>');
		if(idx1 == 0 || idx2 == 0) {
			let amt_parentheses = 1;
			let args = '';
			for(let i = idx1 + 1;amt_parentheses > 0;i++) {
				if(str[i] == '(') {
					amt_parentheses++;
				} else if(str[i] == ')') {
					amt_parentheses--;
				}
				args += str[i];
			}
			return args.slice(0, args.length - 1);
		}
		return str.slice(0, idx3);
	}
	return class {
		constructor(className, constructor) {
			let str = minimizeFunc(constructor);
			let constructorArguments = getFuncArgs(str);
			// this.classInitialization = `const ${className}=class{constructor(${constructorArguments}){${getFuncContent(str)};Object.freeze(this)};`;
			this.classInitialization = `const ${className}=class{constructor(${constructorArguments}){(${str})(${constructorArguments});Object.freeze(this)};`;
			this.classContent = '';
			this.classEnding = `};Object.freeze(${className});`;
			this.script = document.createElement('script');
		}
		updateScript() {
			this.script.innerHTML = this.classInitialization + this.classContent + this.classEnding;
		}
		createClass() {
			this.updateScript();
			document.head.append(this.script);
		}
		addMethod(methodName, method, hasGetter = true, hasSetter = false, getter = `() => this.#${methodName}`, setter) {
			let str = minimizeFunc(method);
			let methodArguments = getFuncArgs(str);
			this.classContent += `#${methodName}(${methodArguments}){return(${str})(${methodArguments})};`;
			if(hasGetter) {
				getter = minimizeFunc(getter);
				this.classContent += `get ${methodName}(){return(${getter})()};`;
			}
			if(hasSetter) {
				setter = minimizeFunc(setter);
				let setterArguments = getFuncArgs(setter);
				this.classContent += `set ${methodName}(${setterArguments}){(${setter})(${setterArguments})};`;
			}
		}
		addProperty(propertyName, initialValue, hasGetter = true, hasSetter = true, getter = `() => this.#${propertyName}`, setter) {
			this.classContent += `#${propertyName}=${JSON.stringify(initialValue)};`;
			if(hasGetter) {
				getter = minimizeFunc(getter);
				this.classContent += `get ${propertyName}(){return(${getter})()};`;
			}
			if(hasSetter) {
				setter = minimizeFunc(setter);
				let setterArguments = getFuncArgs(setter);
				this.classContent += `set ${propertyName}(${setterArguments}){(${setter})(${setterArguments})};`;
			}
		}
	}
})();