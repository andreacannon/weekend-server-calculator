console.log('client.js is sourced!');

document.querySelector('#firstInput').value = '';
document.querySelector('#secondInput').value = '';

let operator;

function operatorButton(event){
    operator = event.target.value;
    console.log(operator);
}

function equalsButton(event){
    let firstInput = document.querySelector('#firstInput').value;
    let secondInput = document.querySelector('#secondInput').value;

    console.log(firstInput, secondInput);
    console.log(operator);


    let numbers = {
        number1: firstInput,
        number2: secondInput,
        operator: operator
    }
    console.log(numbers);
    axios.post('/history' , numbers).then((response) => {
        console.log(response);
        results();
        previousAnswers();
    }).catch((error) => {
        console.log();
        alert('Something went Wrong!')
    })
}

function results(){
    axios.get('/results').then((response) => {
        console.log(response);
        let answerDiv = document.querySelector('#answer');
        let answerFromServer = response.data;
        

        for (let answer of answerFromServer){
            answerDiv.innerHTML = `
            <h2>Answer: ${answer}</h2>
            `
        }
    })
}

function previousAnswers(){
    axios.get('/history').then((response) => {
        console.log(response);
        let numbers = response.data;
        let answerDiv = document.querySelector('#answer')
        // answerDiv.innerHTML = '';

        answerDiv.innerHTML += `
        <ul>
            <li>   
                <p>
                ${numbers[numbers.length - 1]}
                </p>
            </li>    
        </ul>
        <button onClick="deleteAnswer()">Delete</button>
    `
    }).catch((error) => {
        console.log(error);
        alert('Something went Wrong!')
    })
}

function deleteAnswer(index){
    axios.delete(`/history/${index}`).then((response) => {
        console.log(response);
        previousAnswers();
    }).catch((error) => {
        console.log(error);
        alert('Something went Wrong!')
    })
}

function clear(){
    document.querySelector('#firstInput').value = '';
    document.querySelector('#secondInput').value = '';
    operator = '';
}