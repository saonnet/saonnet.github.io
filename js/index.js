/*

	coded entirely by Shivansh Anand with a little help from discord channels, xswiper and this stackoverflow thread : https://stackoverflow.com/questions/9616236/html5-video-full-preload-in-javascript

*/

let currIndex = 0;
let lastDotIndex = 0;
let sections = getContentArray();

function setVideoSize() {

	let picFrame = document.getElementById("picture-frame");	
	let pic = picFrame.getElementsByTagName("video")[0];

	let pfWidth = picFrame.offsetWidth;

	let dim = Math.round(0.70 * pfWidth);

	pic.setAttribute("width" , dim + "px");
	pic.setAttribute("height" , dim + "px");

}

function loadVid(obj) {

	let req = new XMLHttpRequest();
	req.open("GET", obj.video, true);
	req.responseType = "blob";
	req.send();

	req.onreadystatechange = function (){
		if(this.status == 200 && this.readyState == 4) {
			obj.vidBlobUrl = URL.createObjectURL(req.response);
		}
	}

}

function getContentArray() {

	let one = {
		label : "introduction",
		title : "Hey ! this is shivansh",
		text : "I am a creator , I make things which can be used by everyone else on this Planet",
		link : "about.html",
		video : "assets/videos/apple_hello.mp4",
		vidBlobUrl : null,
		dotIndex : 0
	};

	let two = {
		label : "Repertoire",
		title : "My toolshed",
		text : "I use a lot of different tools to make things , I have mastered some and am learning some",
		link : "skills.html",
		video : "assets/videos/css_hello.mp4",
		vidBlobUrl : null,
		dotIndex : 1
	};

	let three = {
		label : "portfolio",
		title : "My portfolio",
		text : "In past I've made things used by a lot of people and some things which are used only by me",
		link : "portfolio.html",
		video : "assets/videos/art_wall.mp4",
		vidBlobUrl : null,
		dotIndex : 2
	};

	let four = {
		label : "contact",
		title : "Get in touch",
		text : "Wanna hire me to make something ? Let's get rolling ",
		link : "contact.html",
		video : "assets/videos/sob.mp4",
		vidBlobUrl : null,
		dotIndex : 3		
	};

	return [one , two , three , four];

}

function setInfo(section) {

	let vid = document.querySelector("video");
	let list = document.querySelector("aside").querySelector("ul").querySelectorAll("li");
	let infoContainer = document.getElementById("information");

	let lbl = infoContainer.querySelector("label");
	let h = infoContainer.querySelector("h2");
	let p = infoContainer.querySelector("p");
	let a = infoContainer.querySelector("div").querySelector("a");

	let src = vid.querySelector("source");

	vid.pause();

	if(section.vidBlobUrl) {
		src.setAttribute("src", section.vidBlobUrl);
	} else {
		src.setAttribute("src", section.video);
	}

	vid.load();
	vid.play();

	lbl.textContent = section.label;
	h.textContent = section.title;
	p.textContent = section.text;
	a.setAttribute("href" , section.link);

	let currDot = list[section.dotIndex];
	let lastDot = list[lastDotIndex];

	lastDot.className = "no-background";

	currDot.className = "with-background";

	lastDotIndex = section.dotIndex;

}

function scrollHandler(ev) {

	let menu = document.getElementById("menu");
	let vid = document.querySelector("video");
	let info = document.querySelector("#information");

	if(menu.classList.contains("inside-of-page"))
		menu.className = "out-of-page";

	let getProperIndex= (idx) => {

		if(idx < 0)
			return sections.length - 1;
		else if(idx > sections.length - 1)
			return 0;
		else 
			return idx;


	}
	
	vid.className = "op-0";
	info.className = "op-0";

	if(ev > 0) {

		currIndex++;
		currIndex = getProperIndex(currIndex);

	} else {

		currIndex--;
		currIndex = getProperIndex(currIndex);

	}
	
	setTimeout(() => {
		setInfo(sections[currIndex]);
		vid.className = "op-1";
		info.className = "op-1";
	}, 250);

}


window.addEventListener("load" , () => {

	document.getElementById("loading-screen").className = "zero-opacity";
	setTimeout(() => {
		document.getElementById("loading-screen").style.display = "none";
	}, 400);

	setVideoSize();

	//let sections = getContentArray();

	/*loading from second section , cause first vid is loaded by html page itself , adding first vid at last*/
	for(let i = 1; i<sections.length; i++)
		loadVid(sections[i]);
	loadVid(sections[0]);

	document.body.onkeyup = (ev) => {
		//down arrow - 40 , up arrow - 38
		let dir = ev.keyCode == 40 ? 1 : 0;
		scrollHandler(dir);
	}

	document.body.onwheel = () => {
		//delta y positive if scrolled down ( show next content ) , negative if scrolled up
		scrollHandler(event.deltaY);
	}
	
	/* swipe detection using xswiper library */
	let xwiper = new Xwiper(document.body);

	xwiper.onSwipeRight(() => scrollHandler(1));
	xwiper.onSwipeLeft(() => scrollHandler(0));

}, false);

window.onresize = () => {
	setVideoSize();
}
