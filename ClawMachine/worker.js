onmessage = function(e) {
	console.log(e.data);
	cpf.request('["braccio_movement", 30, 125, 90, 90, 90, 90, 40]');
}