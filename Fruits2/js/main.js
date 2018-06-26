var vm = new Vue({
  el : "#app",
  data : {
      fruits: ['Apple','Lemon','Orange','Lychee','Grapes','Banana','Chili','Pepper','Cauliflower'],
      mfruit: '{"items": [{"pos": [2, 78, 634, 477], "conf": 0.9493815302848816, "cls": "apple"},{"pos": [2, 78, 634, 477], "conf": 0.9493815302848817, "cls": "apple"},{"pos": [2, 78, 634, 477], "conf": 0.9493815302848817, "cls": "apple"},{"pos": [2, 78, 634, 477], "conf": 0.9493815302848817, "cls": "apple"},{"pos": [2, 78, 634, 477], "conf": 0.9493815302848817, "cls": "apple"}]}',
      mweight: '{"weight": 20}',
      kgPrise: {
        Apple: 5,
        Lemon: 6,
        Orange: 7,
        Lychee: 8,
        Grapes: 9,
        Chili: 6,
        Pepper: 6,
        Cauliflower: 7,
        Banana: 9,
        NoFruit: 0
      },
      unitPrise: {
        Apple: 9,
        Lemon: 8,
        Orange: 7,
        Lychee: 6,
        Grapes: 5,
        Chili: 5,
        Pepper: 8,
        Cauliflower: 7,
        Banana: 9,
        NoFruit: 0
      },
      stock: {
        Apple: 1000,
        Lemon: 1000,
        Orange: 1000,
        Lychee: 1000,
        Grapes: 1000,
        Chili: 1000,
        Pepper: 1000,
        Cauliflower: 1000,
        Banana: 1000,
        NoFruit: 0
      },
      fruit: 'Apple',
      count: '2',
      weight: '20',
      total: 0,
      check: false,
      msg: ""
  },
  methods: {
    checkOut: function(fruit, weight){
      this.stock[fruit] = this.stock[fruit]-weight;
      console.log(this.stock[fruit]);
      this.check = true;
    },
    backToTop: function(){
      this.check = false;
    }
  },
  computed: {
    totals: function(){
      var fruit = this.fruit;
      var count = this.count;
      var kg = this.weight;
      var kgPrice = this.kgPrise[fruit];
      var unitPrise = this.unitPrise[fruit];

      var total = {
        kgTotal : kgPrice*kg,
        unitTotal : unitPrise*count
      };

      return total;
      
    }
  }
});





function loop() {
  
  // KKK 1.判斷aop上是否有庫存，若沒有的話先給aop上的每種水果庫存初始數值，
  // 若有就下載當前庫存量並存至vm.data.stock
  // if(aop.getStore("Apple")){
  //   // 2. 讓loop每次從aop下載最新庫存
  //   for(i=0;i<vm.fruits.length;i++){
  //     vm.stock[vm.fruits[i]] = aop.getStore(vm.fruits[i]);
  //   }
  // }
  // else{
  //   for(i=0;i<vm.fruits.length;i++){
  //     aop.setStore(vm.fruits[i]], 1000);
  //   }
  //   break;
  // }
  

  //KKK 這邊把每一秒cpf.get到的string傳到vue的data裡面
  // vm.mfruit = cpf.getAiCamValue();
  // vm.mweight = cpf.getAiWeightValue();

  //find out how many pieces apple in the scale
  var temp = vm.mfruit;
  var weight = vm.mweight;
  var count = JSON.parse(temp).items.length;
  var same = 0;

  if(weight !== ""){

    var fruit = JSON.parse(temp).items[0].cls;
    for(i=1;i<count;i++){
      var fruit2 = JSON.parse(temp).items[i].cls;
      // console.log("0:"+fruit+","+i+":"+fruit2);

      if(fruit2 !== fruit){
        same += 1;
      }

    }
    
    if (same == 0) {
      fruit = fruit.charAt(0).toUpperCase() + fruit.slice(1);
      // var count = JSON.parse(temp).items.length;
      var kg = JSON.parse(weight).weight;
      
      if(fruit.localeCompare('Apple')!=0 && fruit.localeCompare('Lemon')!=0 && fruit.localeCompare('Orange')!=0 && fruit.localeCompare('Lychee')!=0 && fruit.localeCompare('Grapes')!=0 && fruit.localeCompare('Chili')!=0 && fruit.localeCompare('Pepper')!=0 && fruit.localeCompare('Cauliflower')!=0 && fruit.localeCompare('Banana')!=0)
        fruit = 'Scale';
      
      vm.fruit = fruit;
      vm.count = count;
      vm.weight = kg;
      vm.msg = "";
    }
    else{
      vm.msg = "Please put one type fruits.";
      // console.log("none");
      vm.fruit = "Scale";
      vm.count = 0;
      vm.weight = 0;

    }
    
  }
  else{
    vm.fruit = "Scale";
    vm.count = 0;
    vm.weight = 0;
    vm.msg = "";
  }
  
  
  setTimeout(loop, 1000);
  // console.log(".");
  
}

loop();

// aop.aopDownload();

// kanzo-
// for(var i=0;i<5;i++){
//       document.getElementById(aaa[i]).innerHTML = stock[aaa[i]] + ' KG';
// }
// var bindClick = function(id, func) {
//       if (typeof id == 'string') {
//             id = document.getElementById(id);
//       }
//       id.addEventListener('click', func, true);
//       id.addEventListener('touchmove', func, true);
// };
// bindClick('btn', function () {
//       stock['Lemon'] = stock['Lemon']-1;
//       cpf.getAiValue("cam.json");
//       //aop.aopUpload();
//       location.reload();
// });