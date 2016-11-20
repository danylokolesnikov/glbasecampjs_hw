function doAjaxCallPromise(url, method) {
	return fetch(url,{method: method})
		.then(
			function(response) {
				if(response.status === 200){
					return response.json()
				} else {
					return Error('Something went wrong');
				};
			};
		});
};


/*

API

	GET api/books/:id -> get Book detais { id: 15, name: 'The Adventures of Tom Sawyer', authorId: 25 }

	GET api/authors/:id -> get Author detais { name: 'Mark Twain' books: [34, 57, 69, 15] }

	GET api/bestsellers/similar/:id
	-> get mutiple book names

	'The Prince and the Pauper',
	'Golden Age',
	'The Adventures of Huckleberry Finn',
	'Old Times on the Mississippi'



*/

/*

HTML

	<div>
		<div id="book">

		</div>

		<div id="author">

		</div>

		<div id="similar">

		</div>
	</div>

*/


function getBookById(id) {
	document.getElementById('book').textContent = 'Please wait. Book is loading';

	doAjaxCallPromise('api/books/' + id, 'GET'),then(function (response) {
		document.getElementById('book').textContent = response.name;
	}.cathc(function (response) {
		document.getElementById('book').textContent = 'Error. Please refresh your browser';
	})
}

function loadPage(id) {

	document.getElementById('book').textContent = 'Please wait. Book is loading';
	document.getElementById('author').textContent = 'Please wait. Author details are loading';
	document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

	doAjaxCallPromise('api/books/' + id, 'GET')
	.catch(function(){
		document.getElementById('book').textContent = 'Error. Please refresh your browser';
	})
	.then(function(response) {
		document.getElementById('book').textContent = response.name;
	}
	.then(function(response){
		return doAjaxCallPromise('api/autors' + response.authorId, 'GET')
	})
	.catch(function(){
		document.getElementById('author').textContent = 'Error. Please refresh your browser';
	})
	.then(function(response){
		document.getElementById('author').textContent = response.name;
		
		Promise.all(response.books.map(function(similarBookId){
			return doAjaxCallPromise('api/bestsellers/similar/' + similarBookId, 'GET');
		}))
		.then(function(response){
			var p = document.getElementById('similar').appendChild('p').textContent = response;
			alert('Horray everything loaded');
		})
		.catch(function () {
			document.getElementById('similar').textContent = 'Error. Please refresh your browser';
		})		
	})
}

/*

Rewrite using fetch API https://developer.mozilla.org/ru/docs/Web/API/Fetch_API

*/