const express = require('express');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const teaRouter = express.Router(); 

const {
  getTeeArten,			
  getTeeArt,
  getTee,
  getAnbaugebiete,
  getTeesOneArt,
  getTees,
  getTeesOneAnbaugebiet,
  getBenefits,
  getAromen,
  getAttribute,
} = require('../controllers/teas.js');


// ...in server.js - app.use('/teeapi', teaRouter);  

// teaRouter.get('/', getTeeArten);								//  /teeapi/

teaRouter.get('/suchkriterien', getTeeArten, getAnbaugebiete, );				//  

teaRouter.get('/tees', getTees);
teaRouter.get('/tees/:tee_id', getTee);						// frontend SEO:  tees/:teeName | tees/darjeeling
teaRouter.get('/tees/anbaugebiet/:anbaugebiet_id', getTeesOneAnbaugebiet);
teaRouter.get('/tees/teeart/:teeart_id', getTeesOneArt);		// frontend SEO:  tees/teeart/:teeArtName | tees/teeart/schwarzer-tee  

teaRouter.get('/attribute', getAttribute);   // koffeinhaltig - koffeinfrei

teaRouter.get('/teearten', getTeeArten);
teaRouter.get('/teearten/:teeart_id', getTeeArt);		// frontend SEO:  teearten/:teeArtname | teearten/schwarzer-tee   

teaRouter.get('/anbaugebiete', getAnbaugebiete);

teaRouter.get('/benefits', getBenefits);
teaRouter.get('/aromen', getAromen);

// teaRouter.get('/equipment', getEquipment);
// teaRouter.get('/search', getSearch);




module.exports = teaRouter;		// "api" - '/teas' in server.js


/* 

====== frontend: 

SEO Links:

/schwarzer-tee/
/schwarzer-tee/Assam-FTGFOP1-Bukhial
/schwarzer-tee/?anbaugebiet=Assam		?	GET   OR   POST 

/kraeutertee/
/kraeutertee/kamille


<Route path='/' element={<HomePage/>} />
request to backend: 
	fetch(`https://teakon-massala-backend.onrender.com/tees`)	...all teaTypeNames for select

z.B:		/schwarzer_tee/		->>    all Teas for type "schwarzer_tee"  - pagination 
<Route path='/:teeArtName' element={<TeeSorteDetail/>} />   ...SEO teeArtName - no tea-ID
request to backend:  
	fetch(`https://teakon-massala-backend.onrender.com/tees/${tee_art_id}`)		



====== backend: 

teaRouter.get('/:teeArtId', getTeesOneArt);

/teearten
/teearten/:id
/anbaugebiete
/benefits
/aromen
/koffeein
/tees
/tees/:id
/equipment
/search


objekte:
teeobjekt join aus allen tabeln

*/
