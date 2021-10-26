/* Javascrpt pare conexión y validación, trabajo título Ciisa 2021*/
var stompClient = null;
var p1 = 0;
var p2 = 0;
var sw_tiempo = 0;
var sw_lectura = 0;
function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	//stompClient.debug = () => {}; Activar en caso de necesitar mirar mensajes y estado
	stompClient.connect({}, function(frame) {
		//		console.log('Connected: ' + frame);
		stompClient.subscribe('/user/topic/greetings', function(showGreeting) {
			if (showGreeting.body) {
				var turnoJson = JSON.parse(showGreeting.body);
				sessionStorage.setItem('alertas', JSON.stringify(turnoJson.alertas));
				if (turnoJson.nombre) {
					addNombre(turnoJson.nombre);
					addTurno(turnoJson.turno);
					addLlamado(turnoJson.contadorLlamados);
					if (sw_lectura == 0) {
						addTestiamdo(turnoJson.tiempoEstimadoParaAtencion);
						addalerta(turnoJson.descripcionAlerta, turnoJson.color);
						timer_relectura();
						sw_lectura = 1;
					}
				}
				else {
					if (turnoJson.turno == "Not_URL") {
						Swal.fire({
							icon: 'warning',
							title: 'Algo salio mal',
							text: 'Tenemos problemas para obtener la información',
							footer: 'Acerquese a recepción para asegurar atención'
						});
						document.getElementById("mail").disabled = false;
						document.getElementById("send").disabled = false;

					} else {
						sinTurno(turnoJson.turno); //modificar para que quede dentro de la card
						document.getElementById("mail").disabled = false;
						document.getElementById("send").disabled = false;
					}
				}

			} //fin if (showGreeting.body)
		}) // fin stompClient.subscribe(
	}); // fin stompClient.connect({}, function(frame)
}


function sendMail() {
	if ($("#mail").val() == "") {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'El campo Mail es obligatorio!',
			footer: 'Verifique el ingreso del Mail registrado'
		});
	}//end if ($("#mail").val() == "") 

	else
		if (validar_email($("#mail").val())) {
			stompClient.send("/app/hello", {}, JSON.stringify({ 'mail': $("#mail").val() }));
			document.getElementById("mail").disabled = true;
			document.getElementById("send").disabled = true;

		}
		else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'El Mail ingresado no es correcto! ' + $("#mail").val(),
				footer: 'Verifique el ingreso del mail registrado'
			});
		}

}


$(function() {
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#connect").click(function() { connect(); });
	$("#disconnect").click(function() { disconnect(); });
	$("#send").click(function() {
		if (stompClient.connected == true) {
			sendMail()
		}
		else {
			Swal.fire({
				icon: 'warning',
				title: 'Oops...',
				text: 'Error en la conexión con el servidor',
				footer: 'Favor actualice la página o acerquese a recepción'
			});
		};
	});
});

function validar_email(email) {
	var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return regex.test(email) ? true : false;
}


function addTurno(turno) {
	// crea un nuevo div
	// y añade contenido
	var div_turno = document.getElementById("turno");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "turno");
		var sp1_content = document.createTextNode("Su turno de atención es: " + turno);
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("turno");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}

}

function addNombre(nombre) {
	document.getElementById("div1").style.visibility = "visible";
	document.getElementById("card-body").style.visibility = "visible";
	document.getElementById("card-title").style.visibility = "visible";
	document.getElementById("footer").style.visibility = "visible";
	$('#send').hide();
	$('#label_mail').hide();
	$('#mail').hide();
	var div_turno = document.getElementById("nombre");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "nombre");
		var sp1_content = document.createTextNode("Binevenido: " + nombre);
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("nombre");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}

}

function addLlamado(contadorLlamados) {
	// crea un nuevo div
	// y añade contenido
	var div_turno = document.getElementById("llamada");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "llamada");
		if (contadorLlamados > 1) {
			var sp1_content = document.createTextNode("Usted ha sido llamado(a) " + contadorLlamados + " veces");
		} else {
			var sp1_content = document.createTextNode("Usted ha sido llamado(a) " + contadorLlamados + " vez");
		}
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("llamada");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}

}

function addTestiamdo(tiempoEstimadoParaAtencion) {
	// crea un nuevo div
	// y añade contenido
	var div_turno = document.getElementById("testimado");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "testimado");
		if (tiempoEstimadoParaAtencion > 60) {
			horas = Math.trunc(tiempoEstimadoParaAtencion / 60);
		} else {
			horas = 0;
			minutos = tiempoEstimadoParaAtencion;
		}
		segundos = 59;

		if (horas > 1) {
			minutos = tiempoEstimadoParaAtencion % 60;
			var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
				horas + " Horas " + minutos + " Minutos");
		} else {
			if (horas == 1) {
				minutos = tiempoEstimadoParaAtencion % 60;
				var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
					horas + " Hora " + minutos + " Minutos");
			} else {
				var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
					tiempoEstimadoParaAtencion + " Minutos");
			}

		}
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("testimado");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}
	if (sw_tiempo == 0) {
		sessionStorage.setItem('horas', horas);
		sessionStorage.setItem('min', minutos);
		sessionStorage.setItem('seg', segundos);
		sw_tiempo = 1;
		timer_espera();
	}

}

function sinTurno(turno) {
	// crea un nuevo div
	// y añade contenido
	document.getElementById("div1").style.visibility = "visible";
	document.getElementById("card-body").style.visibility = "visible";
	document.getElementById("card-title").style.visibility = "visible";
	document.getElementById("footer").style.visibility = "visible";
	var div_turno = document.getElementById("turno");
	// cambiamos mensaje de turno
	if (div_turno) {
		var div_turno = document.getElementById("turno");
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "turno");
		sp1.style.color = "red";
		sp1.style.fontSize = '300%';
		var sp1_content = document.createTextNode(turno);
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("turno");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}
}


function addalerta(descripcionAlerta, color) {
	var div_turno = document.getElementById("alerta");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "alerta");
		sp1.style.color = color;
		var sp1_content = document.createTextNode(descripcionAlerta);
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("alerta");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
	}
}

function timer_relectura() {
	p1 = setInterval(sendMail, 25000);
}

function timer_espera() {
	p2 = setInterval(Reloj, 1000);
}

function Reloj() {
	var rhora = sessionStorage.getItem('horas');
	var rminuto = sessionStorage.getItem('min');
	var rseg = sessionStorage.getItem('seg');
	var pasoTiempo = 0;
	if (rhora.length == 1) {
		rhora = '0' + rhora;
	}
	if (rseg.length == 1) {
		rseg = '0' + rseg;
	}
	if (rminuto.length == 1) {
		rminuto = '0' + rminuto;
	}
	tiempoEspera = rhora + " : " + rminuto + " : " + rseg;
	document.getElementById('countdown').innerHTML = tiempoEspera;
	document.getElementById('tiempo').style.visibility = "visible";
	document.getElementById('countdown').style.visibility = "visible";
	rseg = rseg - 1;
	if (rseg == 0 && rminuto > 0) {
		rminuto = rminuto - 1;
		rseg = 59;
		pasoTiempo = (Number(rhora) * 60) + Number(rminuto);
		updTestiamdo(pasoTiempo);
	}
	if (rminuto == 0 && rhora > 0) {
		rhora = rhora - 1;
		rminuto = 59;
		pasoTiempo = (Number(rhora) * 60) + Number(rminuto);
		updTestiamdo(pasoTiempo);
	}
	sessionStorage.setItem('horas', rhora);
	sessionStorage.setItem('min', rminuto);
	sessionStorage.setItem('seg', rseg);
	if (rhora == 0 && rminuto == 0 && rseg == 0) {
		clearInterval(p1);
		clearInterval(p2);
		Swal.fire({
			icon: 'warning',
			title: 'Atención',
			text: 'Su tiempo de espera expiró',
			footer: 'Acerquese a atención, si ya fue atendido, omita este mensaje'
		});
	}
}

function disconnect() {
	stompClient.disconnect();
	clearInterval(p2);
	clearInterval(p1);
	Swal.fire({
		position: 'top',
		icon: 'success',
		title: 'Desconexión OK',
		text: 'hasta la próxima',
		footer: 'Si necesita reconectar, actualice la página'
	});
	$('#disconnect').hide();

}



function updTestiamdo(pasoTiempo) {
	// crea un nuevo div
	// y añade contenido
	var div_turno = document.getElementById("testimado");
	if (div_turno) {
		var sp1 = document.createElement("p");
		sp1.setAttribute("id", "testimado");
		if (pasoTiempo > 60) {
			horas = Math.trunc(pasoTiempo / 60);
		} else {
			horas = 0;
			minutos = pasoTiempo;
		}
		segundos = 59;

		if (horas > 1) {
			minutos = pasoTiempo % 60;
			var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
				horas + " Horas " + minutos + " Minutos");
		} else {
			if (horas == 1) {
				minutos = pasoTiempo % 60;
				var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
					horas + " Hora " + minutos + " Minutos");
			} else {
				var sp1_content = document.createTextNode("Su tiempo estimado de espera es de " +
					pasoTiempo + " Minutos");
			}

		}
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById("testimado");
		var parentDiv = sp2.parentNode;
		parentDiv.replaceChild(sp1, sp2);
		recorreAlertas(pasoTiempo);
	}

}


function recorreAlertas(pasoTiempo) {
	var updAlerta = JSON.parse(sessionStorage.getItem('alertas'));
	for (let i = 0; i <= updAlerta.length - 1; i++) {
		if (Number(pasoTiempo) >= Number(updAlerta[i].duracionDesde) &&
			Number(pasoTiempo) <= Number(updAlerta[i].duracionHasta)) {
			document.getElementById("alerta").style.color = updAlerta[i].colorHtml;
			document.getElementById("alerta").innerHTML = updAlerta[i].descripcion;


		}
	}


}