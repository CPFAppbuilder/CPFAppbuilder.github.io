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

var app = new Vue({
	el: '#app',
	data: {
		fruit: 'Apple',
		price: FRUITS['Apple'],
		num: 2,
		weight: 1
	},
	methods: {
		send: function(fruit, weight){
			stock[fruit] = stock[fruit]-weight
			aop.aopUpload()
		}
	}

})
