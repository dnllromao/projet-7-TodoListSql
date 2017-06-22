const form  =  document.getElementById('items-list');
const inputs = form.querySelectorAll('input[type="checkbox"]');
const afaire = form.querySelector('.block-afaire');
const archive = form.querySelector('.block-archive');
const alert = document.getElementById('alert');
const search = document.getElementById('search');
const filtre = document.getElementById('filtre');
const ordre = document.getElementById('ordre');

inputs.forEach(function(input, index, arr) {
	addChangeEffect(input);
	addDeadEffect(input);
});

search.addEventListener('keyup', function(e) {
	searchItems(e);
});


let origAfaire = afaire.querySelectorAll('input');

filtre.addEventListener('change', function(e) {
	trierItems();
});

ordre.addEventListener('change', function(e) {
	trierItems();
});

function trierItems() {
	console.dir(filtre.value);
	console.log([...afaire.querySelectorAll('input')]);

	let sortAfaire;

	switch (filtre.value) {
	  case 'date':

	  	console.log(ordre.value);

	  	if(ordre.value == "asc") {
	  		sortAfaire = [...afaire.querySelectorAll('input')].sort(function(a, b) {
	  			// manage empty values, quite dirty
	  			if(a.dataset.deadline.length == 0) {
	  				console.log(1);
	  				return 1;
	  			}

	  			if(b.dataset.deadline.length == 0) {
	  				console.log(-1);
	  				return -1;
	  			}

	  			if(a.dataset.deadline > b.dataset.deadline) {
	  				console.log(1);
	  				return 1;
	  			} else if (a.dataset.deadline < b.dataset.deadline) {
	  				console.log(-1);
	  				return -1;
	  			}
	  		});
	  	} else {
	  		sortAfaire = [...afaire.querySelectorAll('input')].sort(function(a, b) {
	  			// manange empty values, quite dirty
	  			if(a.dataset.deadline.length == 0) {
	  				console.log(-1);
	  				return -1;
	  			}

	  			if(b.dataset.deadline.length == 0) {
	  				console.log(1);
	  				return 1;
	  			}

	  			if(a.dataset.deadline > b.dataset.deadline) {
	  				console.log(-1);
	  				return -1;
	  			} else if (a.dataset.deadline < b.dataset.deadline) {
	  				console.log(1);
	  				return 1;
	  			}
	  		});
	  	}

	  	

	    break;
	  case 'nom':
	  	sortAfaire = [...afaire.querySelectorAll('input')].sort(function(a, b) {

	  		if(a.parentNode.innerText > b.parentNode.innerText) {
	  			console.log(1);
	  			return 1;
	  		} else {
	  			console.log(-1);
	  			return -1;
	  		}
	  	});

	    break;
	    default:
	    	console.log('default');
	        sortAfaire = original;
	}

	afaire.innerHTML = '';
	sortAfaire.forEach(function(el) {
		afaire.appendChild(el.parentNode);
	});
}

function searchItems(e) {

	inputs.forEach(function(el, index) {
		let match = new RegExp(e.target.value).test(el.parentNode.innerText);

		if(match) {
			el.parentNode.style.display = 'block';
		} else {
			el.parentNode.style.display = 'none';
		}
	});
}

function addChangeEffect (el) {

	el.addEventListener('change', function(e) {

		let inputBlock = this.parentNode;
		let index = this.getAttribute('name');

		if(this.checked) {
			inputBlock.classList.add('done');
			archive.appendChild(inputBlock);

			registerChange(index, 0);

			if(el.parentNode.classList.contains('dead')) {
				el.parentNode.classList.remove('dead');
				isListEmpty();
				alert.removeChild(document.getElementById(index));
			}

			
		} else {
			inputBlock.classList.remove('done');
			afaire.appendChild(inputBlock);

			registerChange(index, 1);
			addDeadEffect(this);

		}

		origAfaire = afaire.querySelectorAll('input');
	});
}

function registerChange(index, bool) {	
	const req = new XMLHttpRequest();
	req.open('POST', 'index.php');
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('action=enregistrer&'+index+'='+bool);
	req.onload = function() {
		//console.log(req.responseText);	
	}

}

function addDeadEffect(el) {
	//console.log();

	if(el.parentNode.parentNode === afaire && Date.now() > new Date(el.dataset.deadline)) {
		el.parentNode.classList.add('dead');
		let id = el.getAttribute('name');

		let li = document.createElement('li');
		li.id = id;
		li.innerText = el.parentNode.innerText;
		alert.append(li);
		fadeIn(alert.parentNode);
	}
}

function isListEmpty() {
	console.log(alert.childNodes.length);
	if(alert.childNodes.length === 1) {
		console.log('hide alert-block');
		fadeOut(alert.parentNode);
	}
}

function fadeOut(el) {
  el.style.opacity = 1;

  let last = +new Date(); // get a timestamp (?)

  var tick = function() {
    el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function fadeIn(el) {

  el.style.opacity = 0;

  let last = +new Date(); // get a timestamp (?)

  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}


// Check out const and let 's