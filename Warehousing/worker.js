onmessage = function (e) {
	cpf_fun(e.data);
	start(true);
}

// CPF功能
	function cpf_fun(item) {
	
		var x;
		var data;
		
		switch(item) {
			case 'cpf':
				cpf_clear();
				// 12
				cpf.set("d3", 255);
				cpf.set("d6", 255);
				data = {"item_speed": 0.04, "belt_speed": 0.08};
				postMessage(data);
				break;
			case 'nb':
				x = Math.floor(Math.random() * 3);
				cpf_clear();
				if(x == 0) {
					// 6
					cpf.set("d3", 255);
					cpf.set("d4", 1);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);
				} else if(x == 1) {
					// 9
					cpf.set("d2", 1);
					cpf.set("d5", 255);
					data = {"item_speed": 0.06, "belt_speed": 0.1};
					postMessage(data);	
				} else {
					// 24
					cpf.set("d4", 1);
					cpf.set("d9", 255);
					data = {"item_speed": 0.04, "belt_speed": 0.08};
					postMessage(data);
				}
				break;
			case 'lcd':
				x = Math.floor(Math.random() * 3);
				cpf_clear();
				if(x == 0) {
					// 1
					cpf.set("d2", 1);
					data = {"item_speed": 0.1, "belt_speed": 0.15};
					postMessage(data);
				} else if (x == 1) {
					// 4
					cpf.set("d4", 1);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);
				} else {
					// 21
					cpf.set("d2", 1);
					cpf.set("d9", 255);
					data = {"item_speed": 0.06, "belt_speed": 0.1};
					postMessage(data);
				}
				break;
			case 'pc':
				x = Math.floor(Math.random() * 2);
				cpf_clear();
				if(x == 0) {
					// 7
					cpf.set("d2", 1);
					cpf.set("d3", 255);
					cpf.set("d4", 1);
					data = {"item_speed": 0.06, "belt_speed": 0.1};
					postMessage(data);
				} else {
					// 18
					cpf.set("d5", 255);
					cpf.set("d6", 255);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);
				}
				break;
			case 'pj':
				x = Math.floor(Math.random() * 2);
				cpf_clear();
				if(x == 0) {
					// 3
					cpf.set("d2", 1);
					cpf.set("d3", 255);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);
				} else {
					// 15
					cpf.set("d2", 1);
					cpf.set("d4", 1);
					cpf.set("d6", 255);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);	
				}
				break;
			case 'abs':
				cpf_clear();
				// 10
				cpf.set("d6", 255);
				data = {"item_speed": 0.04, "belt_speed": 0.08};
				postMessage(data);
				break;
			case 'egg':
				x = Math.floor(Math.random() * 3);
				cpf_clear();
				if(x == 0) {
					// 22 (Geroge)
					cpf.set("d3", 255);
					cpf.set("d9", 255);
					data = {"item_speed": 0.04, "belt_speed": 0.08};
					postMessage(data);
				} else if(x == 1) {
					// 16 (牛)
					cpf.set("d3", 255);
					cpf.set("d4", 1);
					cpf.set("d6", 255);
					data = {"item_speed": 0.08, "belt_speed": 0.14};
					postMessage(data);
				} else {
					// 19 (Stan)
					cpf.set("d2", 1);
					cpf.set("d5", 255);
					cpf.set("d6", 255);
					data = {"item_speed": 0.06, "belt_speed": 0.1};
					postMessage(data);
				}
				break;
			default:
				// 12
				cpf.set("d3", 255);
				cpf.set("d6", 255);
				data = {"item_speed": 0.04, "belt_speed": 0.08};
				postMessage(data);
				break;
		}
	}

function cpf_clear() {
	cpf.set("d2", 0);
	cpf.set("d3", 0);
	cpf.set("d4", 0);
	cpf.set("d5", 0);
	cpf.set("d6", 0);
	cpf.set("d9", 0);
}

function start(flag) {
	if(flag) {
		cpf.set("d10", 255);
	} else {
		cpf.set("d10", 0);
	}	
	
	setTimeout(function(){
		cpf.set("d11", 255);
		cpf.set("d11", 0);
	},1000);
}