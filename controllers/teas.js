const pool  = require("../db-pool");


const getTeeArten = async (req, res) => {

	try {

		// Serial - Chaining await Flow
		const teeArtenArray = await pool.query('SELECT * FROM tee_arten');
		console.log('teeArtenArray', teeArtenArray.rows);

		const teesArray = await pool.query('SELECT * FROM tee');
		console.log('teesArray', teesArray.rows);

		 res.json( { 
			teeArtenArray: teeArtenArray.rows, 
			teesArray: teesArray.rows, 
		} );

		// res.json( [teeArtenArray.rows, teesArray.rows] );

	 } catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	 }

	// res.send('Hello /teas !');
 };

 const getTeesOneArt = async (req, res) => {

 };




/* // test connect
client.query('SELECT * FROM tee', function(err, result) {
	if(err) {
	  return console.error('error running query', err);
	}
	console.log('result', result.rows);
	
	client.end();
 });
 */

 module.exports = {
	getTeeArten,
	getTeesOneArt,
 };