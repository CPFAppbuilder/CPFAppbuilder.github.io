var count = 1;
var User = function () {

	this.login = function (loginform) {
		$("#loading").show();

		// Get login info
		let loginInput = loginform.getElementsByTagName('INPUT');
		let username = loginInput[0].value;
		let password = loginInput[1].value;
		
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
		
		// Post Start
		ajaxUser("POST", url, header, JSON.stringify(data)).then(success, error);

		function success(res) {
			localStorage.ttuserData = res;
			localStorage.ttusername = username;
			alert("Login Success");

			$("#cpfpanel_user").css('display', 'none');
			$("#cloud_chart").css('display', 'block');

			count = aop.getStart();
			console.log(count);
			setInterval(showAOP, 1500);
		}

		function error(res) {
			var err = JSON.parse(res);
			//console.log(err);
			$("#loginForm i").hide();
			$("#acError").text("Wrong account or password.");
		}
	}

	this.getStart = function() {
		let userdata = JSON.parse(localStorage.ttuserData);
		let hostname = userdata.protocolAndHostname;
		let url = hostname + "/cloud/v1/files/"+userdata.datasetId+"/cpf/user-stores/count";
		let header = {
			"X-aop-credential": userdata.aopCredentialHeader,
			"Content-Type": "application/json"
		};

		let res = ajaxSynchronous("GET", url, header);

		if(res.status==200){
			let data = JSON.parse(res.responseText);
			console.log("start" + data);

			if(data.value1 != undefined){
				return (data.value1=="NaN")?(1):(data.value1);
			}else{
				return 1;
			}
		}else{
			return 1;
		}
	}

	this.getStore = function(storeId) {
		let userdata = JSON.parse(localStorage.ttuserData);
		let hostname = userdata.protocolAndHostname;
		let url = hostname + "/cloud/v1/files/"+userdata.datasetId+"/cpf/user-stores/"+storeId;
		let header = {
			"X-aop-credential": userdata.aopCredentialHeader,
			"Content-Type": "application/json"
		};

		let res = ajaxSynchronous("GET", url, header);

		if(res.status==200){
			let data = JSON.parse(res.responseText);
			console.log("storeId: " +res.responseText);

			if(data.value1 != undefined){
				return data;
			}else{
				return false;
			}
		}else{
			return 0;
		}
	}

	function ajaxSynchronous(method, url, header) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url, false);
		for(let key in header) {
			xhr.setRequestHeader(key, header[key]);
		}
		xhr.send();

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

	function getCountryCode(){
		$.get("https://ipinfo.io", function(res) {
			return res.country;
		}, "jsonp");
	}
}

var aop = new User();

var defaultmsg = "non";
var config = {  type: 'line',
data: { 
	labels: [defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg],
	datasets: [{label: "Temperature",
	backgroundColor: window.chartColors.blue,
	borderColor: window.chartColors.blue,
	data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	fill: false}]
},
options: {
	responsive: true,
	title:{
		display:true,
		text:'Temperature Chart'
	},
	tooltips: {
		mode: 'index',
		intersect: false,
	},
	hover: {
		mode: 'nearest',
		intersect: true
	},
	scales: {
		xAxes: [{
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Time'
			}
		}],
		yAxes: [{
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Temperature (Celsius)'
			}
		}]
	}
}
};
var config2 = {  type: 'line',
data: { 
	labels: [defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg,defaultmsg],
	datasets: [{label: "Light",
	backgroundColor: window.chartColors.red,
	borderColor: window.chartColors.red,
	data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	fill: false}]
},
options: {
	responsive: true,
	title:{
		display:true,
		text:'Light Chart'
	},
	tooltips: {
		mode: 'index',
		intersect: false,
	},
	hover: {
		mode: 'nearest',
		intersect: true
	},
	scales: {
		xAxes: [{
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Time'
			}
		}],
		yAxes: [{
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Light'
			}
		}]
	}
}
};
$(document).ready(function(){
	if(localStorage.ttuserData !== undefined){
		$("#cpfpanel_user").css('display', 'none');
		$("#cloud_chart").css('display', 'block');
		$("#light_chart").css('display', 'block');
		count = aop.getStart();
		console.log(count);
		setInterval(showAOP, 1500);
	}else{
		$("#light_chart").css('display', 'none');
		$("#cloud_chart").css('display', 'none');
		$("#cpfpanel_user").css('display', 'block');
	}
});

window.onload = function() {
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myLine = new Chart(ctx, config);

	var ctx2 = document.getElementById("canvas2").getContext("2d");
	window.myLine2 = new Chart(ctx2, config2);
};

function update_cloud_Chart(temp, light, store_t){
	//addData
	//config.data.labels.push(getNowTime());
	config.data.labels.push(store_t);
	$.each(config.data.datasets, function(i, dataset) {
		dataset.data.push(temp);  //push new data
	});
	//removeData
	config.data.labels.shift(); // remove the label first
	config.data.datasets.forEach(function(dataset, datasetIndex) {
		dataset.data.shift();
	});
	
	//addData
	//config.data.labels.push(getNowTime());
	config2.data.labels.push(store_t);
	$.each(config2.data.datasets, function(i, dataset) {
		dataset.data.push(light);  //push new data
	});
	//removeData
	config2.data.labels.shift(); // remove the label first
	config2.data.datasets.forEach(function(dataset, datasetIndex) {
		dataset.data.shift();
	});


	window.myLine.update();
	window.myLine2.update();
}



function showAOP(){
	let store = aop.getStore("store"+count);
	do {
		store = aop.getStore("store"+count);
	}while (store==false);

	update_cloud_Chart(store.value1, store.value2, store.time);

	if(count==100) count=1;
	else count++;
	console.log(count);
}