const inputs = document.querySelector('.inputs'),
resetBtn = document.querySelector('.reset-btn'),
hint = document.querySelector('.hint span'),
typingInput = document.querySelector('.typing-input'),
wrongLetter = document.querySelector('.wrong-letter span'),
guessLeft = document.querySelector('.guess-left span');

let word, correct= [], incorrect = [], maxGuesses;

function randomWord(){
    let ranObj= wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 8;
    correct= []; 
    incorrect = [];
    // console.log(ranObj);

    let html='';
    for (let i=0; i<word.length; i++){
        html += `<input type="text" disabled />`
    }
    inputs.innerHTML=html;
    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrect;
}

randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[a-zA-Z]+$/) && !incorrect.includes(`${key}`) && !correct.includes(key)){
        // console.log(key);

        // checking the letter existence
        if(word.includes(key)){
            // console.log('letter found')
            for (let i = 0; i < word.length; i++){
                //matching the letter to the word's letters
                if (word[i] === key ){
                    correct.push(key)
                    inputs.querySelectorAll('input')[i].value = key;
                }
            }
        } else {
            // console.log('letter not found')z
            maxGuesses--;
            incorrect.push(`${key}`);

        }
        guessLeft.innerText = maxGuesses
        wrongLetter.innerText = incorrect;
    }
    typingInput.value = '';

    setTimeout(() => {
        if( correct.length === word.length){
        alert (`Congrats! you got it right, the word is ${word.toUpperCase()}`);
        randomWord();
    } else if (maxGuesses < 1){
        alert ('Game over! you didn\'t guess the word')
        for (let i = 0; i < word.length; i++){
                //matching the letter to the word's letters
                    inputs.querySelectorAll('input')[i].value = word[i];
                
            }
    }
    })
}

resetBtn.addEventListener('click',randomWord);
typingInput.addEventListener('input', initGame);
document.addEventListener('keydown', ()=> typingInput.focus());