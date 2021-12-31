let cur = document.querySelector('.cursor');
window.addEventListener('mousemove',(e)=>{
    cur.style.top = e.pageY + 'px';
    cur.style.left = e.pageX + 'px';
})
var accordions = document.querySelectorAll('.accordion');

accordions.forEach((acc)=>{
    acc.addEventListener('click',function () {
        
        accordions.forEach(
            (acc)=>{
                if(this === acc){
                    this.classList.add('active')
                }
                else{
                    acc.classList.remove('active')
                }
            }
        )
        
      })
    
})

function menuToggle(ele){
    ele.classList.toggle('active')
    document.getElementById('menu').classList.toggle('active')
}

var navLinks = document.querySelectorAll('.m-link')
console.log(navLinks)
navLinks.forEach(nav =>{
    nav.addEventListener('mouseover',()=>{
        console.log('grow')
        cur.classList.add('large')
    })
    nav.addEventListener('mouseleave',()=>{
        cur.classList.remove('large')
    })
})
var msg = document.querySelector('.cursor span');

var dlinks = document.querySelectorAll('.d-link[data-hover]');
dlinks.forEach(link =>{
    link.addEventListener('mouseover',(e)=>{
        msg.innerHTML = link.getAttribute('data-hover')
        cur.classList.add('visible')
        cur.classList.add('large')
        
    })
    link.addEventListener('mouseleave',(e)=>{
        msg.innerHTML =""
        
        cur.classList.remove('visible')
        cur.classList.remove('large')
        
    })
})

// gsap.registerPlugin(CSSRulePlugin);

// var hbef = CSSRulePlugin.getRule('.hero .name::before');
// var haft = CSSRulePlugin.getRule('.hero .name::after');
// //gsap.from(".hero .name",{opacity:0,y:-50,duration:2})
//     gsap.from(hbef,{y:170,duration:1,})
//     gsap.from(haft,{y:-60,duration:1,delay:0.2})