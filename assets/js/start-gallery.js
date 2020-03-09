document.addEventListener("DOMContentLoaded", function(){
 	lightGallery(document.getElementById('lightgallery'));

	var openURl = function(e) {
	    e.stopPropagation()
		e.preventDefault()

		console.log(e.target.attributes.url.value)
		let name = e.target.className
		let postUrl = e.target.attributes.url.value
		let fullPortUrl = "https://desobra.org/" + postUrl

		if (name.includes("twitter")) {
			window.open("https://twitter.com/share?url="+fullPortUrl);
		} else if (name.includes("facebook")) {
			window.open("https://www.facebook.com/sharer/sharer.php?u="+fullPortUrl);
		} else {
			window.open(postUrl);
		}
	};

	Array.from(document.getElementsByClassName("prevent-parent-click"))
	.forEach(function(element) {
	  element.addEventListener('click', openURl);
	});
});