
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

function darkMode() {
	var element = document.body;
	element.classList.toggle("dark-mode");
  }

  class Ripples {

    constructor({
        callback = null,
        curtains = null,
        container = null,

        viscosity = 2,
        speed = 3.5,
        size = 1,

        // debug
        gui = null,
        guiParams = null,
    } = {}) {

        if(!curtains) return;

        this.curtains = curtains;

        this.params = {
            container: this.curtains.container,
            callback: callback,

            viscosity: viscosity,
            speed: speed,
            size: size,

            gui: gui,
            guiParams: guiParams,
        };

        this.mouse = {
            current: {
                x: 0,
                y: 0,
            },
            last: {
                x: 0,
                y: 0,
            },
            velocity: {
                x: 0,
                y: 0,
            },
        };

        this.debug();

        this.init();
    }

    debug() {
        if(this.params.gui && this.params.guiParams) {

            this.params.guiParams.viscosity = this.params.viscosity;
            this.params.guiParams.speed = this.params.speed;
            this.params.guiParams.size = this.params.size;

            this.ripplesGui = this.params.gui.addFolder('Render targets');
            this.ripplesGui.open();

            this.guiViscosity = this.ripplesGui.add(this.params.guiParams, 'viscosity', 1 , 15);
            this.guiSpeed = this.ripplesGui.add(this.params.guiParams, 'speed', 1, 15);
            this.guiSize = this.ripplesGui.add(this.params.guiParams, 'size', 0.5, 2.5).step(0.025);

            this.guiViscosity.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.viscosity.value = value;
                }
            });

            this.guiSpeed.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.speed.value = value;
                }
            });

            this.guiSize.onChange((value) => {
                if(this.ripples) {
                    this.ripples.uniforms.size.value = value;
                }
            });
        }
    }

    getCanvasSizes() {
        return this.curtains.getBoundingRect();
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    onMouseMove(e) {
        if(this.ripples) {
            // velocity is our mouse position minus our mouse last position
            this.mouse.last.x = this.mouse.current.x;
            this.mouse.last.y = this.mouse.current.y;

            let weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.last.x, this.mouse.last.y);
            this.ripples.uniforms.lastMousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];

            let updateVelocity = true;
            if(
                this.mouse.last.x === 0
                && this.mouse.last.y === 0
                && this.mouse.current.x === 0
                && this.mouse.current.y === 0
            ) {
                updateVelocity = false;
            }

            // touch event
            if(e.targetTouches) {
                this.mouse.current.x = e.targetTouches[0].clientX;
                this.mouse.current.y = e.targetTouches[0].clientY;
            }
            // mouse event
            else {
                this.mouse.current.x = e.clientX;
                this.mouse.current.y = e.clientY;
            }

            weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.current.x, this.mouse.current.y);
            this.ripples.uniforms.mousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];

            // divided by a frame duration (roughly)
            if(updateVelocity) {
                this.mouse.velocity = {
                    x: (this.mouse.current.x - this.mouse.last.x) / 16,
                    y: (this.mouse.current.y - this.mouse.last.y) / 16
                };
            }
        }
    }

    setRipplesShaders() {
        this.ripplesVs = `
            #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
            #else
            precision mediump float;
            #endif
    
            // default mandatory variables
            attribute vec3 aVertexPosition;
            attribute vec2 aTextureCoord;
    
            uniform mat4 uMVMatrix;
            uniform mat4 uPMatrix;
    
            // custom variables
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
    
            void main() {
    
                vec3 vertexPosition = aVertexPosition;
    
                gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
                // varyings
                vTextureCoord = aTextureCoord;
                vVertexPosition = vertexPosition;
            }
        `;

        this.ripplesFs = `
            #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
            #else
            precision mediump float;
            #endif
    
            uniform vec2 uResolution;
            uniform vec2 uMousePosition;
            uniform vec2 uLastMousePosition;
            uniform vec2 uVelocity;
            uniform int uTime;
            uniform sampler2D uTargetTexture;
            
            uniform float uViscosity;
            uniform float uSpeed;
            uniform float uSize;
            
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
            
            // line distance field
            float sdLine( vec2 p, vec2 a, vec2 b ){
                float velocity = clamp(length(uVelocity), 0.5, 1.5);
                vec2 pa = p - a, ba = b - a;
                float h = clamp( dot(pa, ba)/dot(ba, ba), 0.0, 1.0 );
                return length( pa - ba*h ) / velocity;
            }
    
            
            void main() {
                float velocity = clamp(length(uVelocity), 0.1, 1.0);
                vec3 speed = vec3(vec2(uSpeed) / uResolution.xy, 0.0);
                           
                vec2 mouse = (uMousePosition + 1.0) * 0.5;
                vec2 lastMouse = (uLastMousePosition + 1.0) * 0.5;            
    
                vec4 color = texture2D(uTargetTexture, vTextureCoord);
                
                // trick given by Edan Kwan on this codepen: https://codepen.io/edankwan/pen/YzXgxxr
                // "It is always better to use line distance field instead of single point distance for ripple drawing. And it is cheap and simple."
                //float shade = smoothstep(0.02 * uSize * velocity, 0.0, length(mouse - vTextureCoord));
                float shade = smoothstep(0.02 * uSize * velocity, 0.0, sdLine(vTextureCoord, lastMouse, mouse));        
            
                vec4 texelColor = color;
                
                float d = shade * uViscosity;
                
                float top = texture2D(uTargetTexture, vTextureCoord - speed.zy, 1.0).x;
                float right = texture2D(uTargetTexture, vTextureCoord - speed.xz, 1.0).x;
                float bottom = texture2D(uTargetTexture, vTextureCoord + speed.xz, 1.0).x;
                float left = texture2D(uTargetTexture, vTextureCoord + speed.zy, 1.0).x;
                
                d += -(texelColor.y - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
                d *= 0.99;
                
                // skip first frames
                d *= float(uTime > 5);
                
                d = d * 0.5 + 0.5;
                
                color = vec4(d, texelColor.x, 0.0, 1.0);
            
                gl_FragColor = color;
            }
        `;
    }

    swapPasses() {
        // swap read and write passes
        var tempFBO = this.readPass;
        this.readPass = this.writePass;
        this.writePass = tempFBO;

        // apply new texture
        this.ripplesTexture.setFromTexture(this.readPass.textures[0]);
    }
  
    createRipplesTexture() {
        // create a texture where we'll draw our ripples
        this.ripplesTexture = this.ripples.createTexture({
            sampler: "uTargetTexture"
        });

        return new Promise((resolve) => {
            if(this.ripplesTexture) {
                resolve();
            }
        });
    }

    init() {
        // create 2 render targets
        this.readPass = this.curtains.addRenderTarget({
            clear: false,
        });
        this.writePass = this.curtains.addRenderTarget({
            clear: false,
        });

        this.setRipplesShaders();

        let boundingRect = this.getCanvasSizes();

        this.ripplesParams = {
            vertexShader: this.ripplesVs,
            fragmentShader: this.ripplesFs,
            autoloadSources: false, // dont load our webgl canvas!!
            depthTest: false, // we need to disable the depth test in order for the ping pong shading to work
            watchScroll: false,
            uniforms: {
                mousePosition: {
                    name: "uMousePosition",
                    type: "2f",
                    value: [this.mouse.current.x, this.mouse.current.y],
                },
                lastMousePosition: {
                    name: "uLastMousePosition",
                    type: "2f",
                    value: [this.mouse.current.x, this.mouse.current.y],
                },
                velocity: {
                    name: "uVelocity",
                    type: "2f",
                    value: [this.mouse.velocity.x, this.mouse.velocity.y],
                },

                // window aspect ratio to draw a circle
                resolution: {
                    name: "uResolution",
                    type: "2f",
                    value: [boundingRect.width, boundingRect.height],
                },

                time: {
                    name: "uTime",
                    type: "1i",
                    value: -1,
                },

                viscosity: {
                    name: "uViscosity",
                    type: "1f",
                    value: this.params.viscosity,
                },
                speed: {
                    name: "uSpeed",
                    type: "1f",
                    value: this.params.speed,
                },
                size: {
                    name: "uSize",
                    type: "1f",
                    value: this.params.size,
                },
            },
        };

        this.ripples = this.curtains.addPlane(this.params.container, this.ripplesParams);

        if(this.ripples) {
            this.createRipplesTexture().then(() => {
                if(this.params.callback) {
                    this.params.callback(this.ripplesTexture);
                }
            });

            this.ripples.onReady(() => {
                // add event listeners
                window.addEventListener("mousemove", (e) => this.onMouseMove(e));
                window.addEventListener("touchmove", (e) => this.onMouseMove(e));
            }).onRender(() => {
                this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

                this.mouse.velocity = {
                    x: this.lerp(this.mouse.velocity.x, 0, 0.1),
                    y: this.lerp(this.mouse.velocity.y, 0, 0.1),
                };

                this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

                this.ripples.uniforms.time.value++;

                // update the render target
                this.writePass && this.ripples.setRenderTarget(this.writePass);
            }).onAfterRender(() => {
                // swap FBOs and update texture
                if(this.readPass && this.writePass) {
                    this.swapPasses();
                }

            }).onAfterResize(() => {
                // update our window aspect ratio uniform
                boundingRect = this.getCanvasSizes();
                this.ripples.uniforms.resolution.value = [boundingRect.width, boundingRect.height];
            });
        }
    }
}
