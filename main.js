var phraseSpot = document.querySelector('.phrase');
var receiveMessageButton = document.querySelector('.receive-message');
var radioMantra = document.querySelector('.mantra');
var radioAffirmation = document.querySelector('.affirmation');
var clearButton = document.querySelector('.clear');
var seeAllButton = document.querySelector('.see-all');
var svg = document.querySelector('.meditation-svg');
var buttonSection = document.querySelector('.button-section');
var h2 = document.querySelector('.choose');
var displayWindow = document.querySelector('.display-window');
var allMessagesButton = document.querySelector('.see-all');
var homeButton = document.querySelector('.home');
var showAllSection = document.querySelector('.show-all-section');
var userOptions = document.querySelector('.user-options-section');
var addNewText = document.querySelector('.add-new');
var editText = document.querySelector('.edit-text');
var affirmationSection = document.querySelector('.all-affirmations');
var mantraSection = document.querySelector('.all-mantras');
var addButton = document.querySelector('.add');
var editButton = document.querySelector('.edit');
var deleteButton = document.querySelector('.delete');
var goBackButton = document.querySelector('.go-back');
var deleteInstructions = document.querySelector('.delete-instructions');
var editInstructions = document.querySelector('.edit-instructions');
var editTextField = document.querySelector('.edit-text');
var addNewTextField = document.querySelector('.add-new');
var saveTextButton = document.querySelector('.save-text');
var newAffirmationButton = document.querySelector('.save-new-affirmation');
var newMantraButton = document.querySelector('.save-new-mantra');
var newMessageButtons = document.querySelector('.new-message-buttons');

var userChoice;
var phraseToDisplay;
var messageToDelete;
var lastTarget;

radioMantra.addEventListener('click', unclick);
radioAffirmation.addEventListener('click', unclick);
receiveMessageButton.addEventListener('click', assignPhrase);
saveTextButton.addEventListener('click', saveNewText);
newAffirmationButton.addEventListener('click', addNewMessage);
newMantraButton.addEventListener('click', addNewMessage);
clearButton.addEventListener('click', clearPage);
seeAllButton.addEventListener('click', showAllMessages);
homeButton.addEventListener('click', goHome);
addButton.addEventListener('click', goToAddSection);
editButton.addEventListener('click', goToEditSection);
deleteButton.addEventListener('click', goToDeleteSection);
goBackButton.addEventListener('click', goBack);
affirmationSection.addEventListener('dblclick', deleteOrEdit);
mantraSection.addEventListener('dblclick', deleteOrEdit);

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
  displaySVG();
  if (userChoice === undefined) {
    window.alert('Please select an option.');
    return;
  }
  if (userChoice === "mantra") {
    phraseToDisplay = randomPhrase(mantras);
  } else {
    phraseToDisplay = randomPhrase(affirmations);
  }
  setTimeout(displayPhrase, 5000);
}

function displayPhrase() {
  var p = document.createElement('p');
  phraseSpot.innerHTML = '';
  p.innerText = phraseToDisplay;
  phraseSpot.appendChild(p);

  clearButton.classList.remove('disabled');
}

function displaySVG() {
  var div = document.createElement('div');
  phraseSpot.innerHTML = '';
  div.innerHTML = svgData;
  phraseSpot.appendChild(div);
}

function clearPage() {
  window.location.reload();
}

function showAllMessages() {
  buttonSection.classList.add('hidden');
  h2.classList.add('hidden');
  displayWindow.classList.add('hidden');
  allMessagesButton.classList.add('hidden');
  clearButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
  showAllSection.classList.remove('hidden');
  userOptions.classList.remove('hidden');
  document.body.classList.remove('body-mantra');
  document.body.classList.remove('body-affirmation');
  populateMessages();
}

function goHome() {
  buttonSection.classList.remove('hidden');
  h2.classList.remove('hidden');
  displayWindow.classList.remove('hidden');
  allMessagesButton.classList.remove('hidden');
  clearButton.classList.remove('hidden');
  homeButton.classList.add('hidden');
  showAllSection.classList.add('hidden');
  userOptions.classList.add('hidden');
}

function goBack() {
  deleteFromClasslist('message-delete');
  deleteFromClasslist('message-edit');
  populateMessages();
  addButton.classList.remove('hidden');
  editButton.classList.remove('hidden');
  deleteButton.classList.remove('hidden');
  homeButton.classList.remove('hidden');
  goBackButton.classList.add('hidden');
  deleteInstructions.classList.add('hidden');
  editInstructions.classList.add('hidden');
  editTextField.classList.add('hidden');
  saveTextButton.classList.add('hidden');
  addNewTextField.classList.add('hidden');
  newMessageButtons.classList.add('hidden');
}

function goToDeleteSection() {
  addToClasslist('message-delete');
  addButton.classList.add('hidden');
  editButton.classList.add('hidden');
  deleteButton.classList.add('hidden');
  homeButton.classList.add('hidden');
  goBackButton.classList.remove('hidden');
  deleteInstructions.classList.remove('hidden');
}

function goToEditSection() {
  addToClasslist('message-edit');
  addButton.classList.add('hidden');
  editButton.classList.add('hidden');
  deleteButton.classList.add('hidden');
  homeButton.classList.add('hidden');
  goBackButton.classList.remove('hidden');
  editInstructions.classList.remove('hidden');
  editTextField.classList.remove('hidden');
  saveTextButton.classList.remove('hidden');
}

function goToAddSection() {
  addButton.classList.add('hidden');
  editButton.classList.add('hidden');
  deleteButton.classList.add('hidden');
  homeButton.classList.add('hidden');
  goBackButton.classList.remove('hidden');
  addNewTextField.classList.remove('hidden');
  newMessageButtons.classList.remove('hidden');
}

function populateMessages() {
  affirmationSection.innerHTML = '';
  mantraSection.innerHTML = '';
  for (var i = 0; i < affirmations.length; i++) {
    var p = document.createElement('p');
    p.classList.add('message');
    p.classList.add('affirmations');
    p.innerText = affirmations[i];
    affirmationSection.appendChild(p);
  }
  for (var i = 0; i < mantras.length; i++) {
    var p = document.createElement('p');
    p.classList.add('message');
    p.classList.add('mantras');
    p.innerText = mantras[i];
    mantraSection.appendChild(p);
  }
}

function addToClasslist(classToAdd) {
  var messages = document.querySelectorAll('.message');
  for (var i = 0; i < messages.length; i++) {
    messages[i].classList.add(classToAdd);
  }
}

function deleteFromClasslist(classToRemove) {
  var messages = document.querySelectorAll('.message');
  for (var i = 0; i < messages.length; i++) {
    messages[i].classList.remove(classToRemove);
  }
}

function deleteOrEdit(event) {
  var target = event.target;
  messageToDelete = target.innerText;

  if (target.classList.contains('message-delete')){
    removeMessage(target);
  } else if (target.classList.contains('message-edit')){
    lastTarget = target;
    editTextField.value = target.innerText;
  }
}

function removeMessage(element) {
  element.remove();
  if (element.classList[1] === 'affirmations') {
    for (var i = 0; i < affirmations.length; i++) {
      if (affirmations[i] === messageToDelete) {
       affirmations.splice(i, 1);
      }
    } 
  } else {
      for (var i = 0; i < mantras.length; i++) {
        if (mantras[i] === messageToDelete) {
       mantras.splice(i, 1);
        }
      }
    }
}

function saveNewText() {
  removeMessage(lastTarget);
  lastTarget.innerText = editTextField.value;
  if (lastTarget.classList[1] === 'affirmations') {
    affirmations.push(lastTarget.innerText);
  } else {
    mantras.push(lastTarget.innerText);
  }
  editTextField.value = '';
  goBack();
}

function addNewMessage(event) {
  console.log(event.target);
  if (event.target.classList.contains("save-new-affirmation")) {
    affirmations.push(addNewTextField.value);
  } else {
    mantras.push(addNewTextField.value);
  }
  addNewTextField.value = '';
  goBack();
}