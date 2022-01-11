const pointers=document.getElementById("pointers");
pointers.innerHTML="";
let imgsShow=["gifs.gif","hgif.gif","aprende.jpg","puma.webp","now.jpg","udemi.png"];
document.getElementById("imgsSlide").src="img/"+imgsShow[0];
let cursores=document.createElement("div");
var i=0;
let time=4500;
cursores.id="cursores";

for(var f=0;f<imgsShow.length;f++){
    let span=document.createElement("span");
    cursores.append(span)
}
pointers.append(cursores);
var items= Array.from(document.querySelectorAll("#cursores > span"));
document.querySelectorAll("#cursores > span")[0].setAttribute("class","active");

items.map(el =>{
    el.addEventListener("click",function(){
        for(var a=0;a<items.length;a++){
            items[a].setAttribute("class","");
        }
        clearInterval(intervalo);
        i=items.indexOf(el);
        document.getElementById("imgsSlide").src="img/"+imgsShow[i];
        el.setAttribute("class","active");
        intervalo=setInterval(() => {
            slide();
        }, time);
    })
})

intervalo=setInterval(() => {
    slide();
}, time);

document.querySelector(".bgImage .nextShow").addEventListener("click",function(){
    if(i>=0 && i<imgsShow.length){
        if(i===imgsShow.length-1){
            i=0;
        }else{
            i=i+1;
        }
    }else{
        i=0;
    }
    console.log(i)
    for(var a=0;a<items.length;a++){
        items[a].setAttribute("class","");
    }
    document.getElementById("imgsSlide").src="img/"+imgsShow[i];
    document.querySelectorAll("#cursores > span")[i].setAttribute("class","active");
    
    clearInterval(intervalo);
    intervalo=setInterval(() => {
        slide();
    }, time);
});

document.querySelector(".bgImage .prevShow").addEventListener("click",function(){
    // clearInterval(intervalo);
    console.log(i)
    if(i>0){
        if(i>=imgsShow.length){
            i=0;
        }else{
            i=i-1;
        }
    }else{
        i=imgsShow.length-1;
    }
    console.log(i)
    for(var a=0;a<items.length;a++){
        items[a].setAttribute("class","");
    }
    document.getElementById("imgsSlide").src="img/"+imgsShow[i];
    document.querySelectorAll("#cursores > span")[i].setAttribute("class","active");
    clearInterval(intervalo);
    intervalo=setInterval(() => {
        slide();
    }, time);
});
document.getElementById("loggin").addEventListener("click",function() {
   document.getElementById("modal-login").style.display="flex";
   setTimeout(() => {
      document.querySelector("#modal-login .content-form").style.transform="scale(1)";
   }, 50);
})
document.getElementById("modal-login").addEventListener("click",function(e){
   e.stopPropagation()
   if(e.target===this){
      e.target.style.display="none";
      setTimeout(() => {
         document.querySelector("#modal-login .content-form").style.transform="scale(.5)";
      }, 50);
   }
})

function slide(){
    if(i===imgsShow.length-1){
        i=0;
    }else{
        i=i+1;
    }
    for(var a=0;a<items.length;a++){
        items[a].setAttribute("class","");
    }
    document.getElementById("imgsSlide").src="img/"+imgsShow[i];
    document.querySelectorAll("#cursores > span")[i].setAttribute("class","active");
}