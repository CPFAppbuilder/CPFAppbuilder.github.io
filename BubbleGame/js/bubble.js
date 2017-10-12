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
window.addEventListener('touchstart', function(e){
	var touchobj = e.targetTouches[0];
	mouse.x = parseInt(touchobj.clientX);
	mouse.y = parseInt(touchobj.clientY);
}, false);

window.addEventListener('touchend', function(e){
	colorCheckFun(colorGet);
}, false);

//螢幕轉向時球移動的範圍要配合螢幕寬跟高
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
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
	this.range = 15;
	this.id = id;

	//將球填滿顏色
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "rgb(" + this.color + ")";
		c.fill();
	}

	this.update = function(){
		//球移動到x軸最邊邊時改變位移量
		if(this.x+this.radius>innerWidth || this.x-this.radius<0){
			this.dx = -this.dx;
		}

		//球移動到y軸最邊邊時改變位移量
		if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy = -this.dy;
		}

		//球下一次要移動到的位置
		this.x += this.dx;
		this.y += this.dy;

		//判斷是哪顆球被碰到
		if(mouse.x-this.x<this.range && mouse.x-this.x>-this.range && mouse.y-this.y<this.range && mouse.y-this.y>-this.range){
			if(this.radius<maxRadius){
				this.radius += 10;

				//被碰到的球的顏色
				colorGet.push(this.color);
				mouse.x = undefined;
				mouse.y = undefined;

				//LED燈顏色設定
				if(cpf){
					cpf.setChainableLed("0," + this.color + ";");
					//cps.request('["grove_setColorRGB", 0, ' + this.color + ']');
				}

			}				
		}else if(this.radius>this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}

}

//比對是否碰到相同顏色的球
function colorCheckFun(getArray) {

	var colorCheck = [0,0,0,0,0,0];

	for(var i=0; i<getArray.length; i++){
		for(var j=0; j<colorArray.length; j++){

			if((getArray[i]==colorArray[j])&&(colorCheck[j]!=0)){
				setTimeout(function(){
					alert('game over');
					location.reload();
				}, 500);
			}else if(getArray[i]==colorArray[j]){
				colorCheck[j]++;
			}

		}
	}

	var count = 0;
	for(var j=0; j<colorCheck.length; j++){
		if(colorCheck[j]==1) count++;
	}

	if(count==colorCheck.length){
		setTimeout(function(){
			alert(msg);
			window.location = site;
		}, 500);
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
}