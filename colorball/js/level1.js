var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;

var colorArray = [
'#FF3105',
'#FFB142',
'#009AFF',
'#31B400',
'#E625E8',
'#29CDFF'
];

var colorGet = [];

window.addEventListener('touchstart', function(event){
	var touchobj = event.targetTouches[0];
	mouse.x = parseInt(touchobj.clientX);
	mouse.y = parseInt(touchobj.clientY);

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
	this.range = 15;
	this.id = id;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
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
					document.getElementById("s_bubble").play();
					colorGet.push(this.id);
					console.log(colorGet);
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


function colorCheckFun(getArray) {

	var colorCheck = [0,0,0,0,0,0];

	for(var i=0; i<getArray.length; i++){
		for(var j=0; j<colorArray.length; j++){

			if((circleArray[getArray[i]].color==colorArray[j])&&(colorCheck[j]!=0)){
				setTimeout(function(){
					document.getElementById("s_lose").play();
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
				document.getElementById("s_win").play();
				alert("You Win. \nTry Level 2.");
				window.location = 'level2.html';
			}, 500);
		};



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

	
	setup();
	
	// RGB
	function changeColor() {
		var Rled = document.getElementById("rled").value;
		var Gled = document.getElementById("gled").value;
		var Bled = document.getElementById("bled").value;
		
		document.getElementById("redvalue").innerHTML = Rled;
		document.getElementById("greenvalue").innerHTML = Gled;
		document.getElementById("bluevalue").innerHTML = Bled;
		
		document.getElementById("showcolor").style.backgroundColor = 'rgb(' + Rled + ',' + Gled + ',' + Bled + ')';
		
		if(cpf){
			cpf.setChainableLed("0," + Rled + "," + Gled + "," + Bled + ";");
		}
		
	}
	
	// cpf setup
	function setup(){
		if(cpf)
			var ret = cpf.setPinMode('["resetPin"],["grove_newChainableLED", 7, 8, 1]'); 
			//document.getElementById("demo").innerHTML += ret + "<br>";
	}