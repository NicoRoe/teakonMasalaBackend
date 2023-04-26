const express = require('express');

// class to create modular, mountable route handlers. | "express.Router class" vs "Basic routing"
const teaRouter = express.Router(); 

const {
  getTeeArten,			
  getTeesOneArt,
} = require('../controllers/teas.js');


//  app.use('/teas', teaRouter);  ... in server.js

teaRouter.get('/', getTeeArten);						//  teas/

teaRouter.get('/category/:teaTypeId', getTeesOneArt);		//  teas/<schwarzer_tee_id>

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

*/
