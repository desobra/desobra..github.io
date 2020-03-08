document.addEventListener("DOMContentLoaded", function(){
      var url = window.location.href
    $('head').append(`<meta property="og:url" content="${url}" />`);

	var vars = url.split('#')
	var container_fragment = null

	if (vars.length > 1) {
		container_fragment = document.getElementById(vars[1]+'-target')
	} else {
		container_fragment = document.getElementsByClassName('card-container')[1]
	}

    var fragment = container_fragment.getElementsByTagName("p")[0].innerHTML
    $('head').append(`<meta property="og:description" content="${fragment}" />`);
});



