var topFlourish, codeElement, header, headerTop, flourishHeght, navItems, headerHeight;

var attachHeader = function () {
	var scrollPosition = (document.documentElement.scrollTop || window.scrollY) + 11.188;
	var flourishPosition = (scrollPosition / document.querySelector('html').offsetHeight) * (codeElement.offsetHeight);

	topFlourish.scrollTop = flourishPosition;

	if (scrollPosition >= (headerTop + flourishHeght)) {
		header.classList.add('header-fixed');
		topFlourish.classList.add('in-menu');
		document.querySelector('body').style.marginTop = headerHeight + 'px';
	}
	else {
		header.classList.remove('header-fixed');
		topFlourish.classList.remove('in-menu');
		document.querySelector('body').style.marginTop = '0px';
	}
};

var scrollIntoView = function (to, duration) {
    var start = window.scrollY,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function (){
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time | b = start value | c = change in value | d = duration
Math.easeInOutQuad = function  (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

var setActiveNavItem = function () {
	var scrollPosition = (document.documentElement.scrollTop || window.scrollY);
	var screenMiddle = scrollPosition + (window.innerHeight / 2);

	Array.prototype.forEach.call(navItems, function (thisNavLink) {
		var target = document.querySelector('.' + thisNavLink.getAttribute('target'));
		var targetTop = target.offsetTop;
		var targetBottom = target.offsetTop + target.offsetHeight;

		if (screenMiddle > targetTop && screenMiddle < targetBottom) {
			thisNavLink.parentNode.classList.add('header__nav-item--active');
		}
		else {
			thisNavLink.parentNode.classList.remove('header__nav-item--active');
		}
	});
};

var readyFunction = function () {
	topFlourish = document.querySelector('.top-flourish');
	codeElement = document.querySelector('code');
	header = document.querySelector('header');
	navItems = document.querySelectorAll('.header__nav-item a');
	headerTop = header.offsetTop;
	flourishHeght = topFlourish.offsetHeight;
	headerHeight = header.offsetHeight;

	Array.prototype.forEach.call(navItems, function (thisNavLink) {
		if(!('ontouchstart' in document.documentElement)) {
			thisNavLink.parentNode.classList.add('header__nav-item--no-touch');
		}
		thisNavLink.addEventListener('click', function (event) {
			event.preventDefault()
			var target = document.querySelector('.' + thisNavLink.getAttribute('target'));
			scrollIntoView(target.offsetTop - headerHeight, 500);
		});
	});

	setActiveNavItem();

	window.addEventListener('scroll', function (event) {
		attachHeader();
		setActiveNavItem();
		var scrollPosition = window.scrollY;
	});
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}
