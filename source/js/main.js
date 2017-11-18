
(function() {
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function(e) {
      var id = e.target.id;
      var overlay = document.getElementsByClassName(id);
        overlay[0].style.height = "100%";
      setTimeout(function(){
        overlay[0].parentNode.style.display = "none";
      },1000);
    });
  };

})();