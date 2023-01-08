let api_key = '98c9a344a165964484231faf23acdf5c';

const openNavBtn = document.getElementById('openNavBtn');
const closeNavBtn = document.getElementById('closeNavBtn');
const nav = document.querySelector('.header__nav');
const cityBtn = document.querySelectorAll('.header__nav--recent-cities-city');

openNavBtn.addEventListener('click', () => {
  nav.style.transform = 'translateX(0)';
});

closeNavBtn.addEventListener('click', () => {
  nav.style.transform = 'translateX(-200%)';
});

const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const recentCities = document.getElementById('recentCities');
let searchArr = JSON.parse(localStorage.getItem('SearchList')) || [];
searchBtn.addEventListener('click', () => {
  const cityBtn = document.querySelectorAll('.header__nav--recent-cities-city');

  if (searchBar.value != '' || typeof searchBar.value != 'string') {
    let capitalisedInput =
      searchBar.value[0].toUpperCase() + searchBar.value.substring(1);

    searchArr.push(capitalisedInput);

    localStorage.setItem('SearchList', JSON.stringify(searchArr));
    nav.style.transform = 'translateX(-200%)';
  } else alert('Please enter correct city name');
});

const getRecentCities = () => {
  searchArr.map(city => {
    createCityButton(city);
  });
  const cityBtn = document.querySelectorAll('.header__nav--recent-cities-city');

  cityBtn.forEach(button => {
    button.addEventListener('click', () => {
      nav.style.transform = 'translateX(-200%)';
    });
  });
};

const createCityButton = city => {
  const button = document.createElement('button');
  button.classList.add('header__nav--recent-cities-city');
  button.textContent = city;
  recentCities.appendChild(button);
};

window.addEventListener('load', getRecentCities());
