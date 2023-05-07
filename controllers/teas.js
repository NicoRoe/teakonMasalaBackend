const pool  = require("../db-pool");



// ----- /suchkriterien
const getSuchKriterien = async (req, res) => {

	try {

		// Serial - Chaining await Flow
		const teeArtenArray = await pool.query('SELECT * FROM tee_arten');
		//console.log('teeArtenArray', teeArtenArray.rows);

		const anbaugebieteArray = await pool.query('SELECT * FROM anbaugebiete');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		const benefitsArray = await pool.query('SELECT * FROM benefits');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		const aromenArray = await pool.query('SELECT * FROM aromen');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		const attributeArray = await pool.query('SELECT * FROM attribute');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		res.json( { 
			teeArtenArray: teeArtenArray.rows, 
			anbaugebieteArray: anbaugebieteArray.rows, 
			benefitsArray: benefitsArray.rows, 
			aromenArray: aromenArray.rows, 
			attributeArray: attributeArray.rows, 
		} );

		// res.json( [teeArtenArray.rows, teesArray.rows] );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

		// res.send('Hello /teeapi !');
};



// ----- /teearten
const getTeeArten = async (req, res) => {

	const { teeart_id } = req.params;
	// console.log('params:', req.params);
	console.log('Request URL:', req.originalUrl);

	try {

		// Serial - Chaining await Flow
		const teeArtenArray = await pool.query('SELECT * FROM tee_arten');
		//console.log('teeArtenArray', teeArtenArray.rows);

		res.json( { 
			teeArtenArray: teeArtenArray.rows, 
		} );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

	// res.send('Hello /teeapi !');
 };


 // ----- /teearten/:teeart_id
 const getTeeArt = async (req, res) => {

	const { teeart_id } = req.params;
	// console.log('params:', req.params);

	try {

		const teeArtArray = await pool.query(`SELECT * FROM tee_arten		
			WHERE tee_arten.id = $1`, [teeart_id]);

		//console.log('teeArtenArray', teeArtenArray.rows);

		res.json( { teeArtObj: teeArtArray.rows[0] } );

		// res.json( [teeArtenArray.rows, teesArray.rows] );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

	// res.send('Hello /teeapi !');
 };




// ----- /anbaugebiete
const getAnbaugebiete = async (req, res, next) => {

	try {

		const anbaugebieteArray = await pool.query('SELECT * FROM anbaugebiete');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		res.json( { anbaugebieteArray: anbaugebieteArray.rows } );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};



// ----- /benefits
const getBenefits = async (req, res) => {

	try {

		const benefitsArray = await pool.query('SELECT * FROM benefits');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		res.json( { benefitsArray: benefitsArray.rows } );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};

// ----- /aromen
const getAromen = async (req, res) => {

	try {

		const aromenArray = await pool.query('SELECT * FROM aromen');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		res.json( { aromenArray: aromenArray.rows } );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};


// ----- /attribute
const getAttribute = async (req, res) => {

	try {

		const attributeArray = await pool.query('SELECT * FROM attribute');
		//console.log('anbaugebieteArray', anbaugebieteArray.rows);

		res.json( { attributeArray: attributeArray.rows } );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};




// ===== tees ============================================================


// ----- /tees


 
// var.1 - tees ohne join-deteils 
const getTeesKurz = async (req, res) => {

	try {
		const teesArray = await pool.query('SELECT * FROM tee');
		//console.log('teesArray', teesArray.rows);

		res.json( { 
			teesKurzArray: teesArray.rows,
		} );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	// res.send('Hello /teeapi !');
};


// var.2 - inklusiv join-deteils
const getTees = async (req, res) => {

	try {
		const resTeesAllData = await pool.query(`SELECT 

		tee.id AS teeid, 

		tee.tee_art_id AS teetee_art_id,
		tee_arten.name AS tee_artenname, 
		
		tee.name AS teename,
		tee.beschreibung AS teebeschreibung,
		tee.zubereitung AS teezubereitung,
		tee.image AS teeimage, 

		attribute.id AS attributeid, 
		attribute.name AS attributename,
	
		anbaugebiete.id AS anbaugebieteid,
		anbaugebiete.name AS anbaugebietename,
	
		aromen.id AS aromenid,
		aromen.name AS aromenname,
	
		benefits.id AS benefitsid,
		benefits.name AS benefitsname,
	
		nebenwirkungen.id AS nebenwirkungenid,
		nebenwirkungen.name AS nebenwirkungenname,
	
		naerhstoffe.id AS naerhstoffeid,
		naerhstoffe.name AS naerhstoffename
	
	
	FROM 
		tee

		JOIN tee_arten ON tee_arten.id = tee.tee_art_id
	
		JOIN join_tee_attribute ON tee.id = join_tee_attribute.tee_id 
		JOIN attribute ON attribute.id = join_tee_attribute.attribut_id 
	
		JOIN join_tee_anbaugebiete ON join_tee_anbaugebiete.tee_id = tee.id 
		JOIN anbaugebiete ON anbaugebiete.id = join_tee_anbaugebiete.anbaugebiet_id 
	
		JOIN join_tee_aromen ON tee.id = join_tee_aromen.tee_id 
		JOIN aromen ON aromen.id = join_tee_aromen.aroma_id 
	
		JOIN join_tee_benefits ON tee.id = join_tee_benefits.tee_id 
		JOIN benefits ON benefits.id = join_tee_benefits.benefit_id 
	
		JOIN join_tee_nebenwirkungen ON tee.id = join_tee_nebenwirkungen.tee_id 
		JOIN nebenwirkungen ON nebenwirkungen.id = join_tee_nebenwirkungen.nebenwirkung_id 
	
		JOIN join_tee_naehrstoffe ON tee.id = join_tee_naehrstoffe.tee_id 
		JOIN naerhstoffe ON naerhstoffe.id = join_tee_naehrstoffe.naehrstoff_id 

		`);
		
		const rohTeesAllDataArray = resTeesAllData.rows ;
/* 
	database response table:
		1	Darjeeling	1	koffeinhaltig	12	Indien	3	muskatell	3	stärken		1	Risiko verursachen	1	Antioxidantien
		1	Darjeeling	1	koffeinhaltig	12	Indien	3	muskatell	3	stärken		1	Risiko verursachen	2	Fluorid
		1	Darjeeling	1	koffeinhaltig	12	Indien	2	fruchtig		4	reduzieren	1	Risiko verursachen	2	Fluorid
		1	Darjeeling	1	koffeinhaltig	12	Indien	2	fruchtig		4	reduzieren	1	Risiko verursachen	3	Mangan
		1	Darjeeling	1	koffeinhaltig	12	Indien	2	fruchtig		4	reduzieren	1	Risiko verursachen	4	Kalium
		
	rohTeesAllDataArray 
	[
		{ "teeid": 1, "teename": "Darjeeling", "teeimage": "01_dar.jpg", ... }
		{ "teeid": 1, "teename": "Darjeeling", "teeimage": "01_dar.jpg", ... }
		{ "teeid": 1, "teename": "Darjeeling", "teeimage": "01_dar.jpg", ... }
		{ "teeid": 2, "teename": "Assam", "teeimage": "01_ass.jpg", ... }
		{ "teeid": 2, "teename": "Assam", "teeimage": "01_ass.jpg", ... }
		...
	]

	group data of different rows with the same "teeid" into one row with the same "teeid"
	grouped data goes into properties-arrays of one object with the "teeid" 

	rohTeesAllDataArray.reduce((acc, { teeid, ...rest }) 
		reduce - final result of across all elements of the array - a single value or oject as single value
		destructuring every element(row-object) with { teeid, ...rest } and transfer to callback:
			variable:	teeid=1,   		
			object:		rest={ "teename": "Darjeeling", "teeimage": "01_dar.jpg", ... } 

		? create an array of data: acc["teeid"]={ rest } - unique objects (rows) with duplicate data

		if !acc[teeid] not exists -> create array with key teeid-value acc[teeid]={ teeid, ...rest };
			acc[1]={ "teeid": 1, "teename": "Darjeeling", "teeimage": "01_dar.jpg", ... };

		else - acc[teeid] exists ->	

		Object.entries -> returns an array [key, value]  -> [ ['teename', 'Darjeeling'], ['aromenname', 'vollmundig'], ['aromenname', 'kfäftig'] ]

		else Object.entries( rest ).forEach(([key, value])   - forEach only for "rest" - without "teeid"
			two dimensional array acc[teeid][key]
			else if isArray(acc[1]["aromenname"])) exists -> acc[1]["aromenname"].push("vollmundig");
			else not exists -> create two dimensional [acc[teeid][key], value] ->  [ acc[1]["aromenname"], "kfäftig" ]
			

	var obj = { foo: "bar", baz: 42 };
	{ "teeid": 1, "teename": [ "Darjeeling", "Darjeeling", ...], "teebeschreibung": [ "Wird", "Wird", ... ], ...} 

	Object.values -> [ 'bar', 42 ]
	[  1, ["Darjeeling", "Darjeeling", ...], ["Wird", "Wird", ...], ...  ]

	Object.entries(rest) -> [ ['foo', 'bar'], ['baz', 42] ]
*/

		const objectsArr = Object.values(

			rohTeesAllDataArray.reduce((acc, { teeid, ...rest }) => {
			  if (!acc[teeid]) acc[teeid] = { teeid, ...rest };
			  else Object.entries(rest).forEach(([key, value]) => {
				 if (Array.isArray(acc[teeid][key])) acc[teeid][key].push(value);
				 else acc[teeid][key] = [acc[teeid][key], value];
			  });
			  return acc;
			}, {})
		);

/* 
		acc - object mit eingeschaft als objects mit eingeschaft als arrays mit den doppeleten werten
		{
			'1': {
				teeid: 1,
				teename: [ "Darjeeling", "Darjeeling", "Darjeeling", ...],
				aromenname: [ "muskatellartig",  "fruchtig", "blumig", "muskatellartig",  "fruchtig", "blumig", ...],
				...
			},
			{
			'2': {
				teeid: 2,
				...	
		}
*/


/* 
	Object.values  returns an array of property values: 
		objectsArr - id-Objekts mit eingeschaft als arrays mit den doppeleten werten

	objectsArr [
		{
			"teeid": 1,
			"teename": [ "Darjeeling", "Darjeeling", ... ],
			"aromenid": [ 3,   2,   1,   3,    2,   1,   3,   2, ...]
			"aromenname": [  "muskatellartig",  "fruchtig", "blumig", "muskatellartig",  "fruchtig", "blumig", ...  ],
			...
			]
		},
		{
			"teeid": 2,
			...
		]
*/

/* 	
	teesObjectsArray - id-Objekts mit Eingeschaften als arrays mit unique werten:
		"aromenname": [  "muskatellartig",  "fruchtig", "blumig", "muskatellartig"]

	new Set(obj[prop]) - The Set object lets you store unique values of any type - Remove duplicate elements from an array	

*/
		const teesObjectsArray = [];

		objectsArr.forEach(obj => {
		  const newObj = {};
		  for (const prop in obj) {
			 if (Array.isArray(obj[prop])) {
				const uniqueArray = [...new Set(obj[prop])];
				newObj[prop] = uniqueArray;
			 } else {
				newObj[prop] = obj[prop];
			 }
		  }
		  teesObjectsArray.push(newObj);
		});


/*  ##### RESULT ##################################### */

		res.json( {teesObjectsArray: teesObjectsArray} ); 
		// res.json( objectsArr ); 
		// res.json( rohTeesAllDataArray ); 

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
	// res.send('Hello /teeapi !');
};






// ----- /tees/:tee_id
const getTee = async (req, res) => {

	const { tee_id } = req.params;
	console.log('getTee params:', req.params);

	// https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-inner-join/

	try {
		const teeAllDeteils = await pool.query(`
		SELECT 
			
			tee.id AS teeid, 
			tee.name AS teename,
			tee.beschreibung,
			tee.zubereitung,
			tee.image, 
	
			attribute.id AS attributeid, 
			attribute.name AS attributename,
	
			anbaugebiete.id AS anbaugebieteid,
			anbaugebiete.name AS anbaugebietename,
	
			aromen.id AS aromenid,
			aromen.name AS aromenname,
	
			benefits.id AS benefitsid,
			benefits.name AS benefitsname,
	
			nebenwirkungen.id AS nebenwirkungenid,
			nebenwirkungen.name AS nebenwirkungenname,
	
			naerhstoffe.id AS naerhstoffeid,
			naerhstoffe.name AS naerhstoffename
	
			FROM tee
	
				JOIN join_tee_attribute ON tee.id = join_tee_attribute.tee_id 
				JOIN attribute ON attribute.id = join_tee_attribute.attribut_id 
	
				JOIN join_tee_anbaugebiete ON join_tee_anbaugebiete.tee_id = tee.id 
				JOIN anbaugebiete ON anbaugebiete.id = join_tee_anbaugebiete.anbaugebiet_id 
	
				JOIN join_tee_aromen ON tee.id = join_tee_aromen.tee_id 
				JOIN aromen ON aromen.id = join_tee_aromen.aroma_id 
	
				JOIN join_tee_benefits ON tee.id = join_tee_benefits.tee_id 
				JOIN benefits ON benefits.id = join_tee_benefits.benefit_id 
	
				JOIN join_tee_nebenwirkungen ON tee.id = join_tee_nebenwirkungen.tee_id 
				JOIN nebenwirkungen ON nebenwirkungen.id = join_tee_nebenwirkungen.nebenwirkung_id 
	
				JOIN join_tee_naehrstoffe ON tee.id = join_tee_naehrstoffe.tee_id 
				JOIN naerhstoffe ON naerhstoffe.id = join_tee_naehrstoffe.naehrstoff_id 
	
	
			WHERE tee.id = $1`, [tee_id] );
	
			// console.log('teeAllDeteils', teeAllDeteils.rows);
	
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
			
		const teeObj = teeAllDeteils.rows.reduce((acc, curr) => {
		  Object.keys(curr).forEach(key => {
			 acc[key] = acc[key] || [];
			 acc[key].push(curr[key]);
		  });
		  return acc;
		}, {});
	
		/* 
		"teeAllDeteils": {
			"teename": 				[ "Assam",    "Assam",   "Assam",      "Assam",    "Assam",   "Assam", 		... ],
			"anbaugebietename":	[ "Indien",   "Indien",  "Indien",     "Indien",   "Indien",  "Indien", 	... ],
			"benefitsname": 		[ "fördernd", "stärken", "reduzieren", "fördernd", "stärken", "reduzieren" ... ],
			"aromenname": 			[ "malzig",   "malzig",  "malzig",     "kfäftig",  "kfäftig", "kfäftig",   ... ],
			...
		}
			https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#remove_duplicate_elements_from_an_array
	
		*/
	
		// var.1 - remove_duplicate_elements_from_an_array
		for (let key in teeObj) {
			teeObj[key] = [...new Set(teeObj[key])];
		}
		console.log(teeObj);
	
		/* 	
		var.2 - remove_duplicate_elements_from_an_array
		for (let key in teeObj) {
			teeObj[key] = teeObj[key].filter((item, index, arr) => {
				return arr.indexOf(item) === index;
			});
		 }
		console.log(teeObj);
		*/
	
		res.json( { 
			teeObject: teeObj,
		} );
	
	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};

 


// ----- /tees/anbaugebiet/:anbaugebiet_id
const getTeesOneAnbaugebiet = async (req, res) => {

	const { anbaugebiet_id } = req.params;
	//console.log('params:', req.params);

	try {

		const teesOneAnbaugebietArray = await pool.query(`
		SELECT tee.id, tee.name, tee.beschreibung, tee.zubereitung 
			FROM tee 
			JOIN join_tee_anbaugebiete ON tee.id = join_tee_anbaugebiete.tee_id 
			JOIN anbaugebiete ON anbaugebiete.id = join_tee_anbaugebiete.anbaugebiet_id 
			WHERE anbaugebiete.id = $1`, [anbaugebiet_id] );

		// console.log('teesOneAnbaugebietArray', teesOneAnbaugebietArray.rows);

		res.json( { teesOneAnbaugebietArray: teesOneAnbaugebietArray.rows } );


		// res.json( [teeArtenArray.rows, teesArray.rows] );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}
};




// ----- /tees/anbaugebiet/:anbaugebiet_id
const getTeesOneArt = async (req, res) => {
	const { teeart_id } = req.params;
	// console.log('params:', req.params);

	try {

		const teesOneArtArray = await pool.query(`SELECT * FROM tee	WHERE tee.tee_art_id = $1`, [teeart_id]);
		//console.log('TeesOneArt', TeesOneArt.rows);
		
		res.json( { 
			teesOneArtArray: teesOneArtArray.rows, 
		} );

		// res.json( [teeArtenArray.rows, teesArray.rows] );

	} catch (err) {
		console.log(err.message);
		res.sendStatus(500);
	}

		// res.send('Hello /teeapi !');
 };



/* 
// test connect
client.query('SELECT * FROM tee', function(err, result) {
	if(err) {
	return console.error('error running query', err);
	}
	console.log('result', result.rows);
	
	client.end();
});
*/

 module.exports = {
	getSuchKriterien,
	getTeesKurz,
	getTees,
	getTee,
	getTeesOneAnbaugebiet,
	getTeesOneArt,
	getTeeArten,
	getTeeArt,
	getAnbaugebiete,
	getBenefits,
	getAromen,
	getAttribute,
 };





