let currIndex = 0;
let lastDotIndex = 0;

function setVideoSize() {

	let picFrame = document.getElementById("picture-frame");	
	let pic = picFrame.getElementsByTagName("video")[0];

	let pfWidth = picFrame.offsetWidth;

	let dim = Math.round(0.70 * pfWidth);

	console.log(`${pfWidth} px , ${dim}`);

	pic.setAttribute("width" , dim + "px");
	pic.setAttribute("height" , dim + "px");

}

function getContentArray() {

	let one = {
		label : "introduction",
		title : "Hey ! this is shivansh",
		text : "I am a creator , I make things which can be used by everyone else on this Planet",
		link : "#",
		video : "assets/videos/apple_hello.mp4",
		dotIndex : 0
	};

	let two = {
		label : "skills",
		title : "My toolshed",
		text : "I use a lot of different tools to make things , I have mastered some and am learning some",
		link : "skills.html",
		video : "assets/videos/css_hello.mp4",
		dotIndex : 1
	};

	let three = {
		label : "portfolio",
		title : "My portfolio",
		text : "In past I've made things used by a lot of people and some things which are used only by me",
		link : "portfolio.html",
		video : "assets/videos/art_wall.mp4",
		dotIndex : 2
	};

	let four = {
		label : "contact",
		title : "Get in touch",
		text : "Wanna hire me to make something ? Let's get rolling ",
		link : "contact.html",
		video : "assets/videos/sob.mp4",
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

	src.setAttribute("src", section.video);

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

	if(menu.classList.contains("inside-of-page"))
		menu.className = "out-of-page";

	let sections = getContentArray();

	let getProperIndex= (idx) => {

		if(idx < 0)
			return sections.length - 1;
		else if(idx > sections.length - 1)
			return 0;
		else 
			return idx;


	}

	if(ev > 0) {

		currIndex++;
		currIndex = getProperIndex(currIndex);

	} else {

		currIndex--;
		currIndex = getProperIndex(currIndex);

	}

	setInfo(sections[currIndex]);

}


window.addEventListener("load" , () => {

	document.getElementById("loading-screen").className = "zero-opacity";
	setTimeout(() => {
		document.getElementById("loading-screen").style.display = "none";
	}, 400);

	document.body.onkeyup = (ev) => {
		//down arrow - 40 , up arrow - 38
		let dir = ev.keyCode == 40 ? 1 : 0;
		scrollHandler(dir);
	}

	document.body.onwheel = () => {
		//delta y positive if scrolled down ( show next content ) , negative if scrolled up
		scrollHandler(event.deltaY);
	}

	setVideoSize();



}, false);

window.onresize = () => {
	setVideoSize();
}
