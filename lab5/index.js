const randomNumberArray = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 100)
);

const addData = async (...data) => {
  let sum = 0;
  for (let number of data) {
    sum = await asyncAdd(sum, number);
  }
  return sum;
};
const addData2 = async (...data) => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum = await asyncAdd(sum, data[i]);
  }
  return sum;
};

const measureTime = async (nameOfMeasurement, callback) => {
  console.log(`Start: ${nameOfMeasurement}`);
  performance.mark('measurement start');
  const result = await callback();
  performance.mark('measurement end');
  const runTime = performance.measure(
    'Execution time',
    'measurement start',
    'measurement end'
  );
  console.log(`Wynik z ${nameOfMeasurement}: ${result}`);
  console.log(`Czas wykonywania: ${runTime.duration.toFixed(2)}ms`);
};

(async () => {
  await measureTime(
    'add with for of',
    () => addData(...randomNumberArray),
    randomNumberArray
  );
  await measureTime(
    'add with for loop',
    () => addData2(...randomNumberArray),
    randomNumberArray
  );
})();

async function asyncAdd(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    console.log('err', { a, b });
    return Promise.reject('Argumenty muszą mieć typ number!');
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 10);
  });
}
