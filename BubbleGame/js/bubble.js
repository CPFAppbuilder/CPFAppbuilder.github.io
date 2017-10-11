setup();

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;

var colorGet = [];

//取得觸碰到的x,y軸座標
window.addEventListener('touchstart', function(event){
	var touchobj = event.targetTouches[0];
	mouse.x = parseInt(touchobj.clientX);
	mouse.y = parseInt(touchobj.clientY);
}, false);

//未觸碰螢幕時將之前觸碰到的值歸零
window.addEventListener('touchend', function(event){
	mouse.x = undefined;
	mouse.y = undefined;
	colorCheckFun(colorGet);
}, false);

//螢幕轉向時球要配合螢幕寬跟高填滿
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

//球的基本設定
function Circle(x, y, dx, dy, radius, id){
	//設定
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	this.range = 15;
	this.id = id;

	//填滿顏色
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "rgb(" + this.color + ")";
		c.fill();
	}

	this.update = function(){
		//移動到x軸底時改變位移量
		if(this.x+this.radius>innerWidth || this.x-this.radius<0){
			this.dx = -this.dx;
		}

		//移動到y軸底時改變位移量
		if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy = -this.dy;
		}

		//下一次要移動到的位置
		this.x += this.dx;
		this.y += this.dy;

		//判斷哪顆球友碰到
		if(mouse.x-this.x<this.range && mouse.x-this.x>-this.range && mouse.y-this.y<this.range && mouse.y-this.y>-this.range){
			if(this.radius<maxRadius){
				this.radius += 8;

				if(colorGet.indexOf(this.id)==-1){
					colorGet.push(this.id);

					//LED燈顏色設定
					if(cpf) cpf.setChainableLed("0," + this.color + ";");
				}

			}				
		}else if(this.radius>this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}

	this.check = function(){
		colorCheckFun(colorGet);
	}
}

//比對是否相同顏色
function colorCheckFun(getArray) {

	var colorCheck = [0,0,0,0,0,0];

	for(var i=0; i<getArray.length; i++){
		for(var j=0; j<colorArray.length; j++){

			if((circleArray[getArray[i]].color==colorArray[j])&&(colorCheck[j]!=0)){
				setTimeout(function(){
					alert('game over');
					location.reload();
				}, 500);
			}else if(circleArray[getArray[i]].color==colorArray[j]){
				colorCheck[j]++;
			}

		}

		var count = 0;
		for(var j=0; j<colorCheck.length; j++){
			if(colorCheck[j]==1) count++;
		}

		if(count==colorCheck.length){
			setTimeout(function(){
				alert("You Win. \nTry Level 2.");
				window.location = 'level2.html';
			}, 500);
		}

	}

}

var circleArray = [];

//預設產生30顆球
function init() {
	circleArray=[];

	for(var i = 0; i<30; i++){
		var radius = Math.random() * 10 + 10;
		var x = Math.random() * (window.innerWidth - radius*2) + radius;
		var y = Math.random() * (window.innerHeight -  radius*2) + radius;
		var dx = (Math.random() - 0.5) * 3;
		var dy = (Math.random() - 0.5) * 3;
		circleArray.push(new Circle(x, y, dx, dy, radius, i));
	}

}

//讓球移動
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i<circleArray.length; i++){
		circleArray[i].update();
	}
}

init();
animate();

//cpf設定
function setup(){
	if(cpf) var ret = cpf.setPinMode('["resetPin"],["grove_newChainableLED", 7, 8, 1]'); 
	//document.getElementById("demo").innerHTML += ret + "<br>";
}