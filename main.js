// toto budeš potřebovat později
/*

*/


// sem začni psát svůj program
document.addEventListener('keydown', posun);
document.addEventListener('load', poziceMince);

function prehraj(elementSelector) {
	document.querySelector(elementSelector).play();
}

function posun(e) {
	prehraj('#hudba');
	let panacek = document.querySelector('#panacek');
	let kdeJePanacekZleva = panacek.getBoundingClientRect().x;
	let kdeJePanacekShora = panacek.getBoundingClientRect().y;
	let sirkaPanacka = panacek.getBoundingClientRect().width;
	let vyskaPanacka = panacek.getBoundingClientRect().height;
	let intViewportWidth = window.innerWidth;
	let intViewportHeigth = window.innerHeight;
	if (e.code === 'ArrowRight' && parseInt(kdeJePanacekZleva) < (intViewportWidth - (sirkaPanacka + 5))) {
		panacek.src = 'obrazky/panacek-vpravo.png'
		panacek.style.left = (parseInt(kdeJePanacekZleva) + 10) + 'px';
	}
	else if (e.code === 'ArrowLeft' && parseInt(kdeJePanacekZleva) > 0) {
		panacek.src = 'obrazky/panacek-vlevo.png'
		panacek.style.left = (parseInt(kdeJePanacekZleva) - 10) + 'px';
	}
	else if (e.code === 'ArrowDown' && parseInt(kdeJePanacekShora) < (intViewportHeigth - (vyskaPanacka + 5))) {
		panacek.src = 'obrazky/panacek.png'
		panacek.style.top = (parseInt(kdeJePanacekShora) + 10) + 'px';
	}
	else if (e.code === 'ArrowUp' && parseInt(kdeJePanacekShora) > 0) {
		panacek.src = 'obrazky/panacek-nahoru.png'
		panacek.style.top = (parseInt(kdeJePanacekShora) - 10) + 'px';
	}
	seberMinci(panacek)
}

function poziceMince() {
	let intViewportWidth = window.innerWidth;
	let intViewportHeigth = window.innerHeight;
	let mince = document.querySelector('#mince');
	let sirkaMince = mince.getBoundingClientRect().width;
	let vyskaMince = mince.getBoundingClientRect().height;
	let panacek = document.querySelector('#panacek');
	let sirkaPanacka = panacek.getBoundingClientRect().width;
	let vyskaPanacka = panacek.getBoundingClientRect().height;
	mince.style.left = Math.floor(Math.random() * (intViewportWidth - parseInt(sirkaMince))) + 'px'; //umisteni mince x
	mince.style.top = Math.floor(Math.random() * (intViewportHeigth - parseInt(vyskaMince))) + 'px'; //umisteni mince y
	panacek.style.left = (intViewportWidth/2 - sirkaPanacka/2) + 'px'; //vycentrovani panacka x
	panacek.style.top = (intViewportHeigth/2 - vyskaPanacka/2) + 'px'; //vycentrovani panacka y
}
// error na 0,0?


function seberMinci(panacek){
	let kdeJePanacekZleva = panacek.getBoundingClientRect().x;
	let kdeJePanacekShora = panacek.getBoundingClientRect().y;
	let sirkaPanacka = panacek.getBoundingClientRect().width;
	let vyskaPanacka = panacek.getBoundingClientRect().height;
	let mince = document.querySelector('#mince');
	let minceX = mince.getBoundingClientRect().x;
	let minceY = mince.getBoundingClientRect().y;
	let sirkaMince = mince.getBoundingClientRect().width;
	let vyskaMince = mince.getBoundingClientRect().height;

	if (!(kdeJePanacekZleva + sirkaPanacka < minceX || minceX + sirkaMince < kdeJePanacekZleva || kdeJePanacekShora + vyskaPanacka < minceY || minceY + vyskaMince < kdeJePanacekShora)) {
		// panacek a mince se prekryvaji
		let intViewportWidth = window.innerWidth;
		let intViewportHeigth = window.innerHeight;
		mince.style.left = Math.floor(Math.random() * (intViewportWidth - parseInt(sirkaMince))) + 'px';
		mince.style.top = Math.floor(Math.random() * (intViewportHeigth - parseInt(vyskaMince))) + 'px';
		let skore = parseInt(document.querySelector('#score').innerHTML);
		skore++;
		document.querySelector('#score').innerHTML = skore;
		prehraj("#zvukmince");
		if (skore === 5) {
			prehraj("#zvukfanfara")
			setTimeout(function(){ alert("Gratuluji k výhře"); }, 100); //opozdeni alertu, aby se nejdrive pricetlo skore
		}
	}
}



// animace