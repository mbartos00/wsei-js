const slides = document.querySelectorAll('.slide');
const slideItem = document.querySelectorAll('.slide-item');
const slideshowContainer = document.querySelector('.slideshow-container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dots = document.getElementsByClassName('dot');
const stopBtn = document.querySelector('.stop-btn');
const startBtn = document.querySelector('.start-btn');
const closeBtn = document.querySelector('.close-btn');
let slideIndex = 1;
const isVisible = (item) => item.className !== 'hidden';

const startSlider = () => {
  for (let i = 0; i < slides.length; i++) {
    if (isVisible(slides[i]) && i === slideIndex) {
      slides[i].classList.remove('hidden');
      dots[i].classList.add('active');
    } else {
      slides[i].classList.add('hidden');
      dots[i].classList.remove('active');
    }
  }
  if (slideIndex == slides.length) {
    slideIndex = 0;
    slides[slideIndex].classList.remove('hidden');
    dots[slideIndex].classList.add('active');
  }

  slideIndex++;
};
const interval = setInterval(startSlider, 3000);

slideItem.forEach((item) => {
  if (item.getAttribute('src')) {
    item.addEventListener('click', () => {
      slideshowContainer.classList.add('shown');
      closeBtn.classList.add('shown');
      clearInterval(interval);
    });
  }
});
closeBtn.addEventListener('click', () => {
  slideshowContainer.classList.remove('shown');
  setInterval(startSlider, 3000);
  closeBtn.classList.remove('shown');
});
stopBtn.addEventListener('click', () => clearInterval(interval));
startBtn.addEventListener('click', () => setInterval(startSlider, 3000));

nextBtn.addEventListener('click', () => {
  for (let i = 0; i < slides.length; i++) {
    if (isVisible(slides[i]) && i === slideIndex) {
      slides[i].classList.remove('hidden');
    } else {
      slides[i].classList.add('hidden');
    }
  }
  if (slideIndex == slides.length) {
    slideIndex = 0;
    slides[slideIndex].classList.remove('hidden');
  }
  slideIndex++;
});
prevBtn.addEventListener('click', () => {
  for (let i = 0; i < slides.length; i++) {
    if (isVisible(slides[i]) && i === slideIndex) {
      slides[i].classList.remove('hidden');
    } else {
      slides[i].classList.add('hidden');
    }
  }
  slideIndex--;
});
