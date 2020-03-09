document.addEventListener("DOMContentLoaded", function(){
	document.getElementById('open-it').click();

	var close = function(e) {
	    e.stopPropagation()
		e.preventDefault()
		window.open('/punctum',"_self");
	};

	Array.from(document.getElementsByClassName("lg-close"))
	.forEach(function(element) {
      element.addEventListener('click', close);
    });
});