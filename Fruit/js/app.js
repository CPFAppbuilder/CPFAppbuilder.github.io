// 價格
var FRUITS = {
	'Apple': 100,
	'Lemon': 40,
	'Orange': 53,
	'Lychee': 135,
	'Grapes': 165
} 

Vue.component('Fruit', {
	props: ['fruit', 'price'],
	template: '#fruit'
})

Vue.component('FruitImg', {
	props: ['fruit'],
	template: '#img'
})

Vue.component('FruitTotal', {
	props: ['price', 'num', 'weight'],
	template: '#total'
})

Vue.component('Gallery', {
	props: ['item', 'index'],
	template: '#gallery'
})


var app = new Vue({
	el: '#app',
	data: {
		fruit: 'Lemon',
		price: FRUITS['Lemon'],
		num: 2,
		weight: 1
	},
	methods: {
		send: function(fruit, weight){
			// stock[fruit] = stock[fruit]-weight
			// aop.aopUpload()
			console.log('aaa')
		}
	}
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
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
})

