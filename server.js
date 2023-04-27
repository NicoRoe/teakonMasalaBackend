const express = require('express');
const teeRouter = require('./routes/teas.js');
const app = express()
const PORT = process.env.PORT || 4000; 

require('dotenv').config();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})



app.get('/', (req, res) => {
	res.send('Hello World! - Home Page - Test ohne routing ')
})

// teas-routing 	- require from /routes/teas.js		<- middlewares - from /controller/teas.js  
app.use('/teeapi', teeRouter);
// app.use('/shopapi', shopRouter);
// app.use('/accessoriesapi', accessoriesRouter);
