const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')

let slideIndex = 1;

const isVisible = (item) => item.className !== "hidden";

setInterval(() =>{
    for(let i =0; i< slides.length; i++) {
     
            if(isVisible(slides[i]) && i === slideIndex){
                slides[i].classList.remove("hidden")
            }
            else{
                slides[i].classList.add('hidden')

            }

      
    }
    if(slideIndex == slides.length){
        slideIndex = 0
        slides[slideIndex].classList.remove("hidden")
    }
    slideIndex++    
},2000)

    

nextBtn.addEventListener('click', () =>{

    for(let i =0; i< slides.length; i++) {
        
        if(isVisible(slides[i]) && i === slideIndex){
            slides[i].classList.remove("hidden")
        }
        else{
            slides[i].classList.add('hidden')

        }
    }
    if(slideIndex == slides.length){
        slideIndex = 0
        slides[slideIndex].classList.remove("hidden")
    }
    slideIndex++
    
})
prevBtn.addEventListener('click', () =>{
    for(let i =0; i < slides.length; i++) {
        
        if(isVisible(slides[i]) && i === slideIndex){
            slides[i].classList.remove("hidden")
        }
        else{
            slides[i].classList.add('hidden')
            
        }
    }
    slideIndex--
 
})