let grupos = document.getElementsByClassName('_3m_Xw');
let nono_ano = null;
for(let grupo of grupos) {
	if(grupo.children[0].children[0].children[1].children[0].children[0].children[0].innerHTML == '9º BORA CASAR') {
		nono_ano = grupo;
		break;
	}
}
var acesso_permitido = false;
window.onmousedown = function(event) {
	if(event.clientX < 10 && event.clientY < 10) {
		acesso_permitido = !acesso_permitido;
		try {
			document.body.removeChild(background_acesso_negado);
			document.body.removeChild(texto_acesso_negado);
		} catch(error) {}
	}
}
var background_acesso_negado = document.createElement('div');
background_acesso_negado.setAttribute('style', 'background-color: rgb(255, 255, 255);position: absolute;width: 100%;height: 100%;z-index: 100;');
var texto_acesso_negado = document.createElement('p');
texto_acesso_negado.setAttribute('style', 'position: absolute;top: 50%;left: 50%;transform: translate(-50%, -150%);z-index: 101;');
texto_acesso_negado.innerHTML = 'acesso negado';
nono_ano.onmousedown = function(event) {
	if(!acesso_permitido) {
		document.body.append(background_acesso_negado);
		document.body.append(texto_acesso_negado);
	}
}