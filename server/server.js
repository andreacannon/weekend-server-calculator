const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []
let results = [];
let resultHistory = [];

// Here's a wonderful place to make some routes:
// GET /calculations
// POST /calculations
app.get('/results' , (req, res) => {
  console.log('GET request for /results');
  res.send(results);
})

app.get('/history' , (req, res) => {
  console.log('GET request for results history');
  res.send(resultHistory);
})

app.post('/history' , (req, res) => {
  console.log('POST request for /history');
  let numbersToAdd = req.body;
  let newResult;

  if (numbersToAdd.operator === '+') {
      newResult = Number(numbersToAdd.number1) + Number(numbersToAdd.number2);
  }else if (numbersToAdd.operator === '-'){
      newResult = Number(numbersToAdd.number1) - Number(numbersToAdd.number2);
  }else if (numbersToAdd.operator === '*'){
      newResult = Number(numbersToAdd.number1) * Number(numbersToAdd.number2);
  }else if (numbersToAdd.operator === '/'){
      newResult = Number(numbersToAdd.number1) / Number(numbersToAdd.number2);
  }

  let calculation = `${numbersToAdd.number1} ${numbersToAdd.operator} ${numbersToAdd.number2} = ${newResult}`
  resultHistory.push(calculation);
  results.push(newResult);
  res.sendStatus(201);
})

app.delete('/history/:id' , (req, res) => {
  console.log(req.params.id);
  const deleteIndex = Number(req.params.id);
  resultHistory = resultHistory.filter((numbers, index) => index !== deleteIndex);
  res.sendStatus(204);
})

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
