
const fs = require('fs');
//const index = fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('data.json','utf-8'));//data.json ko read karke parse kardega JSON format mai and store karlega data variable mai
const quotes = data.quotes; //This line extracts the value of the quotes property from the data object and assigns it to the variable quotes. Assuming the JSON data structure is something like { "quotes": [...] }, data.quotes would represent an array of quotes.


const express = require('express')
const morgan = require('morgan');
const app = express()

//body Parser

app.use(express.json()); //, this middleware will parse that data and make it available in req.body of your route handlers.
app.use(morgan('combined')); //Morgan that logs detailed information about each request, including the HTTP method, status code, response time, and more.
app.use(express.static('public')); //This middleware simplifies serving static content in Express applications.

const port = 8000

// app.use(express.json())


//Create  POST Operation
app.post('/quotes',(req,res)=>{
  console.log(req.body);
  quotes.push(req.body);
  res.json(req.body);
});

//Read Quotes
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// Read quotes/:id
    app.get('/quotes/:id',(req,res)=>{
    const id = +req.params.id;
    const quote = quotes.find(p=>p.id===id) // find jo hai woh bas ek copy provide karega data ka 
    res.json(quote);
    });

    // Upadte PUT quotes/:id
    app.put('/quotes/:id',(req,res)=>{
      const id = +req.params.id;
      const quoteIndex = quotes.findIndex(p=>p.id===id)
      quotes.splice(quoteIndex,1,{...req.body,id:id})
      res.sendStatus(201).json();
      });
  
       // Upadte PATCH quotes/:id
    app.patch('/quotes/:id',(req,res)=>{
      const id = +req.params.id;
      const quoteIndex = quotes.findIndex(p=>p.id===id)
      const quote = quotes[quoteIndex];
      quotes.splice(quoteIndex,1,{...quote,...req.body})
      res.sendStatus(201).json();
      });
  

//DELETE Delete/:id
app.delete('/quotes/:id',(req,res)=>{
  const id = +req.params.id;
  const  quoteIndex = quotes.findIndex(p=>p.id===id)
  quotes.splice( quoteIndex,1,) 
  res.json(product);
}); 



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:8000`)})