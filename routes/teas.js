const express = require('express');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const teaRouter = express.Router(); 

const {
  getTeeArten,			
  getTeesOneArt,
} = require('../controllers/teas.js');


//  app.use('/teeapi', teaRouter);  ... in server.js

teaRouter.get('/', getTeeArten);									//  

teaRouter.get('/teearten', getTeeArten);
teaRouter.get('/teearten/:teeArtId', getTeesOneArt);		//  teearten/:teeArtname | teearten/schwarzer-tee   

teaRouter.get('/anbaugebiete', getTeeArten);
teaRouter.get('/benefits', getTeeArten);
teaRouter.get('/aromen', getTeeArten);
teaRouter.get('/koffeein', getTeeArten);
teaRouter.get('/tees', getTeeArten);
teaRouter.get('/tees/:id', getTeeArten);						//  teearten/:teeArtname | teearten/schwarzer-tee
teaRouter.get('/equipment', getTeeArten);
teaRouter.get('/search', getTeeArten);





teaRouter.get('/category/:teaTypeId', getTeesOneArt);		

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
