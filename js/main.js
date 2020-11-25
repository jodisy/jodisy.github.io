
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
	// Force to top
	$(document).ready(function(){
		$(this).scrollTop(0);
	});

	function openTab(evt, tabName) {
		// Declare all variables
		var i, tabcontent, tablinks;
	  
		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
		  tabcontent[i].style.display = "none";
		}
	  
		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
		  tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
	  
		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " active";
	  }


}(jQuery));

