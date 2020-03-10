(function() {
	var query = window.location.href
	var vars = query.split('#')
	if (vars.length > 1) {
		let element =  document.getElementById(vars[1]+'-target')
		element.classList.add("highlight-fragment")

		let faIcon = document.getElementById(vars[1]+'-target-fa')
		faIcon.style.opacity = 0.5
	}

	setTimeout(function() {
		var stickyRegion = document.getElementsByClassName('sticky-region')[0]
		var stickyRegionPos = stickyRegion.getBoundingClientRect().top + window.scrollY

		var topTextTitle = document.getElementById('container-title')
		var topTextTitlePos = topTextTitle.getBoundingClientRect().top + window.scrollY

		var diffBetweenTitlePosAndRegionPos = topTextTitlePos - stickyRegionPos
		stickyRegion.setAttribute("style", "top: -"+diffBetweenTitlePosAndRegionPos+"px;");

		console.log('stickyRegionPos', stickyRegionPos)
		console.log('topTextTitlePos', topTextTitlePos)
		console.log('scrollY', -topTextTitle.offsetHeight)

		//console.log('stickyRegion.top', stickyRegion.style.top)

		var scrollY = convertRemToPixels(1) + topTextTitle.offsetHeight
		window.scrollBy(0, -scrollY);
	}, 1);

})();

function go_to_fragment(fragment) {
    window.location.hash = '#' + fragment;
    window.location.reload(true);
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}