
'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {

	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");
	
	const textArray = ["an artist", "a technology enthuasiast", "always trying to find a better way", "a biology lover", "a content creator"];
	const typingDelay = 100;
	const erasingDelay = 100;
	const newTextDelay = 2000; // Delay between current and next text
	let textArrayIndex = 0;
	let charIndex = 0;
	
	function type() {
	  if (charIndex < textArray[textArrayIndex].length) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	  } 
	  else {
		cursorSpan.classList.remove("typing");
		  setTimeout(erase, newTextDelay);
	  }
	}
	
	function erase() {
		if (charIndex > 0) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
		charIndex--;
		setTimeout(erase, erasingDelay);
	  } 
	  else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if(textArrayIndex>=textArray.length) textArrayIndex=0;
		setTimeout(type, typingDelay + 1100);
	  }
	}
	
	document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
	  if(textArray.length) setTimeout(type, newTextDelay + 250);
	});

	

	/*-------------------
		Blog Slider
	-------------------*/
	$('.blog__slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		arrows: false,
		centerMode: true,
		centerPadding: '190px',
		slidesToShow: 2,
		autoplay: true,
		pauseOnHover:false,
		responsive: [
			{
				breakpoint: 991,
				settings: {
				centerPadding: '0',
				slidesToShow: 2,
				slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerMode: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '0',
				}
			}
		]
	});

	/*-------------------
		Progress Bars
	-------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"></div>');
		}
	});

	/*-----------------------------
		Smooth Scroll Page Hash
	-----------------------------*/
	if (window.location.hash) {
		var hash = window.location.hash;
	
		if ($(hash).length) {
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 900, 'swing');
		}
	}

	/* Sticky nav bar */

	// When the user scrolls the page, execute myFunction
	window.onscroll = function() {myFunction()};

	// Get the header
	var nav = document.getElementById("sticky");

	// Get the offset position of the navbar
	var sticky = nav.offsetTop;

	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function myFunction() {
	if (window.pageYOffset > sticky) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
	}
	


}(jQuery));

