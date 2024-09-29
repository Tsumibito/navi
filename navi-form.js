
document.addEventListener("DOMContentLoaded",function(){
  function o(){
    var o=document.getElementById("contact_modal_bg"),
        t=document.getElementById("contact-modal");
    o.style.display="flex",
    o.style.opacity="0",
    o.style.transition="opacity 0.5s ease",
    setTimeout(function(){o.style.opacity="1"},10),
    t.style.transform="translateY(100%)",
    t.style.transition="transform 0.5s ease",
    setTimeout(function(){t.style.transform="translateY(0)"},10),
    setTimeout(function(){
      var e=document.getElementById("First-Name");
      e&&e.focus()
    },500)
  }
  function t(){
    var o=document.getElementById("contact_modal_bg"),
        t=document.getElementById("contact-modal");
    o.style.opacity="1",
    o.style.transition="opacity 0.5s ease",
    o.style.opacity="0",
    t.style.transform="translateY(0)",
    t.style.transition="transform 0.5s ease",
    t.style.transform="translateY(100%)",
    setTimeout(function(){o.style.display="none"},500)
  }
  function n(e){
    return e&&e.value.trim().length>=2&&/^[A-Za-zА-Яа-яЁё]+$/.test(e.value.trim())
  }
  function r(e){
    return e&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim())
  }
  function q(){
    return iti&&iti.isValidNumber()
  }
  var l={"First-Name":false,"Last-Name":false,"Email":false,"Phone":false};
  function validate(){
    var e=document.getElementById("Phone"),
        t=document.getElementById("First-Name"),
        a=document.getElementById("Last-Name"),
        i=document.getElementById("Email"),
        s=document.getElementById("Error Message"),
        c=document.getElementById("submit button"),
        d=0;
    if(l["First-Name"]){
      if(!n(t)){
        d++,
        t.style.border="1px solid red";
      }
      else{
        t.style.border=""
      }
    }
    if(l["Last-Name"]){
      if(!n(a)){
        d++,
        a.style.border="1px solid red";
      }
      else{
        a.style.border=""
      }
    }
    if(l["Email"]){
      if(!r(i)){
        d++,
        i.style.border="1px solid red";
      }
      else{
        i.style.border=""
      }
    }
    if(l["Phone"]){
      if(!q()){
        d++,
        e.style.border="1px solid red";
      }
      else{
        e.style.border=""
      }
    }
    if(d>0 && Object.values(l).some(function(v){return v})){
      s&&(s.style.display="block"),
      c&&(c.disabled=true,c.style.opacity="0.5");
    }
    else{
      s&&(s.style.display="none"),
      c&&(Object.values(l).every(function(v){return v}) ? (c.disabled=false,c.style.opacity="1") : (c.disabled=true,c.style.opacity="0.5"));
    }
  }
  var m=document.querySelectorAll('[Role="formbutton"]');
  m.forEach(function(e){e.addEventListener("click",o)});
  var u=document.querySelectorAll('[Role="formclosebutton"]');
  u.forEach(function(e){e.addEventListener("click",t)});
  var h=document.getElementById("utm");
  if(h){
    var p=new URLSearchParams(window.location.search),
        k=[];
    p.forEach(function(e,n){
      if(n.startsWith("utm_")){k.push(n+"="+e)}
    }),
    h.value=k.join(",")
  }
  var g=["Phone","First-Name","Last-Name","Email"];
  g.forEach(function(e){
    var t=document.getElementById(e);
    if(t){
      ["blur","change","keyup"].forEach(function(o){
        t.addEventListener(o,function(){
          l[e]=true;
          validate();
        })
      })
    }
  });
  validate();
  var f=document.getElementById("Phone");
  if(f){
    var iti=intlTelInput(f,{
      initialCountry:"auto",
      geoIpLookup:function(o){
        fetch("https://ipapi.co/json")
          .then(function(e){return e.json()})
          .then(function(e){o(e.country_code)})
          .catch(function(){o("US")})
      },
      utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    f.addEventListener("countrychange",function(){
      f.value=iti.getNumber();
      validate();
    });
    f.addEventListener("input",function(){
      f.value=iti.getNumber();
      validate();
    });
  }
  var b=document.getElementById("ip");
  if(b){
    fetch("https://api.ipify.org?format=json")
      .then(function(e){return e.json()})
      .then(function(e){b.value=e.ip})
      .catch(function(e){console.error("Ошибка при получении IP-адреса:",e)})
  }
  var y=document.getElementById("url");
  if(y){
    y.value=window.location.origin+window.location.pathname
  }
});

