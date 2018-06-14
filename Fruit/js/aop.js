var userdata = JSON.parse(localStorage.userData);
var hostname = userdata.protocolAndHostname;
var url = hostname + "/cloud/v1/files/"+userdata.datasetId+"/arduinoblockly/my-idea/cloudfile0.html";

var stock;

var AOP = function () {	
	this.aopUpload = function(id=0) {
		let data = JSON.stringify(stock);
		let header = {"X-aop-credential": userdata.aopCredentialHeader};

		ajaxUser("PUT", url, header, data).then(
			function success(resf) {
			}, function error(resf) {
				console.log('uploadFile Error: '+resf);
			});
		
	}
	
	this.aopDownload = function(id=0) {
		let header = { "X-aop-credential": userdata.aopCredentialHeader };
		
		let res = ajaxSynchronous("GET", url, header);

		if(res.status==200){
			stock = JSON.parse(res.responseText);
		}else{
			console.log('AOP download error.');
		}		
	}

	function ajaxSynchronous(method, url, header, data) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url, false);
		for(let key in header) {
			xhr.setRequestHeader(key, header[key]);
		}
		xhr.send(data);

		return xhr;
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

 var aop = new AOP();
