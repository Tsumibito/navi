document.addEventListener('DOMContentLoaded', () => {
 const element = document.getElementById('places-left');
 if(element) {
   setTimeout(() => {
     element.textContent = "Осталось только 9 мест по этой цене";
   }, 3000);
   
   setTimeout(() => {
     element.textContent = "Осталось только 8 мест по этой цене";
   }, 14000);
   
   setTimeout(() => {
     element.textContent = "Осталось только 7 мест по этой цене";
   }, 45000);
 }
});
