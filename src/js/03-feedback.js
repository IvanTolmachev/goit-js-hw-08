// import { filter } from 'lodash';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveData = {};
onPagaloading();

form.addEventListener('submit', submitReset);
form.addEventListener('input', throttle(onSetInput, 500));

function onSetInput(e) {
  saveData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
}

function onPagaloading() {
  let getData = localStorage.getItem(STORAGE_KEY);
  if (getData) {
    getData = JSON.parse(getData);
    Object.entries(getData).forEach(([name, value]) => {
      saveData[name] = value;
      form.elements[name].value = value;
    });
  }
}

function submitReset(e) {
  e.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(`${name}:`, value));
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
