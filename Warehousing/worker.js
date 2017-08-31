onmessage = function (e) {
	cpf_fun(e.data);
	start(true);
}

// CPF功能
function cpf_fun(item) {

	var x;
	
	switch(item) {
		case 'cpf':
			x = Math.floor(Math.random() * 2);
			cpf_clear();
			// 4
			cpf.set("d4", 1);
			item_speed = 0.08;
			belt_speed = 0.14;
			break;
		case 'nb':
			x = Math.floor(Math.random() * 3);
			cpf_clear();
			if(x == 0) {
				// 6
				cpf.set("d3", 255);
				cpf.set("d4", 1);
				item_speed = 0.08;
				belt_speed = 0.14;
			} else if(x == 1) {
				// 9
				cpf.set("d2", 1);
				cpf.set("d5", 255);
				item_speed = 0.06;
				belt_speed = 0.1;	
			} else {
				// 24
				cpf.set("d4", 1);
				cpf.set("d9", 255);
				item_speed = 0.04;
				belt_speed = 0.08;
			}
			break;
		case 'lcd':
			x = Math.floor(Math.random() * 3);
			cpf_clear();
			if(x == 0) {
				// 1
				cpf.set("d2", 1);
				item_speed = 0.1;
				belt_speed = 0.15;	
			} else if (x == 1) {
				// 12
				cpf.set("d3", 255);
				cpf.set("d6", 255);
				item_speed = 0.04;
				belt_speed = 0.08;
			} else {
				// 21
				cpf.set("d2", 1);
				cpf.set("d9", 255);
				item_speed = 0.06;
				belt_speed = 0.10;	
			}
			break;
		case 'pc':
			x = Math.floor(Math.random() * 3);
			cpf_clear();
			if(x == 0) {
				// 7
				cpf.set("d2", 1);
				cpf.set("d3", 255);
				cpf.set("d4", 1);		
				item_speed = 0.06;
				belt_speed = 0.10;
			} else if(x == 1) {
				// 22
				cpf.set("d3", 255);
				cpf.set("d9", 255);
				item_speed = 0.04;
				belt_speed = 0.08;
			} else {
				// 18
				cpf.set("d5", 255);
				cpf.set("d6", 255);
				item_speed = 0.08;
				belt_speed = 0.14;
			}
			break;
		case 'pj':
			x = Math.floor(Math.random() * 2);
			cpf_clear();
			if(x == 0) {
				// 3
				cpf.set("d2", 1);
				cpf.set("d3", 255);
				item_speed = 0.08;
				belt_speed = 0.14;	
			} else {
				// 15
				cpf.set("d2", 1);
				cpf.set("d4", 1);
				cpf.set("d6", 255);
				item_speed = 0.08;
				belt_speed = 0.14;	
			}
			break;
		case 'abs':
			cpf_clear();
			// 10
			cpf.set("d6", 255);
			item_speed = 0.04;
			belt_speed = 0.08;
			break;
		case 'egg':
			x = Math.floor(Math.random() * 3);
			cpf_clear();
			if(x == 0) {
				// 13 (George)
				cpf.set("d2", 1);
				cpf.set("d3", 255);
				cpf.set("d6", 255);
				item_speed = 0.1;
				belt_speed = 0.15;	
			} else if(x == 1) {
				// 16 (牛)
				cpf.set("d3", 255);
				cpf.set("d4", 1);
				cpf.set("d6", 255);
				item_speed = 0.08;
				belt_speed = 0.14;	
			} else {
				// 19 (Stan)
				cpf.set("d2", 1);
				cpf.set("d5", 255);
				cpf.set("d6", 255);
				item_speed = 0.06;
				belt_speed = 0.10;	
			}
			break;
		default:
			// 4
			cpf.set("d4", 1);
			item_speed = 0.08;
			belt_speed = 0.14;
			break;
	}
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