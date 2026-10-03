document.addEventListener("DOMContentLoaded",()=>{
if(window.lucide)lucide.createIcons();
const backTop=document.getElementById("backTop");
const menuButton=document.getElementById("menuButton");
const nav=document.getElementById("nav");
const links=[...document.querySelectorAll(".nav-link")];
const indicator=document.querySelector(".nav-indicator");
const sections=[...document.querySelectorAll("main section[id]")];
const form=document.getElementById("contactForm");
const formMessage=document.getElementById("formMessage");
const cursorGlow=document.getElementById("cursorGlow");
const hero=document.querySelector(".hero");
const visual=document.querySelector(".hero-visual");
const processLine=document.querySelector(".process-line");
const loadValue=document.getElementById("loadValue");
const identityPowerScene=document.getElementById("identityPowerScene");
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
function moveIndicator(link){
if(!indicator||window.innerWidth<=760)return;
indicator.style.width=`${link.offsetWidth}px`;
indicator.style.left=`${link.offsetLeft}px`;
}
const initialActive=document.querySelector(".nav-link.active");
if(initialActive)setTimeout(()=>moveIndicator(initialActive),100);
links.forEach(link=>{
link.addEventListener("click",()=>{
links.forEach(item=>item.classList.remove("active"));
link.classList.add("active");
moveIndicator(link);
nav.classList.remove("open");
menuButton.classList.remove("active");
});
});
if(menuButton&&nav){
menuButton.addEventListener("click",()=>{
menuButton.classList.toggle("active");
nav.classList.toggle("open");
});
}
window.addEventListener("scroll",()=>{
if(backTop)backTop.classList.toggle("show",window.scrollY>500);
let current="inicio";
sections.forEach(section=>{
const top=section.offsetTop-150;
if(window.scrollY>=top)current=section.id;
});
const active=links.find(link=>link.getAttribute("href")===`#${current}`);
if(active){
links.forEach(link=>link.classList.remove("active"));
active.classList.add("active");
moveIndicator(active);
}
});
window.addEventListener("resize",()=>{
const active=document.querySelector(".nav-link.active");
if(active)moveIndicator(active);
});
if(backTop){
backTop.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"});
});
}
const revealObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target);
}
});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(element=>{
revealObserver.observe(element);
});
if(identityPowerScene){
const identityObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active");
identityObserver.unobserve(entry.target);
}
});
},{threshold:.28});
identityObserver.observe(identityPowerScene);
}
const counters=document.querySelectorAll("[data-count]");
let countersStarted=false;
const counterSection=document.querySelector(".hero-stats");
if(counterSection){
const counterObserver=new IntersectionObserver(entries=>{
if(entries[0].isIntersecting&&!countersStarted){
countersStarted=true;
counters.forEach(counter=>{
const target=Number(counter.dataset.count);
let current=0;
const duration=1400;
const stepTime=20;
const increment=target/(duration/stepTime);
const timer=setInterval(()=>{
current+=increment;
if(current>=target){
counter.textContent=target;
clearInterval(timer);
}else{
counter.textContent=Math.floor(current);
}
},stepTime);
});
}
},{threshold:.5});
counterObserver.observe(counterSection);
}
if(processLine){
const processObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active");
processObserver.unobserve(entry.target);
}
});
},{threshold:.4});
processObserver.observe(processLine);
}
document.querySelectorAll(".service-card").forEach(card=>{
card.addEventListener("mousemove",event=>{
if(window.innerWidth<900)return;
const rect=card.getBoundingClientRect();
const x=event.clientX-rect.left;
const y=event.clientY-rect.top;
const rotateY=((x/rect.width)-.5)*4;
const rotateX=-((y/rect.height)-.5)*4;
card.style.transform=`translateY(-9px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
card.addEventListener("mouseleave",()=>{
card.style.transform="";
});
});
document.querySelectorAll(".project-card").forEach(card=>{
card.addEventListener("mousemove",event=>{
if(window.innerWidth<900)return;
const rect=card.getBoundingClientRect();
const x=event.clientX-rect.left;
const y=event.clientY-rect.top;
const moveX=((x/rect.width)-.5)*4;
const moveY=((y/rect.height)-.5)*4;
card.style.transform=`translateY(-7px) perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
});
card.addEventListener("mouseleave",()=>{
card.style.transform="";
});
});
if(hero&&visual){
hero.addEventListener("mousemove",event=>{
if(window.innerWidth<900)return;
const x=(event.clientX/window.innerWidth-.5)*12;
const y=(event.clientY/window.innerHeight-.5)*12;
visual.style.transform=`translate(${x}px,${y}px)`;
});
hero.addEventListener("mouseleave",()=>{
visual.style.transform="translate(0,0)";
});
}
if(cursorGlow){
document.addEventListener("mousemove",event=>{
if(window.innerWidth<900)return;
cursorGlow.style.opacity="1";
cursorGlow.style.left=`${event.clientX}px`;
cursorGlow.style.top=`${event.clientY}px`;
});
document.addEventListener("mouseleave",()=>{
cursorGlow.style.opacity="0";
});
}
if(loadValue){
let direction=1;
let load=78;
setInterval(()=>{
load+=direction;
if(load>=92)direction=-1;
if(load<=76)direction=1;
loadValue.textContent=`${load}%`;
},220);
}
const electricScene=document.querySelector(".electric-scene");
if(electricScene){
setInterval(()=>{
const spark=document.createElement("span");
spark.style.position="absolute";
spark.style.width="3px";
spark.style.height="3px";
spark.style.borderRadius="50%";
spark.style.background="#b8cc15";
spark.style.boxShadow="0 0 12px #b8cc15";
spark.style.left=`${Math.random()*90+5}%`;
spark.style.top=`${Math.random()*70+10}%`;
spark.style.zIndex="1";
spark.style.opacity="1";
spark.style.transition="opacity .8s,transform .8s";
electricScene.appendChild(spark);
requestAnimationFrame(()=>{
spark.style.opacity="0";
spark.style.transform="scale(3)";
});
setTimeout(()=>spark.remove(),900);
},650);
}
if(form){
form.addEventListener("submit",event=>{
event.preventDefault();
const button=form.querySelector(".submit-button");
if(!button)return;
const original=button.innerHTML;
button.innerHTML="<span>Enviando solicitud...</span>";
button.disabled=true;
setTimeout(()=>{
button.innerHTML='<span>Solicitud enviada</span><i data-lucide="circle-check"></i>';
if(formMessage){
formMessage.textContent="Gracias. Hemos recibido la información de tu proyecto.";
formMessage.classList.add("show");
}
form.reset();
if(window.lucide)lucide.createIcons();
setTimeout(()=>{
button.innerHTML=original;
button.disabled=false;
if(formMessage)formMessage.classList.remove("show");
if(window.lucide)lucide.createIcons();
},3200);
},900);
});
}
});