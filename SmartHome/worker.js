onmessage = function(e) {
	
	var res = new object();
	
	switch(e.data.request) {
		case "read":
			if(cpf){
				res.tempValue = toCelsius(cpf.get("socket a1"));
				res.lightValue = cpf.get("socket a0");
				res.elecValue = cpf.get("socket a2");
				res.thief = cpf.get("socket d7");
				res.COValue = cpf.get("socket a3");
			}
			
			postMessage(res);
			break;
	}
	
}

function setup(){
		if(cpf)
			var ret = cpf.setPinMode('["resetPin"],["setPinMode", "analog", 0, "INPUT"],["setPinMode", "analog", 1, "INPUT"],["setPinMode", "analog", 2, "INPUT"],["setPinMode", "analog", 3, "INPUT"],["setPinMode", "digital", 2,"OUTPUT"],["setPinMode", "digital", 3,"PWM"],["setPinMode", "digital", 7,"INPUT"]');
		
}

// 溫度轉攝氏
function toCelsius(value) {
	var resistance = parseFloat((1023-value) * 10000 / value);
	var temperature = 1 / (Math.log(resistance / 10000) / 3975+1 / 298.15) - 273.15;
		
	return temperature.toFixed(2);
}