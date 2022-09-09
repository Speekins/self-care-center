var userChoice;
var phraseSpot = document.querySelector('.phrase');
var receiveMessage = document.querySelector('.receive-message');

receiveMessage.addEventListener('click', assignPhrase);

var phraseToDisplay;

function randomPhrase(array) {
  var randomIndex = randomNumber(array);
  var randomPhrase = array[randomIndex];
  return randomPhrase;
}

function randomNumber(array) {
  var max = array.length;
  var index = Math.floor(Math.random() * max);
  return index;
};

function assignPhrase() {
  userChoice = document.querySelector('input[name=user-choice]:checked').value;

  if (userChoice === "mantra") {
    phraseToDisplay = randomPhrase(mantras);
  } else {
    phraseToDisplay = randomPhrase(affirmations);
  }

  displayPhrase();
}

function displayPhrase() {
  var p = document.createElement('p');
  phraseSpot.innerHTML = '';
  p.innerText = phraseToDisplay;
  phraseSpot.appendChild(p);
}

console.log(userChoice);