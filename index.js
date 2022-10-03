const addInput = document.querySelector('.addInput');
const submitBtn = document.querySelector('.submit');
const result = document.querySelector('.result');

const sumResult = document.querySelector('.sum');
const avgResult = document.querySelector('.avg');
const minResult = document.querySelector('.min');
const maxResult = document.querySelector('.max');

// const num = document.querySelector('.num');
// const add = (item) => {
//   let arr = item.split(',');
//   return arr.reduce((a, b) => Number(a) + Number(b));
// };

// const avg = (item) => {
//   let arr = item.split(',');
//   let sum = arr.reduce((a, b) => Number(a) + Number(b));
//   return sum / arr.length;
// };

// const min = (item) => {
//   let arr = item.split(',');
//   return Math.min(...arr);
// };
// const max = (item) => {
//   let arr = item.split(',');
//   return Math.max(...arr);
// };
// num.addEventListener('keyup', (e) =>{
//     result.textContent = `
//     Suma: ${add(e.target.value) || 0}
//     Średnia: ${avg(e.target.value) || 0}
//     Minimum : ${min(e.target.value) || 0}
//     Maximum : ${max(e.target.value) || 0}
//     `
// })

const allInputs = document.querySelectorAll('input');
let sum = 0;
let arr = [];

const callback = (e) => {
  arr.push(e.target.value);
  sum += Number(e.target.value);
  sumResult.textContent = sum || 0;
  avgResult.textContent = sum / allInputs.length || 0;
  minResult.textContent = Math.min(...arr);
  maxResult.textContent = Math.max(...arr);
};

allInputs.forEach((input) => {
  input.addEventListener('change', (e) => {
    callback(e);
  });

  input.addEventListener('focusout', (e) => {
    e.target.value == '' && input.remove(e.target);
  });
});

addInput.addEventListener('click', () => {
  if (allInputs.length >= 4) return;
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.classList.add('num');
  newInput.placeholder = 'Wprowadź liczbe';
  newInput.addEventListener('input', (e) => callback(e));
  document.body.insertAdjacentElement('afterbegin', newInput);
});
