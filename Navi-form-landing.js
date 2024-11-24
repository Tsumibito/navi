document.addEventListener("DOMContentLoaded", function(){
 function isCookieModalVisible() {
   const cookieModal = document.querySelector('.cf_modal');
   return cookieModal && window.getComputedStyle(cookieModal).display !== 'none';
 }

 function reInitKwigaForm() {
   const modal = document.getElementById("contact-modal");
   const oldScript = modal.querySelector('script[src*="kwiga.com"]');
   if (oldScript) {
     oldScript.remove();
   }
   const newScript = document.createElement('script');
   newScript.type = 'module';
   newScript.src = 'https://kwiga.com/build/js/kwiga-widget.js?t=1732351704000&uuid=8a095c24-4119-47e0-bd17-1f107c313507&producer=https://kwiga.com/';
   modal.appendChild(newScript);
 }

 function openModal(){
   if (isCookieModalVisible()) return;
   var modalBg = document.getElementById("contact_modal_bg"),
       modal = document.getElementById("contact-modal");
   
   if(!modalBg || !modal) return;
   
   modalBg.style.display = "flex";
   modalBg.style.opacity = "0";
   modalBg.style.transition = "opacity 0.5s ease";
   setTimeout(function(){ 
     modalBg.style.opacity = "1";
     reInitKwigaForm(); // Переинициализация формы при открытии
   }, 10);
   
   modal.style.transform = "translateY(100%)";
   modal.style.transition = "transform 0.5s ease";
   setTimeout(function(){ modal.style.transform = "translateY(0)" }, 10);
 }

 function closeModal(){
   var modalBg = document.getElementById("contact_modal_bg"),
       modal = document.getElementById("contact-modal");
       
   if(!modalBg || !modal) return;
   
   modalBg.style.opacity = "0";
   modal.style.transform = "translateY(100%)";
   
   setTimeout(function(){ 
     modalBg.style.display = "none";
   }, 500);
 }

 var openButtons = document.querySelectorAll('[Role="formbutton"]');
 openButtons.forEach(function(button){
   button.addEventListener("click", function(e) {
     e.preventDefault();
     openModal();
   });
 });

 var closeButtons = document.querySelectorAll('[Role="formclosebutton"]');
 closeButtons.forEach(function(button){
   button.addEventListener("click", closeModal);
 });
});
