var bgImg=document.querySelector(".imgP .img");
var imgBg=document.querySelector(".imgP .cap");
var over=document.querySelector(".imgP .view_cover");
var imageOver=document.querySelector("#img_view_over");
var image=document.querySelector("#img_viewer");
let cover=document.querySelector(".imgP .float_cover");
let mousover="init";


imgBg.addEventListener("contextmenu",function(e){
   e.preventDefault();
})
imgBg.addEventListener("mouseover",function(e){
   mousover="in";
})
cover.addEventListener("mouseover",function(e){
   mousover="in";
})
imgBg.addEventListener("mouseout",function(e){
   mousover="out";
})

cover.addEventListener("mousemove",function(e){
   overImgae(e.pageX,e.pageY);
   over.style.display="block";
})
   
// funcion desactivada
document.body.addEventListener("mousemove",function(e){
   var m=0;
   var soles=0;
   overImgae(e.pageX,e.pageY);
   over.style.display="block";
   
   if((e.pageX>(getOffset(imgBg).left-m) && e.pageX<(getOffset(imgBg).left+getOffset(imgBg).width+m))){
      soles=1;
   }else if((e.pageY>(getOffset(imgBg).top-m) && e.pageY<(getOffset(imgBg).top+getOffset(imgBg).height+m))){
      soles=1;
   }else{
      soles=0;
   }
   if((e.pageX>(getOffset(imgBg).left-m) && e.pageX<(getOffset(imgBg).left+getOffset(imgBg).width+m)) && 
      (e.pageY>(getOffset(imgBg).top-m) && e.pageY<(getOffset(imgBg).top+getOffset(imgBg).height+m))){
      soles=1;
   }else{
      soles=0;
   }
   if(soles===0){
      cover.style=`
         visibility: hidden;
         left: -1000%;
         top: -1000%;
      `;
      over.style.display="none";
   }
   
})
var items_thumb=Array.from(document.querySelectorAll("#thumbnails .item"));
items_thumb.map(el =>{
   el.addEventListener("click",function(){
      for(var i=0;i<items_thumb.length;i++){
         items_thumb[i].setAttribute("class","item");
      }
      el.setAttribute("class","item active")
      image.setAttribute("src",el.querySelector("img").src);
      imageOver.setAttribute("src",el.querySelector("img").src);
   })
})

eventMultiElements(document.querySelectorAll(".color_cloth .item"))
eventMultiElements(document.querySelectorAll("#dash .sist"),"sist",document.querySelector("#dash .selected"))
eventMultiElements(document.querySelectorAll("#sourt .sist"),"sist",document.querySelector("#sourt .selected"))

function eventMultiElements(nodeList,todle="item",el_change,event="click"){
   var array_elements=Array.from(nodeList);
   array_elements.map(el =>{
      el.addEventListener(event,function(){
         for(var i=0;i<array_elements.length;i++){
            array_elements[i].setAttribute("class",todle);
         }
         el.setAttribute("class",todle+" active")
         el_change.textContent=el.textContent;
      })
   })
}
function overImgae(x,y){
   var ex;
   var ey;
   if(x>getOffset(bgImg).left+(getOffset(bgImg).width-getOffset(cover).width) || 
   y>getOffset(bgImg).top+(getOffset(bgImg).height-getOffset(cover).height)){
      if(x>getOffset(bgImg).left+(getOffset(bgImg).width-getOffset(cover).width)){
         ex=getOffset(bgImg).width-getOffset(cover).width;
         ey=y-getOffset(bgImg).top;
      }else if(y>getOffset(bgImg).top+(getOffset(bgImg).height-getOffset(cover).height)){
         ey=getOffset(bgImg).height-getOffset(cover).height;
         ex=x-getOffset(bgImg).left;
      }
      if(x>getOffset(bgImg).left+(getOffset(bgImg).width-getOffset(cover).width) && y>getOffset(bgImg).top+(getOffset(bgImg).height-getOffset(cover).height)){
         ex=getOffset(bgImg).width-getOffset(cover).width;
         ey=getOffset(bgImg).height-getOffset(cover).height;
      }
   }else{
      ex=x-getOffset(bgImg).left;
      ey=y-getOffset(bgImg).top;
   }  
   cover.style=`
      visibility: visible;
      left: ${ex}px;
      top: ${ey}px;
   `;
   var ratio=bgImg.getBoundingClientRect().width/cover.getBoundingClientRect().width;
   var overWidth=ratio*bgImg.getBoundingClientRect().width+"px";
   var valX=-1*ratio*ex;
   var valY=-1*ratio*ey;
   imageOver.style=`
      width: ${overWidth};
      left: ${valX}px;
      top: ${valY}px;
   `;
}
function getOffset(el) {
   const rect = el.getBoundingClientRect();
   return {
      width: rect.width,
      height: rect.height,
      top: rect.top + window.scrollY,
      right: document.body.scrollWidth - (rect.left + rect.width),
      bottom: document.body.scrollHeight - (rect.top + rect.height),
      left: rect.left + window.scrollX
   };
}
function dibujar(object,separate=0,grosor=1,inside=true){
   var spans=[];
   var sm=separate;
   var coords=getOffset(object);
   for(var i=0;i<4;i++){
      var span=document.createElement("span");
      spans.push(span);
   }
   var css=`
      display: block;
      position: absolute;
      background: red;
      `;
   spans[0].style=`
      ${css}
      top: ${coords.top-sm}px;
      left: ${coords.left-sm}px;
      width: ${grosor+sm}px;
      height: ${coords.height+sm*2}px;
   `;
   spans[1].style=`
      ${css}
      top: ${coords.top-sm}px;
      left: ${coords.left-sm}px;
      width: ${coords.width+sm*2}px;
      height: ${grosor}px;
   `;
   spans[2].style=`
      ${css}
      top: ${coords.top+coords.width+sm}px;
      left: ${coords.left-sm}px;
      width: ${coords.width+sm*2}px;
      height: ${grosor}px;
   `;
   spans[3].style=`
      ${css}
      top: ${coords.top-sm}px;
      left: ${coords.left+coords.width+sm}px;
      width: ${grosor}px;
      height: ${coords.height+sm*3}px;
   `;
   for(var i=0;i<4;i++){
      document.body.append(spans[i]);
   }
}
//  dibujar(imgBg,0,2)

// Cantidad de unidades del producto
let max_choose=13;
let init_qte=1;
let min_choose=2;
let plus=document.getElementById("plus");
let minus=document.getElementById("minus");
let show_number=document.getElementById("chifre");
minus.addEventListener("click",function(e){
   if(init_qte>1){
      init_qte--;
      if(init_qte===1){
         e.target.style.cursor="not-allowed";
         e.target.style.color="rgba(51,51,51,.4)";
      }
   }
   plus.style.cursor="pointer";
   plus.style.color="rgb(51,51,51)";
   show_number.textContent=init_qte;
})
plus.addEventListener("click",function(e){
   if(init_qte>=0){
      if(max_choose>0){
         if(init_qte===max_choose){
            e.target.style.cursor="not-allowed";
            e.target.style.color="rgba(51,51,51,.4)";
         }else{
            if(init_qte>5){
               fade(document.querySelector("#toolHover"))
            }
            init_qte++;
            if(init_qte===max_choose){
               e.target.style.color="rgba(51,51,51,.4)";
               e.target.style.cursor="not-allowed";
            }
            minus.style.color="rgba(51,51,51)";
            minus.style.cursor="pointer";
         }
      }else{
         if(init_qte>5){
            fade(document.querySelector("#toolHover"))
         }
         init_qte++;
         minus.style.cursor="pointer";
      } 
   }
   
   show_number.textContent=init_qte;
})

function fade(el,tim=4000){
   if(typeof timeout!=="undefined"){
      clearTimeout(timeout)
   }
   if(typeof timer!=="undefined"){
      clearInterval(timer)
   }
   if(typeof tist!=="undefined"){
      clearTimeout(tist)
   }
   el.style.display="inline-block";
   setTimeout(() => {
      el.style.opacity=1;
   }, 100);
   timeout=setTimeout(() => {
      el.style.opacity = 0;
   }, tim);
   timer=setInterval(() => {
      if(el.style.opacity==="0"){
         tist=setTimeout(() => {
            el.style.display = "none";
         }, 1000);
         clearInterval(timer)
      }
   }, 200);
}
var desc=document.querySelector(".descript-article");
var quadle=document.querySelector(".article-view");
window.addEventListener("scroll",function(){
   var fixed=quadle.querySelector(".imgs-article");
   if(getOffset(fixed).height < getOffset(desc).height){
      if(window.scrollY<getOffset(quadle).top){
         fixed.style=`
            position: static;
         `;
      }else if(window.scrollY>=getOffset(quadle).top && 
      window.scrollY<(getOffset(quadle).top+getOffset(quadle).height-80)-getOffset(fixed).height){
         fixed.style=`
            position: fixed;
            top: 40px;
            left: ${getOffset(fixed).left}px;
         `;
      }else{
         console.log(getOffset(fixed).left)
         fixed.style=`
            position: absolute;
            top: ${(getOffset(quadle).top+getOffset(quadle).height-80)-getOffset(fixed).height}px;
         `;
      }
      
   }
})