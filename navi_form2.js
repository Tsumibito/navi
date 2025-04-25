document.addEventListener("DOMContentLoaded", function(){
  function o(){
    var o=document.getElementById("contact_modal_bg"),
        t=document.getElementById("contact-modal");
    if (o) {
      o.style.display="flex";
      o.style.opacity="0";
      o.style.transition="opacity 0.5s ease";
      setTimeout(function(){o.style.opacity="1"},10);
    }
    if (t) {
      t.style.transform="translateY(100%)";
      t.style.transition="transform 0.5s ease";
      setTimeout(function(){t.style.transform="translateY(0)"},10);
      setTimeout(function(){
        var e=document.getElementById("First-Name");
        e&&e.focus();
      },500);
    }
  }

  function t(){
    var o=document.getElementById("contact_modal_bg"),
        t=document.getElementById("contact-modal");
    if (o) {
      o.style.opacity="1";
      o.style.transition="opacity 0.5s ease";
      o.style.opacity="0";
    }
    if (t) {
      t.style.transform="translateY(0)";
      t.style.transition="transform 0.5s ease";
      t.style.transform="translateY(100%)";
    }
    if (o) {
       setTimeout(function(){o.style.display="none"},500);
    }
  }

  function n(e){
    return e && e.value && e.value.trim().length >= 2 && /^[A-Za-zА-Яа-яЁёІіЄєЇїҐґ]+$/.test(e.value.trim());
  }

  function r(e){
    return e && e.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim());
  }

  function q(){
    return typeof iti !== 'undefined' && iti && iti.isValidNumber();
  }

  var l = {"First-Name": false, "Last-Name": false, "Email": false, "Phone": false};

  function validate(){
    var e = document.getElementById("Phone"),
        t = document.getElementById("First-Name"),
        a = document.getElementById("Last-Name"),
        i = document.getElementById("Email"),
        s = document.getElementById("Error Message"),
        c = document.getElementById("submit button"),
        d = 0;

    if (l["First-Name"] && t) {
      if (!n(t)) {
        d++;
        t.style.border = "1px solid red";
      } else {
        t.style.border = "";
      }
    } else if (t) {
        t.style.border = "";
    }

    if (l["Last-Name"] && a) {
      if (!n(a)) {
        d++;
        a.style.border = "1px solid red";
      } else {
        a.style.border = "";
      }
    } else if (a) {
        a.style.border = "";
    }

    if (l["Email"] && i) {
      if (!r(i)) {
        d++;
        i.style.border = "1px solid red";
      } else {
        i.style.border = "";
      }
    } else if (i) {
        i.style.border = "";
    }

    if (l["Phone"] && e) {
      if (!q()) {
        d++;
        e.style.border = "1px solid red";
      } else {
        e.style.border = "";
      }
    } else if (e) {
       e.style.border = "";
    }

    var allRelevantFieldsValid = Object.keys(l).every(function(key) {
        var element = document.getElementById(key);
        if (!element || l[key] === false) return true;

        if (key === "Phone") {
            return q();
        } else if (key === "Email") {
            return r(element);
        } else {
            return n(element);
        }
    });


    if (s) {
        s.style.display = (d > 0) ? "block" : "none";
    }

    if (c) {
        if (d === 0 && allRelevantFieldsValid && Object.values(l).some(function(v){return v})) {
             c.disabled = false;
             c.style.opacity = "1";
        } else {
             c.disabled = true;
             c.style.opacity = "0.5";
        }
    }
  }

  var m = document.querySelectorAll('[Role="formbutton"]');
  m.forEach(function(e){
      if (e) e.addEventListener("click", o);
  });

  var u = document.querySelectorAll('[Role="formclosebutton"]');
  u.forEach(function(e){
      if (e) e.addEventListener("click", t);
  });

  var h = document.getElementById("utm");
  if (h) {
    var p = new URLSearchParams(window.location.search),
        k = [];
    p.forEach(function(e, n) {
      if (n.startsWith("utm_")) {
        k.push(n + "=" + e);
      }
    });
    h.value = k.join(",");
  }

  var g = ["Phone", "First-Name", "Last-Name", "Email"];

  g.forEach(function(fieldId){
    var element = document.getElementById(fieldId);
    if (element) {
      ["blur", "change", "keyup"].forEach(function(eventType){
        element.addEventListener(eventType, function(){
          l[fieldId] = true;
          validate();
        });
      });
    }
  });

   validate();


  var f = document.getElementById("Phone");
  var iti;

  if (f) {
    iti = intlTelInput(f, {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
          .then(function(response) {
            if (!response.ok) {
               throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then(function(data) {
            callback(data.country_code);
          })
          .catch(function(error) {
            console.error("Ошибка гео-локации:", error);
            callback("US");
          });
      },
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    f.addEventListener("countrychange", function() {
      validate();
    });
    f.addEventListener("input", function() {
       validate();
    });

     f.addEventListener("blur", function() {
        l["Phone"] = true;
        validate();
     });
  }

  var b = document.getElementById("ip");
  if (b) {
    fetch("https://api.ipify.org?format=json")
      .then(function(response){
         if (!response.ok) {
            throw new Error("HTTP error " + response.status);
         }
         return response.json();
      })
      .then(function(data){b.value = data.ip;})
      .catch(function(error){console.error("Ошибка при получении IP-адреса:", error)});
  }

  var y = document.getElementById("url");
  if (y) {
    y.value = window.location.origin + window.location.pathname;
  }

   validate();
});
