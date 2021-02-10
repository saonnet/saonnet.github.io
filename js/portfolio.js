window.addEventListener("load", () => {

	let closeBtns = document.querySelectorAll(".portfolio-toggle");
	let portfolioItems = document.querySelectorAll(".portfolio-items");

	for(let i = 0 ; i<closeBtns.length; i++) {

		closeBtns[i].onclick = togglePortfolio;	
		closeBtns[i].associatePortfolio = portfolioItems[i];

	}

}, false);

function togglePortfolio() {

	let cl = this.associatePortfolio.classList;
	let portfolio = this.associatePortfolio;

	if(cl.contains("portfolio-items-visible")) {
		cl.remove("portfolio-items-visible");
		cl.add("portfolio-items-hidden");
		this.textContent = "SHOW";
	} else {
		cl.remove("portfolio-items-hidden");
		cl.add("portfolio-items-visible");	
		this.textContent = "CLOSE";
	}
}