(function(d){
  function toggleMenuClass(){
    d.body.classList.toggle('slideout-open');
  }
  d.getElementById('menu-icon').addEventListener('click', toggleMenuClass);
  d.getElementById('mask').addEventListener('click', toggleMenuClass);
})(document);
