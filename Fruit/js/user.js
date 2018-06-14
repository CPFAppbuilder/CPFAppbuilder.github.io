const USER = function () {
	
	this.login = function () {
		// Get login info
		let username = 'cccccccc';
		let password = 'cccccccc';

		// Setting url & header & Post data
		let url = "https://api.cloud.acer.com/cloud/v2/aopSessions";
		let header = {
			"X-aop-username": username,
			"X-aop-partnerId": "cpf",
			"X-aop-password": password,
			"Content-Type": "text/plain;charset=UTF-8"
		};
		let data = {
			"deviceHardwareInfo": "AA:BB:CC:DD:EE:FF",
			"deviceName": "Browser-WebCPF",
			"deviceClass": "PC",
			"appId": "1688879925038593"
		};

		ajaxUser("POST", url, header, JSON.stringify(data)).then(success, error);	

		function success(res) {
			localStorage.userData = res;
			localStorage.username = username;			
		}

		function error(res) {
			alert('Login Fail');
		}
	}

	function ajaxUser(method, url, header, data) {
		var promiseObj = new Promise((resolve, reject) => {

			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			for(let key in header) {
				xhr.setRequestHeader(key, header[key]);
			}
			xhr.send(data);

			xhr.onreadystatechange = function() {
				if(this.readyState === 4){
					// login & register response status: 201
					if((this.status === 200) || (this.status === 201)) {
						resolve(this.responseText);
					}else {
						reject(this.responseText);
					}
				}
			}
		});
		return promiseObj;
	}

}

var user = new USER();
user.login();