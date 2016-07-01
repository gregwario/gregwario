Technical Exercise from Slack
=============================

Notes from [Greg Doolittle](mailto:gdoolittle@gmail.com) 
--------------------------------------------------------

* Users should be able to perform all functions with the keyboard alone, with the following keys:
    * __enter__ to submit form
    * __tab__ to jump to the search results
    * __left__, __right__, __up__, and __down__ arrows to navigate thumbnails view, and from the lightbox
    * __spacebar__ & __enter__ to select a thumbnail to open in the lighbox
    * __esc__ to close lightbox

* I didn't test in IE because I don't have access to a Windows machine.  Sorry!  If I can acquire a simulator or an actual Windows machine, I'll check if I need to patch anything for IE.

* Things I learned:
	* flexbox support is not as widespread as I had hoped
	* document.querySelectorAll returns a NodeList, not an array
	* button groups are hard to get right across all browsers
	* Gained an appreciation for templates, and frameworks that have data-binding! :)

* Some features/ideas for future versions, if I were to spend more time on this:
    * Better organization
    * Infinite scroll to view more images
    * Replace the jittery flexbox hack for Chrome/Firefox with something elegant (scripts.js:101)
    * Bookmarkable URLs
    * Share/send image
    * Contact photographer
    * Request license
    * Display comments
    * Display tags
    * Add comment to a photo 
    * Save photo as a favorite
    * Display history/recent searches
    * Advanced search/additional configuration in search
    * Display geocoordinates and map for each image
    * More attention towards accessibility and VoiceOver
    * E2E testing
    * Unit testing
    * Explore other placement for captions

* Things I might have done differently if there were no requirements:
    * Use a templating language that has at least one-way data binding (probably Handlebars)
    * Use ES6, and a transpiler like Babel, Traceur, or TypeScript
    * Use a module loader like SystemJS
    * Use a UI framework like Bootstrap or Foundation


Instructions from [Julie Hyska](mailto:jhyska@slack-corp.com)
-------------------------------------------------------------

> This exercise is meant to demonstrate your ability to:
> 
> * Access a public API and successfully retrieve data from it;
> * Display that data on a page;
> * Update the UI of a page without refreshing;
> * Build a polished user experience you'd be proud to ship; and
> * Do all of the above using only native JavaScript (no libraries such as jQuery, although CSS preprocessors are fine).
> 
> I'd like you to create a web page that shows a grid of photo thumbnails; when a thumbnail is clicked, the photo should be displayed in a lightbox view, with the ability to move to the next / previous photos and display the photo title. You can use any public API that returns photos; here are some ideas:
> 
> * [Flickr](https://www.flickr.com/services/api/flickr.photosets.getPhotos.html)
> * [Google Image Search](https://developers.google.com/custom-search/json-api/v1/overview)
> 
> You can take up to a week to get this back to me, and feel free to use that entire time if needed.
> 
> This exercise is very important in assessing your technical fit, so make sure you're happy with the result and that it reflects your skills. Your submission should be something you would be proud to submit on the job. It should run without errors in the latest versions of Chrome, Safari, Firefox and IE.
> 
> When you’re finished, please send us:
> 
> * A URL where the working lightbox can be seen
> * Your source code as a zipped Git repository (create a local repo for your code and commit your files as you normally would; when the exercise is complete, zip your main directory, including the .git directory, and send it to us).
> 
> If you have any notes or instructions about the exercise, please include them in a README.md file in your repo.

Additional instructions:

>  * Is there any preference around ES6 or ES5 for my JavaScript?
>      * Since we still currently use ES5 here at Slack, we'd prefer that you use ES5 without Babel.