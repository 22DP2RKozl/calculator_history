// Saglabā vēstures ierakstus
let history = JSON.parse(localStorage.getItem('history')) || [];

// Funkcija, kas pievieno simbolus ekrānam
function addToDisplay(value) {
  const display = document.getElementById('display');
  display.value += value;
}

// Funkcija, kas izdzēš ekrāna saturu
function clearDisplay() {
  document.getElementById('display').value = '';
}

// Funkcija, kas veic aprēķinus un saglabā vēsturi
function calculate() {
  const display = document.getElementById('display');
  const expression = display.value.trim(); // Pārliecināmies, ka izteiksme ir pareizi formatēta
  
  try {
  if (expression === "") return; // Ja ekrāns ir tukšs, neapstrādājam
  const result = eval(expression); // Aprēķina izteiksmi
  
  display.value = result;
  
  // Saglabā aprēķinu vēsturē
  addHistory(expression + ' = ' + result);
  } catch (error) {
  display.value = 'Kļūda'; // Rāda kļūdas ziņojumu
}
}

// Funkcija, kas pievieno vēsturi
function addHistory(record) {
  history.push(record);
  localStorage.setItem('history', JSON.stringify(history));
  updateHistory();
}

// Funkcija, kas attēlo vēsturi
function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = ''; // Notīra vēstures sarakstu

  history.forEach((item, index) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = item;

  // Pievieno pogu dzēšanai
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Dzēst';
  deleteButton.onclick = () => deleteHistory(index);
  listItem.appendChild(deleteButton);

  historyList.appendChild(listItem);
});
}

// Funkcija, kas dzēš vēsturi
function clearHistory() {
  history = [];
  localStorage.removeItem('history');
  updateHistory();
}

// Funkcija, kas dzēš konkrētu ierakstu vēsturē
function deleteHistory(index) {
  history.splice(index, 1);
  localStorage.setItem('history', JSON.stringify(history));
  updateHistory();
}

// Atjaunina vēsturi, kad lapa tiek ielādēta
updateHistory();
