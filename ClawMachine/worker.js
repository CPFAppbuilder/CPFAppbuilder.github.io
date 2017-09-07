onmessage = function(e) {
	alert('worker');
	cpf.request('["braccio_movement", 30, 125, 90, 90, 90, 90, 40]');
}
