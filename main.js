var phraseSpot = document.querySelector('.phrase');
var receiveMessageButton = document.querySelector('.receive-message');
var radioMantra = document.querySelector('.mantra');
var radioAffirmation = document.querySelector('.affirmation');
var clearButton = document.querySelector('.clear');
var userChoice;
var phraseToDisplay;

receiveMessageButton.addEventListener('click', assignPhrase);
radioMantra.addEventListener('click', unclick);
radioAffirmation.addEventListener('click', unclick);
clearButton.addEventListener('click', clearPage)

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

function unclick() {
  var disabled = !receiveMessageButton.classList.contains('disabled');
  
  if (disabled && radioMantra.checked === true) {
    radioMantra.checked = false;
    userChoice = undefined;
    document.body.classList.remove('body-mantra');
    receiveMessageButton.classList.add('disabled');
  } else if (disabled && radioAffirmation.checked === true) {
    radioAffirmation.checked = false;
    userChoice = undefined;
    document.body.classList.remove('body-affirmation');
    receiveMessageButton.classList.add('disabled');
  } else { enableButton() };
}



function enableButton() {
  receiveMessageButton.classList.remove('disabled');
  userChoice = document.querySelector('input[name=user-choice]:checked').value;
  if (userChoice === "mantra") {
    document.body.classList.remove('body-affirmation');
    document.body.classList.add('body-mantra');
  } else {
    document.body.classList.remove('body-mantra');
    document.body.classList.add('body-affirmation');
  }
}

function assignPhrase() {
  if (userChoice === undefined) {
    window.alert('Please select an option.');
    return;
  }
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

  clearButton.classList.remove('disabled');
}

function clearPage() {
  window.location.reload();
}

