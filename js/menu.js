const evs = ["touchmove" , "wheel"];

const passiveDisable = {
	passive : false
};

const preventEv = () => event.preventDefault();

function toggleScrolling(disable) {

	for(let i of evs)
		if(disable)
			document.documentElement.addEventListener(i , preventEv , passiveDisable);
		else
			document.documentElement.removeEventListener(i , preventEv , passiveDisable);

}

function toggleMenu() {

	let menu = this.menu;

	if(menu.classList.contains("out-of-page")) {
		menu.classList.remove("out-of-page");
		menu.classList.add("inside-of-page");
		toggleScrolling(true);
	} else {
		menu.classList.remove("inside-of-page");
		menu.classList.add("out-of-page");	
		toggleScrolling(false);
	}	

}

function menuHandler() {

	let menuCurtainToggleBtns = document.querySelectorAll(".menu-curtain-toggle-btn");
	let menu = document.getElementById("menu");

	for(let i of menuCurtainToggleBtns) {
		i.menu = menu;
		i.onclick = toggleMenu;
	}	
}

window.addEventListener("load" , menuHandler , false);