const items = document.querySelectorAll('#items-list label[draggable="true"]');
console.log(items);

let dragElement = null;

items.forEach(function(el) {
	addDragEffect(el);
});

function addDragEffect(el) {
	el.addEventListener('dragstart', dragStartHandler);
	el.addEventListener('dragover', dragOverHandler);
	el.addEventListener('drop', dropHandler);
}

function dragStartHandler(e) {
	console.log('dragstart');
	//console.log(this);
	dragElement = this;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.outerHTML); // save the element in memory

	/* 
		dataTransfer.effectAllowed
	Restricts what 'type of drag' the user can perform on the element. 
	It is used in the drag-and-drop processing model to initialize the dropEffect 
	during the dragenter and dragover events. 
	The property can be set to the following values: 
	none, copy, copyLink, copyMove, link, linkMove, move, all, and uninitialized. 
	*/
}

function dragOverHandler(e) {
	console.log('dragover');
	this.style.background ='red';
	e.dataTransfer.dropEffect = 'move';
	e.preventDefault(); // if i don't do this drop event don't fire ??

	/*
		dataTransfer.dropEffect
	Controls the feedback that the user is given during the dragenter and dragover events. 
	When the user hovers over a target element, the browser's cursor will indicate 
	what type of operation is going to take place (e.g. a copy, a move, etc.). 
	The effect can take on one of the following values: none, copy, link, move.
	*/
}

function dropHandler(e) {
	console.log('drop');
	if(this === dragElement)
		return;

	let direction;

	// set direction 
	if(getIndex(dragElement) < getIndex(this)) {
		console.log('afterend');
		direction = 1;
	} else {
		console.log('beforebegin');
		direction = -1;
	}

	dragElement.parentNode.removeChild(dragElement);
	const data = e.dataTransfer.getData('text/html');
	let place = (direction === 1)? 'afterend' : 'beforebegin';
	this.insertAdjacentHTML(place, data);

	let sibling = (direction === 1)? this.nextElementSibling : this.previousElementSibling;
	addDragEffect(sibling);
	addChangeEffect(sibling.querySelector('input'));
	// register new order
	registerOrder(sibling,direction);
	//e.preventDefault();
}

function getIndex (el) {
	// console.log('el');
	// console.log(el.parentNode);
	const children = Array.from(el.parentNode.childNodes);
	// console.log('children');
	// console.log(children);
	return children.indexOf(el);
}

function registerOrder(sibling, direction) {
	console.log(sibling);
	while(sibling) {
		console.log(sibling);
		let order = getIndex(sibling);
		let id = sibling.querySelector('input').getAttribute('name');
		console.log(order);
		console.log(id);

		const req = new XMLHttpRequest();
		req.open('POST', 'index.php');
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		req.send('action=reorganiser&'+id+'='+order);
		req.onload = function() {
			console.log(req.responseText);	
		}

		sibling = (direction === 1)? sibling.previousElementSibling : sibling.nextElementSibling;

	}
}
