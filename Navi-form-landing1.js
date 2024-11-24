document.addEventListener("DOMContentLoaded", function(){
 function isCookieModalVisible() {
   const cookieModal = document.querySelector('.cf_modal');
   return cookieModal && window.getComputedStyle(cookieModal).display !== 'none';
 }

 function reInitKwigaForm() {
   return new Promise((resolve) => {
     const modal = document.getElementById("contact-modal");
     const container = modal.querySelector('[data-kwiga-container]') || modal;
     
     // Очищаем контейнер
     container.innerHTML = '';
     
     // Создаем новый контейнер если нужно
     const formContainer = document.createElement('div');
     formContainer.setAttribute('data-kwiga-container', '');
     container.appendChild(formContainer);

     // Создаем новый скрипт
     const newScript = document.createElement('script');
     newScript.type = 'module';
     newScript.src = 'https://kwiga.com/build/js/kwiga-widget.js?t=' + Date.now() + 
                     '&uuid=8a095c24-4119-47e0-bd17-1f107c313507&producer=https://kwiga.com/';
     
     newScript.onload = () => resolve();
     newScript.onerror = () => resolve();
     
     container.appendChild(newScript);
   });
 }

 async function openModal(){
   if (isCookieModalVisible()) return;
   var modalBg = document.getElementById("contact_modal_bg"),
       modal = document.getElementById("contact-modal");
   
   if(!modalBg || !modal) return;
   
   await reInitKwigaForm();
   
   modalBg.style.display = "flex";
   modalBg.style.opacity = "0";
   modalBg.style.transition = "opacity 0.5s ease";
   setTimeout(function(){ 
     modalBg.style.opacity = "1";
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
     const container = modal.querySelector('[data-kwiga-container]');
     if (container) {
       container.innerHTML = '';
     }
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
