const pool  = require("../db-pool");


const getTeeArten = async (req, res) => {

	try {

		// Serial - Chaining await Flow
		const teeArtenArray = await pool.query('SELECT * FROM tee_arten');
		//console.log('teeArtenArray', teeArtenArray.rows);

		const teesArray = await pool.query('SELECT * FROM tee');
		//console.log('teesArray', teesArray.rows);

		const anbaugebieteArray = await pool.query('SELECT * FROM anbaugebiete');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		const anbaugebiete_id =  2;
		const teesInAnbaugebietArray = await pool.query(`
		SELECT tee.id, tee.name, tee.beschreibung, tee.zubereitung 
			FROM tee 
			JOIN join_tee_anbaugebiete ON tee.id = join_tee_anbaugebiete.tee_id 
			JOIN anbaugebiete ON anbaugebiete.id = join_tee_anbaugebiete.anbaugebiet_id 
			WHERE anbaugebiete.id = $1`, [anbaugebiete_id] );
		console.log('teesInAnbaugebietArray', teesInAnbaugebietArray.rows);

			

// https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/
		
	const tee_id =  2;
	const teeAllDeteils = await pool.query(`
	SELECT 
		 
		tee.id AS teeid, 
		anbaugebiete.id AS anbaugebieteid,
		benefits.id AS benefitsid,
		nebenwirkungen.id AS nebenwirkungenid,
		aromen.id AS aromenid,

		tee.name AS teename, 
		anbaugebiete.name AS anbaugebietename,
		benefits.name AS benefitsname,
		nebenwirkungen.name AS nebenwirkungenname,
		aromen.name AS aromenname

		FROM tee

		  JOIN join_tee_anbaugebiete ON join_tee_anbaugebiete.tee_id = tee.id 
		  JOIN anbaugebiete ON anbaugebiete.id = join_tee_anbaugebiete.anbaugebiet_id 

		  JOIN join_tee_benefits ON tee.id = join_tee_benefits.tee_id 
		  JOIN benefits ON benefits.id = join_tee_benefits.benefit_id 

		  JOIN join_tee_nebenwirkungen ON tee.id = join_tee_nebenwirkungen.tee_id 
		  JOIN nebenwirkungen ON nebenwirkungen.id = join_tee_nebenwirkungen.nebenwirkung_id 

		  JOIN join_tee_aromen ON tee.id = join_tee_aromen.tee_id 
		  JOIN aromen ON aromen.id = join_tee_aromen.aroma_id 


		WHERE tee.id = $1`, [tee_id] );

		console.log('teeAllDeteils', teeAllDeteils.rows);




/* 		
		const arr = [{key1: 'value1'}, {key2: 'value2'}, {key1: 'value3', key2: 'value4'}];
		const result = arr.reduce((acc, curr) => {
		  Object.keys(curr).forEach(key => {
			 acc[key] = acc[key] || [];
			 acc[key].push(curr[key]);
		  });
		  return acc;
		}, {});
		console.log(result);
		{
			key1: ['value1', 'value3'],
			key2: ['value2', 'value4']
		}
 */
		
		const resultTee = teeAllDeteils.rows.reduce((acc, curr) => {
		  Object.keys(curr).forEach(key => {
			 acc[key] = acc[key] || [];
			 acc[key].push(curr[key]);
		  });
		  return acc;
		}, {});

		for (let key in resultTee) {
			resultTee[key] = resultTee[key].filter((item, index, arr) => {
			  return arr.indexOf(item) === index;
			});
		 }

		console.log(resultTee);


		res.json( { 
			teeAllDeteils: resultTee,
			teeArtenArray: teeArtenArray.rows, 
			teesArray: teesArray.rows,
			anbaugebieteArray: anbaugebieteArray.rows,
			teesInAnbaugebietArray: teesInAnbaugebietArray.rows,
		} );

		// res.json( [teeArtenArray.rows, teesArray.rows] );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

		// res.send('Hello /teeapi !');
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