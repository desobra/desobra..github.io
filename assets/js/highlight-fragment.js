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
		var topTextTitle = document.getElementById('container-title')

	    if (document.getElementsByClassName('sticky-region').length == 0) {
	        var stickyRegionNoImage = document.getElementsByClassName('region-black')
            if (stickyRegionNoImage.length > 0) {
                var height = topTextTitle.offsetHeight + convertRemToPixels(2)
                var stickyRegion = document.getElementsByClassName('no-sticky-region')[0]
                stickyRegion.setAttribute("style", "height: "+height+"px;");
            }

            set_title_icons_position()

            return
        }

		var stickyRegion = document.getElementsByClassName('sticky-region')[0]
		var stickyRegionPos = stickyRegion.getBoundingClientRect().top + window.scrollY

		var topTextTitlePos = topTextTitle.getBoundingClientRect().top + window.scrollY

        var stickyRegionNoImage = document.getElementsByClassName('region-black')
        if (stickyRegionNoImage.length > 0) {
            var height = topTextTitle.offsetHeight + convertRemToPixels(2)
        	stickyRegion.setAttribute("style", "height: "+height+"px;");
        } else {
            var diffBetweenTitlePosAndRegionPos = topTextTitlePos - stickyRegionPos
		    stickyRegion.setAttribute("style", "top: -"+diffBetweenTitlePosAndRegionPos+"px;");
        }

        set_title_icons_position()

		var scrollY = convertRemToPixels(1) + topTextTitle.offsetHeight
		window.scrollBy(0, -scrollY);
	}, 1);

})();

function set_title_icons_position() {
	var topTextTitle = document.getElementById('container-title')
    var topTextTitlePos = topTextTitle.getBoundingClientRect().bottom + window.scrollY
    var titleIcons = document.getElementById("title-icons")
    var titleIconsPos = titleIcons.getBoundingClientRect().top + window.scrollY
    var diff = topTextTitlePos - titleIconsPos - titleIcons.offsetHeight
    var titleIcons = document.getElementById("title-icons")
    titleIcons.setAttribute("style", "margin-top: "+diff+"px;");
}

function go_to_fragment(fragment) {
    window.location.hash = '#' + fragment;
    window.location.reload(true);
}

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}