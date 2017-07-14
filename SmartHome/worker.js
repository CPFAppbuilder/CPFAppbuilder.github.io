onmessage = function(e) {
	
	//setup();
	function setup(){
		if(cpf)
			var ret = cpf.setPinMode('["resetPin"],["setPinMode", "analog", 0, "INPUT"],["setPinMode", "analog", 1, "INPUT"],["setPinMode", "analog", 2, "INPUT"],["setPinMode", "analog", 3, "INPUT"],["setPinMode", "digital", 2,"OUTPUT"],["setPinMode", "digital", 3,"PWM"],["setPinMode", "digital", 7,"INPUT"]');
		
	}
	
	postMessage(e.data);
}