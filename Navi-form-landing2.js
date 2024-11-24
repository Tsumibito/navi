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
     newScript.src = oldScript.src + '&t=' + Date.now(); // Добавляем временную метку
     oldScript.remove();
     modal.appendChild(newScript);
   }
 }

 function openModal(){
   if (isCookieModalVisible()) return;
   var modalBg = document.getElementById("contact_modal_bg"),
       modal = document.getElementById("contact-modal");
   
   if(!modalBg || !modal) return;
   
   const scrollY = window.scrollY;
   modalBg.style.display = "flex";
   modalBg.style.opacity = "0";
   modalBg.style.transition = "opacity 0.5s ease";
   
   setTimeout(function(){ 
     modalBg.style.opacity = "1";
     if (navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Mobile')) {
       reloadKwigaScript();
     }
     // Сохраняем позицию скролла
     document.body.style.position = 'fixed';
     document.body.style.top = `-${scrollY}px`;
     document.body.style.width = '100%';
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
     // Восстанавливаем позицию скролла
     const scrollY = parseInt(document.body.style.top || '0');
     document.body.style.position = '';
     document.body.style.top = '';
     document.body.style.width = '';
     window.scrollTo(0, Math.abs(scrollY));
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
