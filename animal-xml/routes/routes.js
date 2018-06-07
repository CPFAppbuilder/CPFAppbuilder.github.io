var faker = require("faker");
var getJSON = require('get-json')



var appRouter = function (app) {
	app.get("/", function (req, res) {
		res.status(200).send({ message: 'Welcome to our restful API' });
	});

	app.get("/animals/:num", function (req, res) {
		// var kind = req.params.kind;
		var num = req.params.num;
 		var uri = encodeURI('http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx?$top='+num);

 		getJSON(uri ,function(error, response){
 			if (isFinite(num) && num  > 0 ) {
	   			res.status(200).send(response);

	   		} else {
	   			res.status(400).send({ message: 'invalid number supplied' });
	   		}
   		});
	});

	app.get("/users/:num", function (req, res) {
 		var num = req.params.num;
 		var uri = encodeURI('http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx?$top=10&$filter=animal_kind+like+狗+and+animal_colour+like+灰白色');

 		getJSON(uri ,function(error, response){
 			if (isFinite(num) && num  > 0 ) {
	   			res.status(200).send(response);

	   		} else {
	   			res.status(400).send({ message: 'invalid number supplied' });
	   		}
   		});

	});
}

module.exports = appRouter;