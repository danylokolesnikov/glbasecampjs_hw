function doAjaxCallPromise(url, method, onSuccess, onError) {
	return new Promise(function(resolve,reject){
		fetch(url,{method: method})
		.then(
			function(response) {
				if(response.status === 200){
					response.text().then(function (response) {
						onSuccess(response);
						resolve(response);
					}).catch(function(error){console.log('Error after method .text() :'+error)})
				} else {
					onError();
					reject('Something went wrong');
				};
			}).catch(function(error){console.log('Error in fetch :'+error)})
	})
}

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

	doAjaxCallPromise('api/books/' + id, 'GET', function (response) {
		document.getElementById('book').textContent = response.name;
	}, function (response) {
		document.getElementById('book').textContent = 'Error. Please refresh your browser';
	})
}

function loadPage(id) {

	document.getElementById('book').textContent = 'Please wait. Book is loading';
	document.getElementById('author').textContent = 'Please wait. Author details are loading';
	document.getElementById('similar').textContent = 'Please wait. Similar books are loading';

	doAjaxCallPromise('api/books/' + id, 'GET', function(response) {
		document.getElementById('book').textContent = response.name;
	}, function(){
		document.getElementById('book').textContent = 'Error. Please refresh your browser';
	}).then(function(fetchRes){
		return doAjaxCallPromise('api/autors' + fetchRes.authorId, 'GET', function (response) {
			document.getElementById('author').textContent = response.name;
			var similarBooksLoaded = 0;
			var similarBooksAmount = response.books.lenght;
		}, function(){
			document.getElementById('author').textContent = 'Error. Please refresh your browser';
		})
	}).then(function(fetchRes){
		fetchRes.books.forEach(function(similarBookId) {
			return doAjaxCallPromise('api/bestsellers/similar/' + similarBookId, 'GET', function (response) {
				var p = document.getElementById('similar').appendChild('p').textContent = response;
				similarBooksLoaded += 1

				if(similarBooksLoaded === similarBooksAmount) {
					alert('Horray everything loaded');
				}
			}, function () {
				document.getElementById('similar').textContent = 'Error. Please refresh your browser';
			})
		})
	}).catch(function(error){console.log('Catching rejects:'error)})
}

/*

Rewrite using fetch API https://developer.mozilla.org/ru/docs/Web/API/Fetch_API

*/