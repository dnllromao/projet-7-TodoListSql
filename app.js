const form  =  document.getElementById('items-list');
const inputs = form.querySelectorAll('input');
const afaire = form.querySelector('.block-afaire');
const archive = form.querySelector('.block-archive');

inputs.forEach(function(input, index, arr) {
	addChangeEffect(input);
});

function addChangeEffect (el) {

	el.addEventListener('change', function(e) {

		let inputBlock = this.parentNode;
		let index = this.getAttribute('name');

		if(this.checked) {
			inputBlock.classList.add('done');
			archive.appendChild(inputBlock);

			registerChange(index, 0);
			
		} else {
			inputBlock.classList.remove('done');
			afaire.appendChild(inputBlock);

			registerChange(index, 1);
		}
	});
}

function registerChange(index, bool) {	
	const req = new XMLHttpRequest();
	req.open('POST', 'index.php');
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('action=enregistrer&'+index+'='+bool);
	req.onload = function() {
		console.log(req.responseText);	
	}

}

