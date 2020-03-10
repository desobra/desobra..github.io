document.addEventListener("DOMContentLoaded", function(){
      var url = window.location.href
    $('head').append(`<meta property="og:url" content="${url}" />`);

	var vars = url.split('#')
	var container_fragment = null

	if (vars.length > 1) {
		container_fragment = document.getElementById(vars[1]+'-target')
		var fragment = container_fragment.getElementsByTagName("p")[0].innerHTML
        $('head').append(`<meta property="og:description" content="${fragment}" />`);
	} else {
		container_fragment = document.getElementsByClassName('card-container')[0]
		var fragment = $(container_fragment).attr("preview");
		$('head').append(`<meta property="og:description" content="${fragment}" />`);
	}
});



