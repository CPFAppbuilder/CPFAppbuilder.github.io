setup();

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var preId = undefined;

var maxRadius = 40;

var colorGet = [];

window.addEventListener('touchstart', function(event){
	var touchobj = event.targetTouches[0];
	mouse.x = parseInt(touchobj.clientX);
	mouse.y = parseInt(touchobj.clientY);

	console.log(mouse.x);
}, false);

window.addEventListener('touchend', function(event){
	mouse.x = undefined;
	mouse.y = undefined;
	colorCheckFun(colorGet);
}, false);

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

function Circle(x, y, dx, dy, radius, id){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
	this.range = 10;
	this.id = id;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = "rgb(" + this.color + ")";
		c.fill();
	}

	this.update = function(){
		if(this.x+this.radius>innerWidth || this.x-this.radius<0){
			this.dx = -this.dx;
		}//touch the edge

		if(this.y+this.radius>innerHeight || this.y-this.radius<0){
			this.dy = -this.dy;
		}//touch the edge

		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if(mouse.x-this.x<this.range && mouse.x-this.x>-this.range && mouse.y-this.y<this.range && mouse.y-this.y>-this.range){
			if(this.radius<maxRadius){
				this.radius += 8;


				if(colorGet.indexOf(this.id)==-1){
					colorGet.push(this.id);

					//set LED color
					//if(cpf){
						//cpf.setChainableLed("0," + this.color + ";");
						//var ret = cpf.request('["grove_setColorRGB", 7,' + this.color + ']');
					//}

				}

			}				
		}else if(this.radius>this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}

}

//if touched rhe same color or not
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

var circleArray = [];

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

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i<circleArray.length; i++){
		circleArray[i].update();

	}

}

init();
animate();

// cpf setup
function setup(){
	//if(cpf) var ret = cpf.setPinMode('["resetPin"],["grove_newChainableLED", 7, 8, 1]'); 
	//document.getElementById("demo").innerHTML += ret + "<br>";
}