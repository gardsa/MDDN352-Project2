(function(d){
  function toggleMenuClass() {
    d.body.classList.toggle('slideout-open');
  }
  d.getElementById('menu-icon').addEventListener('click', toggleMenuClass);
  d.getElementById('menu-mask').addEventListener('click', toggleMenuClass);

  function toggleSettingsClass() {
    d.body.classList.toggle('dropdown-open');
  }
  d.getElementById('settings-icon').addEventListener('click', toggleSettingsClass);
  d.getElementById('settings-mask').addEventListener('click', toggleSettingsClass);
})(document);
