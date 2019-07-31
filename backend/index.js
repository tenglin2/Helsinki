const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// This is saying to use this middleware.
app.use(bodyParser.json());

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	},
	{
		id: 4,
		content: 'stable staple misplaced snake',
		date: new Date(),
		important: false
	}
];

app.get('/', function(request, response) {
	// How does it know to interpret this as html? Where is the header?
	// Okay so since the parameter is a string it is automatically set to content type header of text/html. The question is how do I force the content header? Try to break it.
	// response.writeHead(200, {
	// 	'Content-Type': 'text/html'
	// }); Doesn't work
	response.send('<h2>this is html tag parse</h2>');
});

app.get('/notes', function(request, response) {
	// What is the form sent back? String?
	// No you are effectively sending back the actual object I think. Which is weird because you usually have to parse in the front end.
	// It is definitely still stringified. It does the same thing but somehow the result was different.
	// This is a convenience of express. You don't have to stringify and send separately.
	response.json(notes);
});

app.get('/notes/:id', function(request, response) {
	// So remember that optional url stuff are part of the params of the request itself, ie the URL the user gives.
	console.log('request params are', request.params);
	// This is a string initially from the URL. Since we compare it to a number in the note object, we need to convert it to a number.
	// When in doubt use a console log statement and find all the types and values.
	const id = Number(request.params.id);

	const note = notes.find((note) => {
		return note.id === id;
	});

	// Condition to avoid null output.
	if (note) {
		response.json(note);
	} else {
		// 404 not found
		response.status(404).end();
	}
});

// app.get('/notes/:id', (request, response) => {
// 	// The problem is probably a type conversion. Id is a number.
// 	const id = request.params.id;
// 	const note = notes.find((note) => note.id === Number(id));
// 	response.json(note);
// });

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.post('/notes', function(request, response) {
	const body = request.body;
	console.log(body);

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		});
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId()
	};

	notes = notes.concat(note);

	// So the thing sent back is a copy of what you just did.
	response.json(note);
});

app.delete('/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	// I guess we manually delete it then...
	notes = notes.filter((note) => note.id !== id);

	response.status(204).end('deleted stuff');
});

const PORT = 3001;
app.listen(PORT, function() {
	// Optional callback function?
	console.log(`express server started on port ${PORT}`);
});

// const app = http.createServer((request, response) => {
// 	response.writeHead(200, {
// 		'Content-Type': 'application/json'
// 	});
// 	response.end(JSON.stringify(notes));
// });

// const app = http.createServer((request, response) => {
// 	// Writing head is composed of the status code, then the object that defines the content type and other stuff. The header is important so that you know how to parse the given data.
// 	response.writeHead(200, {
// 		'Content-Type': 'text/html'
// 	});
// 	response.end('hello yo');
// });

// const port = 3001;

// app.listen(port);

// console.log(`Server started on port ${3001}`);
