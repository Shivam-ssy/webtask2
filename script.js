gsap.registerPlugin(Observer)
let currentItemIndex=0;
let owl;
let isAnimating=false;
const pages=document.querySelectorAll(".pages")
const svg=document.getElementById("transring");
const leftPageSide=document.querySelectorAll(".left-part")
const pageHeading=document.querySelectorAll(".page-heading")
svg.style.backgroundColor=window.getComputedStyle(leftPageSide[currentItemIndex]).backgroundColor
function removeHeading(){
  pageHeading.forEach((heading)=>{
    heading.style.display="none"
  })
}
removeHeading()
function forDesktop(){
  $(document).ready(function(){
       owl = $('.main').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        items: 1,
        rewind: true,
        autoplay: false,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp',
        dots: false,
        mouseDrag: false,
        touchDrag: true
      });
    
      owl.on('changed.owl.carousel', function(event) {
        currentItemIndex = event.item.index;
        console.log("Current visible item index:", currentItemIndex);
      });
    });
    
    Observer.create({
      target: window, // can be any element (selector text is fine)
      type: "wheel,touch", // comma-delimited list of what to listen for
      onUp: () => !isAnimating && previous(),
      onDown: () =>!isAnimating && next(),
    });
  }
  forDesktop()
  function showProgessContent(i){
    let temp=i*150;
    svg.style.backgroundColor=window.getComputedStyle(leftPageSide[i]).backgroundColor
    document.getElementById("Opaque_Ring").style.strokeDasharray=temp+','+1000;
    
}
    function next(){
      showProgessContent(currentItemIndex)
      removeHeading()
      pageHeading[currentItemIndex].style.display="inline-block"

      owl.trigger('to.owl.carousel', [currentItemIndex + 1, 300]);
      animation()
        
    }
    function previous(){
      showProgessContent(currentItemIndex)
      removeHeading()
      pageHeading[currentItemIndex].style.display="inline-block"
      owl.trigger('to.owl.carousel', [currentItemIndex - 1, 300]);

       animation()
    }
   function animation(){
     isAnimating=true;
     let windowWidth=window.innerWidth;
    if(windowWidth>766){

        // gsap.registerPlugin(ScrollTrigger);
        pages.forEach((page,index)=>{
            // let currentPage= `#page${index+1}`
            // let currentText= `.page${index+1}-text`;
            // let currentImage=`.page${index+1}-image`
            gsap.from(page.querySelectorAll(".page-text"),{
                opacity:0,
                duration: 1, 
                y: 50, 
                stagger:0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: page,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'restart none none reverse',
                    repeat: -1
                  },
                
                
            })
            gsap.from(page.querySelectorAll(".page-image"),{
                opacity:0,
                duration: 1, 
                y: 50, 
                stagger:0.3,
                delay:0.5,
                ease: "power2.out", 
                scrollTrigger: {
                    trigger: page,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'restart none none reverse',
                    repeat: -1
                  },
            })
        })
       
    }
    else{
        return 0;
    }

      setTimeout(() => {
        isAnimating=false;
    }, 2000); 
   }
function formobile(){
  let windowWidth=window.innerWidth;

  if(windowWidth <= 766){
    $(document).ready(function(){
      $('.main').owlCarousel({
        loop:true,
        margin:10,
        dots:true,
        items:1,
      });
    });
  }
}
formobile();