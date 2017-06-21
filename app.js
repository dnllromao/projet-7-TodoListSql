const form  =  document.getElementById('items-list');
const inputs = form.querySelectorAll('input');
const afaire = form.querySelector('.block-afaire');
const archive = form.querySelector('.block-archive');
const alert = document.getElementById('alert');

inputs.forEach(function(input, index, arr) {
	addChangeEffect(input);
	addDeadEffect(input);
});

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
		console.log(id);
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