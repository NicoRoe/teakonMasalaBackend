const client = require("../db-client");


const getTeeArten = async (req, res) => {

	res.send('Hello /teas !');
 };

 const getTeesOneArt = async (req, res) => {

 };




// test connect
client.query('SELECT * FROM tee', function(err, result) {
	if(err) {
	  return console.error('error running query', err);
	}
	console.log('result', result.rows);
	
	client.end();
 });


 module.exports = {
	getTeeArten,
	getTeesOneArt,
 };