var SlackLightbox = {
	
	init: function() {
		SlackLightbox.bindings();
		SlackLightbox.ui.flickr_search_term.focus();
	},
	imageList: [],
	currentImage: -1,
	searchTerm: '',
	bindings: function() {
		[SlackLightbox.ui.close_overlay_button, SlackLightbox.ui.overlay_container].forEach(function(item) {
			item.addEventListener("click", function(e) {
				e.stopPropagation();
				SlackLightbox.ui.overlay_container.classList.add("hidden");
			});
		});
		SlackLightbox.ui.submit_button.addEventListener("click", function(e) {
			e.preventDefault();
			SlackLightbox.fetchPhotos();
		})
		SlackLightbox.ui.flickr_form.addEventListener("submit", function(e) {
			e.preventDefault();
			e.stopPropagation();
			SlackLightbox.fetchPhotos();
		});
		SlackLightbox.ui.image_detail.addEventListener("click", function(e) {
			e.stopPropagation();
			SlackLightbox.navigateRight();
		});

		SlackLightbox.ui.button_next.addEventListener("click", function(e) {
			e.stopPropagation();
			SlackLightbox.navigateRight();
		});
		SlackLightbox.ui.button_previous.addEventListener("click", function(e) {
			e.stopPropagation();
			SlackLightbox.navigateLeft();
		});
		window.addEventListener('keyup', function(e) {
			if (document.activeElement !== SlackLightbox.ui.flickr_search_term) {
				var keyCode = e.which || e.keyCode;
				switch(parseInt(keyCode)) {
					case 27: //esc
						SlackLightbox.ui.overlay_container.classList.add("hidden");
						break;
					case 32: //space
				        document.activeElement.click();
						break;
			        case 13: //enter
				        document.activeElement.click();
				        break;
			        case 37: //left
				        SlackLightbox.navigateLeft();
				        break;
			        case 38: //up
		        		if (SlackLightbox.ui.overlay_container.classList.contains('hidden') && window.innerWidth > 900) {
					        SlackLightbox.navigateUp();
					    } else {
					    	SlackLightbox.navigateLeft();
					    }
				        break;
			        case 39: //right
				        SlackLightbox.navigateRight();
				        break;
			        case 40: //down
		        		if (SlackLightbox.ui.overlay_container.classList.contains('hidden') && window.innerWidth > 900) {
					        SlackLightbox.navigateDown();
					    } else {
					        SlackLightbox.navigateRight();
					    }
				        break;
					default: // unknown
						break;
				}
			}
		});
	},

	ui: { 
		flickr_form: document.getElementById("flickr_form"),
		flickr_search_term: document.getElementById("flickr_search_term"),
		flickr_search_results: document.getElementById("flickr_search_results"),
		submit_button: document.getElementById("submit_button"),
		figure_element: document.getElementById("image_figure"),
		image_detail: document.getElementById("image_detail"),
		image_detail_title: document.getElementById("image_detail_title"),
		results_description: document.getElementById("results_description"),
		photos_container: document.getElementById("photos_container"),
		overlay_container: document.getElementById("overlay_container"),
		close_overlay_button: document.getElementById("close_overlay"),
		hide_during_overlay: document.querySelectorAll(".hide_during_overlay"),
		button_previous: document.getElementById("button_previous"),
		button_next: document.getElementById("button_next"),
		loading: document.getElementById("loading"),
		error: document.getElementById("error"),
		status: document.getElementById("status")
	},

	showOverlay: function(imageNumber) {	
		SlackLightbox.ui.image_detail_title.classList.remove("hidden");
		SlackLightbox.ui.image_detail.style.height = null;
		SlackLightbox.currentImage = imageNumber;
		SlackLightbox.ui.image_detail.src = SlackLightbox.imageList[SlackLightbox.currentImage].imageLargePath;
		SlackLightbox.ui.image_detail.alt = SlackLightbox.ui.image_detail_title.innerHTML = SlackLightbox.imageList[SlackLightbox.currentImage].title;
		if (SlackLightbox.ui.image_detail.alt.length <= 0) {
			SlackLightbox.ui.image_detail_title.classList.add("hidden");
		}
		SlackLightbox.ui.overlay_container.classList.remove("hidden");
		// fixes a flexbox bug in chrome and firefox
		setTimeout(function(){
			if (SlackLightbox.ui.image_detail.height + 32 > window.innerHeight) {
				console.log('too tall')
				SlackLightbox.ui.image_detail.style.height = window.innerHeight - 80;
			}
		}, 400);

		document.querySelectorAll("[data-image_list_order='" + SlackLightbox.currentImage + "']")[0].blur();
		SlackLightbox.ui.figure_element.focus();
		[].forEach.call(SlackLightbox.ui.hide_during_overlay, function(item){
			item.setAttribute('aria-hidden', true);
		});
	},

	hideOverlay: function() {
		SlackLightbox.ui.overlay_container.classList.add("hidden");
		[].forEach.call(SlackLightbox.ui.hide_during_overlay, function(item){
			item.setAttribute('aria-hidden', false);
		});
		document.querySelectorAll("[data-image_list_order='" + SlackLightbox.currentImage + "']")[0].focus();
	},
	navigateUp: function() {
		var nextThumbnail = (parseInt(document.activeElement.querySelector("img").getAttribute("data-image_list_order")) + 10) % 15;
		if (nextThumbnail === -1) {
			nextThumbnail = SlackLightbox.imageList.length - 1;
		}
		document.querySelectorAll("[data-image_list_order='"+nextThumbnail+"']")[0].parentElement.focus();
	},
	navigateDown: function() {
		var nextThumbnail = (parseInt(document.activeElement.querySelector("img").getAttribute("data-image_list_order")) + 5) % 15;
		if (nextThumbnail === -1) {
			nextThumbnail = SlackLightbox.imageList.length - 1;
		}
		document.querySelectorAll("[data-image_list_order='"+nextThumbnail+"']")[0].parentElement.focus();
	},
	navigateLeft: function() {
		if (SlackLightbox.ui.overlay_container.classList.contains('hidden')) {
			var nextThumbnail = parseInt(document.activeElement.querySelector("img").getAttribute("data-image_list_order")) - 1;
			if (nextThumbnail === -1) {
				nextThumbnail = SlackLightbox.imageList.length - 1;
			}
				document.querySelectorAll("[data-image_list_order='"+nextThumbnail+"']")[0].parentElement.focus();

		} else {
			if (SlackLightbox.currentImage > 0) {
				SlackLightbox.showOverlay(--SlackLightbox.currentImage);
				SlackLightbox.ui.button_previous.focus();
			} else {
				SlackLightbox.currentImage = 0;
				SlackLightbox.hideOverlay();
			}
		}
	},

	navigateRight: function() {
		if (SlackLightbox.ui.overlay_container.classList.contains('hidden')) {
			var nextThumbnail = parseInt(document.activeElement.querySelector("img").getAttribute("data-image_list_order")) + 1;
			if (nextThumbnail === SlackLightbox.imageList.length) {
				nextThumbnail = 0;
			}
			document.querySelectorAll("[data-image_list_order='"+nextThumbnail+"']")[0].parentElement.focus();

		} else {
			if (SlackLightbox.currentImage > -1) {
				if (SlackLightbox.currentImage < SlackLightbox.imageList.length - 1) {
					SlackLightbox.showOverlay(++SlackLightbox.currentImage);
					SlackLightbox.ui.button_next.focus();
				} else {
					SlackLightbox.currentImage = 0;
					SlackLightbox.hideOverlay();
				}
			}
		}
	},

	fetchPhotos: function() {
		if (SlackLightbox.ui.flickr_search_term.value.length) {
			SlackLightbox.searchTerm = encodeURIComponent(SlackLightbox.ui.flickr_search_term.value);
		} else {
			SlackLightbox.searchTerm = encodeURIComponent('San Francisco');
		}
		var apiURL = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&safe_search=1&text='+SlackLightbox.searchTerm+'&format=json&nojsoncallback=1&api_key=2bdb859b00f2c22861d7d107412b7437';

		SlackLightbox.ui.loading.classList.remove("hidden");
		SlackLightbox.ui.error.classList.add("hidden");
		SlackLightbox.ui.results_description.classList.add("hidden");
		SlackLightbox.ui.photos_container.innerHTML = '';
		SlackLightbox.ui.status.innerHTML = 'Sending ajax search request.';

		var xhr = new XMLHttpRequest();
		xhr.open('GET', apiURL, true);

		xhr.onreadystatechange = function(e) {
			if (this.readyState === 4) {
				if (this.status === 200) {
					SlackLightbox.insertThumbnails(this.responseText);
				} else {
					SlackLightbox.ui.status.innerHTML = 'Search request failed.';
					SlackLightbox.showError();
				}
			}
		};
		xhr.send();
	},

	showError: function() {
		SlackLightbox.ui.loading.classList.add("hidden");
		SlackLightbox.ui.error.classList.remove("hidden");
		console.error("Oops... we're having a technical problem.  It's possible that flickr.com is having an outage, or that they've changed their API... or that there's a bug in this application.  Please try again or contact gdoolittle@gmail.com.");
	},

	insertThumbnails: function(responseData) {
		SlackLightbox.ui.photos_container.innerHTML = '';
		SlackLightbox.ui.loading.classList.add("hidden");
		SlackLightbox.ui.flickr_search_results.innerHTML = SlackLightbox.ui.flickr_search_term.value || "San Francisco" ;
		SlackLightbox.ui.results_description.classList.remove("hidden");
		SlackLightbox.imageList = JSON.parse(responseData).photos.photo.slice(0,15); 
		SlackLightbox.ui.status.innerHTML = 'Ajax request has finished.  Now displaying ' + SlackLightbox.imageList.length + ' images.';

		SlackLightbox.imageList.forEach(function(item, $index) {
			item.imageThumbnailPath = "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_m.jpg";
			item.imageLargePath = "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_b.jpg";
			var newButton = document.createElement('button');
			var newImage = new Image();
			newImage.src = item.imageThumbnailPath;
			newImage.alt = "Thumbnail image of " + item.title;
			newImage.setAttribute('data-image_list_order', $index);
			newButton.appendChild(newImage);
			newButton.addEventListener("click", function(e) {
				SlackLightbox.showOverlay($index);
			});
			SlackLightbox.ui.photos_container.appendChild(newButton);
		});
		SlackLightbox.ui.photos_container.classList.remove("hidden");
		SlackLightbox.preloadLargeImagePaths();
	},

	preloadLargeImagePaths: function() {
		// preloading full-size images to reduce any *flickr* after clicking a thumbnail
		SlackLightbox.imageList.forEach(function(item) {
			if (typeof SlackLightbox.imageList.imageLargePath !== "undefined") {
				var newImage = new Image();
				newImage.src = SlackLightbox.imageList.imageLargePath;
			}
		});
	}
};
