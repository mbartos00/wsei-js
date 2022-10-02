const num = document.querySelector('.num')

const addInput = document.querySelector('.addInput')
const submitBtn = document.querySelector('.submit')
const result = document.querySelector('.result')

const add = (item) =>{
    let arr = item.split(',');
    return arr.reduce((a,b) => Number(a) + Number(b))
}

const avg = (item) =>{
    let arr = item.split(',');
    let sum = arr.reduce((a,b) => Number(a) + Number(b))
    return sum / arr.length
}

const min = (item) =>{
    let arr = item.split(',');
    return Math.min(...arr);
}
const max = (item) =>{
    let arr = item.split(',');
    return Math.max(...arr);
}

addInput.addEventListener('click', () =>{
    let allInputs = document.querySelectorAll("input");
    if(allInputs.length >= 4) return
   const newInput = document.createElement('input');
   newInput.classList.add('num4');
   newInput.placeholder = "Wprowadź liczbe"
   document.body.insertAdjacentElement('afterbegin', newInput)

})

num.addEventListener('keyup', (e) =>{
    result.textContent = `
    Suma: ${add(e.target.value) || 0}
    Średnia: ${avg(e.target.value) || 0}
    Minimum : ${min(e.target.value) || 0}
    Maximum : ${max(e.target.value) || 0}
    `
})



