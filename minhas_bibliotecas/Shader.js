const Shader=(()=>{
	let formatNumber=(n,m)=>{
			return '0'.repeat((m+'').length-(n+'').length)+n;
		},checkWebglVersion=()=>{
			
		},compileShader=(gl,type,code)=>{
			let shader=gl.createShader(type);
			gl.shaderSource(shader,code);
			gl.compileShader(shader);
			if(gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
				return shader;
			}

			code=code.split('\n');
			for(let i=0;i<code.length;i++) {
				code[i]=formatNumber(i+1, code.length+1)+'.'+code[i];
			}
			code=code.join('\n');

			throw Error(gl.getShaderInfoLog(shader)+'\n\n\n'+code);
		},createProgram=(gl,vertexShader,fragmentShader)=>{
			vertexShader=compileShader(gl.VERTEX_SHADER,vertexShader);
			fragmentShader=compileShader(gl.FRAGMENT_SHADER,fragmentShader);

			let program = gl.createProgram();
			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);
			gl.linkProgram(program);
			if(gl.getProgramParameter(program, gl.LINK_STATUS)) {
				return program;
			}

			throw Error(gl.getProgramInfoLog(program));
		};
		return class Shader {
			constructor(canvas,vertexShader,fragmentShader) {
				this.canvas = canvas;
				this.context = canvas.getContext(webglVersion);
			}
		}
})();