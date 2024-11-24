document.addEventListener("DOMContentLoaded", function(){
 function isCookieModalVisible() {
   const cookieModal = document.querySelector('.cf_modal');
   return cookieModal && window.getComputedStyle(cookieModal).display !== 'none';
 }

 function reloadKwigaScript() {
   const modal = document.getElementById("contact-modal");
   const oldScript = modal.querySelector('script[src*="kwiga.com"]');
   if (oldScript) {
     const newScript = document.createElement('script');
     newScript.type = 'module';
     newScript.src = oldScript.src;
     oldScript.remove();
     modal.appendChild(newScript);
   }
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
     if (navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Mobile')) {
       reloadKwigaScript();
     }
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
