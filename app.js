// app.js
(function(){
  const headerBtn = document.getElementById("headerButton");
  const footerBtn = document.getElementById("footerButton");
  function notify(where){alert("Нажата кнопка: "+where)}
  headerBtn&&headerBtn.addEventListener("click",()=>notify("Header"));
  footerBtn&&footerBtn.addEventListener("click",()=>notify("Footer"));
})();
