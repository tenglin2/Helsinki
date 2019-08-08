// This is a test to to make sure that we know a little bit about using MongoAtlas before integrating into our phonebook application.

const mongoose = require('mongoose');

// In the case where we only get invoke, we need to prompt for the password...
if (process.argv.length < 3) {
	console.log('password not given, cannot process');
	process.exit(1);
}

const password = process.argv[2];

// We expect the password to be given in the terminal by the user.
const url = `mongodb+srv://wilson:${password}@cluster0-easdm.mongodb.net/phonebook?retryWrites=true&w=majority`;

// Actually connecting ot the database using the URL.
mongoose.connect(url, {
	useNewUrlParser: true
});

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

// In the case where we only get the password, we want to show the other phonebook entries inside of the database.
if (process.argv.length < 4) {
	console.log('password is given and we need to print out all the phonebook entries.');

	console.log('phonebook:');
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person.name, person.number);
		});

		mongoose.connection.close();
	});
}

// This instance we have 5 arguments.
if (process.argv.length === 5) {
	// Let's do the easier case first where there are 5 argumetns and we just add to the database.
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});

	person.save().then((response) => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
		mongoose.connection.close();
	});
}
