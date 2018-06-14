var tmp;

Vue.component('Gallery', {
	props: ['item', 'index'],
	template: '#gallery'
})

var appGet = new Vue({
	el: '#app_get',
	data: {
		//庫存
		items: {
			'Apple': '',
			'Lemon': '',
			'Orange': '',
			'Lychee': '',
			'Grapes': ''
		}
	},
	mounted: function () {
		let header = {"X-aop-credential": userdata.aopCredentialHeader};

		var self = this;
		$.ajax({
			url: url,
			method: 'GET',
			headers: header,
			success: function (data) {
				self.items = JSON.parse(data);
				tmp = data;
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
})



setInterval(function(){ 
	aop.aopDownload();
	// console.log(tmp)
	// console.log(JSON.stringify(stock))

	if(JSON.stringify(stock)!=tmp){
		location.reload();
	}
}, 4000);