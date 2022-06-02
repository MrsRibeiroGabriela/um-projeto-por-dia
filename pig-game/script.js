'use strict';
//challenge
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const pigFace = document.querySelector('.pig-face');

//Selectiong buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//Starting conditions
let scores, currentScore, activePlayer, playing;

const start = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden'); //adding class
    pigFace.classList.remove('hidden');


    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

start();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1:0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random()*6) + 1;
        //2. Display dice
        pigFace.classList.add('hidden');
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; //selecting dice image
        //3. Check for rolled 1
        if(dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //current0.textContent = currentScore;
            
        } else { 
            //switch to next player
            switchPlayer();
        }
    }
});

//Holding score
btnHold.addEventListener('click', function(){
    if(playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if player's score is >= 100
        if(scores[activePlayer]>=100) {
        //Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            pigFace.classList.remove('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
        //Switch to the next player
            switchPlayer();  
        }
    }
});
//Restarting the game
btnNewGame.addEventListener('click', start);
