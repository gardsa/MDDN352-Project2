(function(d){
  function toggleMenuClass() {
    d.body.classList.toggle('slideout-open');
    if (d.body.classList.contains('dropdown-open')) {
      d.body.classList.remove('dropdown-open');
    }
  }
  d.getElementById('menu-icon').addEventListener('click', toggleMenuClass);
  d.getElementById('menu-mask').addEventListener('click', toggleMenuClass);

  function toggleSettingsClass() {
    d.body.classList.toggle('dropdown-open');
    if (d.body.classList.contains('slideout-open')) {
      d.body.classList.remove('slideout-open');
    }
  }
  d.getElementById('settings-icon').addEventListener('click', toggleSettingsClass);
  d.getElementById('settings-mask').addEventListener('click', toggleSettingsClass);
})(document);
