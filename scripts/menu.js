var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 252,
    'tolerance': 70
});

// Toggle button
document.getElementById('menu-icon').addEventListener('click', function() {
  slideout.toggle();
});
