let currentItemIndex = 0;
let isAnimating = false;
const pages = document.querySelectorAll(".pages");
const svg = document.getElementById("transring");
const leftPageSide = document.querySelectorAll(".left-part");
const pageHeading = document.querySelectorAll(".page-heading");
const main= document.getElementsByClassName('main')
let windowSize=window.innerWidth;
//to get the correct page heading first we remove the heading
function removeHeading() {
  pageHeading.forEach((heading) => {
    heading.style.display = "none";
  });
}

//for the circle progress
window.addEventListener('resize',()=>{
  windowSize=window.innerWidth
})
function showProgessContent(i) {
  let temp = (i * 150)-(i*15);
  svg.style.backgroundColor = window.getComputedStyle(leftPageSide[i]).backgroundColor;
  document.getElementById("Opaque_Ring").style.strokeDasharray = `${temp},1000`;
}

// goes to specific page
function scrollPageTo(j) {
  let pageno = `#page${j}`;
  // pageno.toString()
  let target = document.querySelector(pageno);
  console.log(pageno);
  if (target) {
    
    window.scrollTo({
      top: target.offsetTop,
      behavior: "instant",
    });
  }
}
function scrollsContainer(i){
  
  if(windowSize>766){
      scrollPageTo(i+1)
      animation();
        // pageHeading[i].style.display = "inline-block";
        showProgessContent(i)
    }
    
}


function next() {
  // showProgessContent(currentItemIndex + 1);
  // removeHeading();
  console.log(currentItemIndex);
  if (currentItemIndex <= 6) {
    if(currentItemIndex<6){
      currentItemIndex += 1;
   
    }
 scrollsContainer(currentItemIndex)
  }
  
}
function previous() {
  // showProgessContent(currentItemIndex);
  // removeHeading();
  console.log(currentItemIndex)
//   pageHeading[currentItemIndex].style.display = "inline-block";
  if (currentItemIndex >= 0) {
    if(currentItemIndex>=1){
      currentItemIndex -= 1;
      
    } 
    scrollsContainer(currentItemIndex)
   }

}
function animation() {
  isAnimating = true;
  let windowWidth = windowSize;
  if (windowWidth > 766) {
    pages.forEach((page, index) => {
      gsap.from(page.querySelectorAll(".page-text"), {
        opacity: 0,
        duration: 1,
        y: 50,
        stagger: 0.3,
        ease: "power2.out",
       
      });
      gsap.from(page.querySelectorAll(".page-image"), {
        opacity: 0,
        duration: 1,
        y: 50,
        stagger: 0.3,
        delay: 0.5,
        ease: "power2.out",
      });
    });
  } else {
    return 0;
  }

  setTimeout(() => {
    isAnimating = false;
  }, 2000);
}

function forDesktop() {
  if(windowSize>766){
    window.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        if(e.deltaY>0 && !isAnimating){
          next()
        }
       else if(e.deltaY <0 && !isAnimating){
        previous()
       }
      },
      { passive: false }
    );
  
   
  }
}
function forMobile(){
  const mainId=document.getElementById("main")
  // const navDot=document.getElementById('mob-dots')
  let slide=false;
  
  if(windowSize<=766 && main  ){
    mainId.classList.add("owl-carousel")
    mainId.classList.add("owl-theme")
    // navDot.classList.add("owl-dots")
      $(document).ready(function(){
        let owl= $(".owl-carousel")
       owl.owlCarousel({
          items: 1,
          loop: true,
          dots: true,
          dotData: true,
          
        });
        const sliding=()=>{
          slide=true;
          setTimeout(()=>{
            slide=false;
          },1000)
        }
       const slideNext=()=>{
        sliding()
        owl.trigger('next.owl');
       }
       const slidePrev=()=>{
        sliding()
                  owl.trigger('prev.owl');
       }
        window.addEventListener(
          "wheel",
          function (e) {
            e.preventDefault();
            if(e.deltaX>0 && !slide){
             slideNext()
            }
           else if(e.deltaX <0 && !slide){
            slidePrev();
           }
          },
        );
      });
  
}
}

window.addEventListener("load", function() {
  forMobile();
  // Code to execute when the page has finished loading
  forDesktop()
  setTimeout(()=>{
    scrollsContainer(currentItemIndex)
  },100)
  
});
