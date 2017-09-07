onmessage = function(e) {
	if(e.data)
	e.data.request('["braccio_movement", 30, 125, 110, 110, 110, 110, 40]');
}