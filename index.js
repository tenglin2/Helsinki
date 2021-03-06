require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');
const app = express();
// const password = require('./credentials.js');
const Person = require('./models/person');

app.use(cors());
app.use(bodyParser.json());

// Use this to check the static front end stuff first.
app.use(express.static('build'));

// const url = `mongodb+srv://wilson:${password}@cluster0-easdm.mongodb.net/note-app?retryWrites=true&w=majority`;

// mongoose.connect(url, {
// 	useNewUrlParser: true
// });

// const personSchema = new mongoose.Schema({
// 	name: String,
// 	number: String
// });

// personSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	}
// });

// const Person = mongoose.model('Person', personSchema);

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: 2
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3
	},
	{
		name: 'John Wick',
		number: '48234-238424',
		id: 4
	},
	{
		name: 'Captain Crunch',
		number: '84912-8432942',
		id: 5
	}
];

const generateId = function() {
	// if (persons.length > 0) {
	//   return Math.max(...persons.map(person => {
	//     return person.id;
	//   }));
	// } else {
	//   return null;
	// }

	return Math.floor(500 * Math.random());
};

app.get('/', function(request, response) {
	response.end('This is the home');
});

app.get('/api/persons', function(request, response) {
	// Here is the hardcoded data...
	// response.json(persons);

	// Instead we get the data from the mongo database.
	Person.find({}).then((persons) => {
		// We should expect an array of persons with only two I believe.
		response.json(persons.map((person) => person.toJSON()));
	});
});

// Getting a single entry means we need to find based on id and return a 404 error if not found
app.get('/api/persons/:id', function(request, response) {
	// const id = Number(request.params.id);

	// const person = persons.find((person) => {
	// 	return person.id === id;
	// });

	// if (person) {
	// 	response.json(person);
	// } else {
	// 	response.status(404).end('not found error');
	// }

	Person.findById(request.params.id).then((person) => {
		response.json(person.toJSON());
	});
});

app.get('/info', function(request, response) {
	// Need to get the total number of persons, so just get the length of the array.
	// Problem here is that I can do multiple sends
	response.send(`Phonebook has info for ${persons.length} people ${new Date()}`);
});

app.delete('/api/persons/:id', function(request, response) {
	// Had an error here because I tried to mutate the persons array but I set it to a constant variable so it threw an error.
	const id = Number(request.params.id);

	persons = persons.filter((person) => person.id !== id);

	response.status(204).end('deleted stuff');
});

app.post('/api/persons', function(request, response) {
	// Had a problem here caused by forgetting to use the body parser so I could get access to the request.body.

	const id = generateId();

	const body = request.body;

	console.log('body is', body);

	// const person = {
	// 	id: id,
	// 	name: body.name,
	// 	number: body.number
	// };

	if (!body.name || !body.number) {
		return response.status(400).end('empty name or number');
	}

	// The duplicate part is broken. Might fix later.
	// if (persons.includes(person)) {
	// 	response.status(400).end('duplicate data');
	// }

	// persons = persons.concat(person);

	// response.json(person);

	const person = new Person({
		name: body.name,
		number: body.number,
		id: id
	});

	person.save().then((savedPerson) => {
		response.json(savedPerson.toJSON);
	});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`);
});
