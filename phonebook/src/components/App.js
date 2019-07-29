import React from 'react';
import Filter from './Filter';
import AddContact from './AddContact';
import NumbersList from './NumbersList';
import axios from 'axios';

const App = function() {
	const [ persons, setPersons ] = React.useState([ { name: 'Arto Hellas', number: '040-1234567' } ]);
	const [ newName, setNewName ] = React.useState('');
	const [ newNumber, setNewNumber ] = React.useState('');
	const [ filter, setFilter ] = React.useState('');

	React.useEffect(function() {
		console.log('effect runs only on initial render');
		axios
			.get('http://localhost:3001/persons')
			.then((response) => {
				console.log('response is', response);
				console.log('response data is', response.data);
				setPersons(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleNameChange = function(event) {
		console.log('name change trigger');
		setNewName(event.target.value);
	};

	const handleNumberChange = function(event) {
		console.log('number change trigger');
		setNewNumber(event.target.value);
	};

	const handleFilterChange = function(event) {
		console.log('filter change');
		setFilter(event.target.value);
	};

	const handleFormSubmit = function(event) {
		event.preventDefault();

		console.log('form submits');

		// Cannot add to phonebook if name is empty. Wait shouldn't I do a regex check on the number too? Sounds like a lot of work. /[0-9-]{9,15}/g

		// Prevent same names from being added. Cannot compare using the name object because you cannot compare different references in memory.
		for (let i = 0; i < persons.length; i++) {
			if (persons[i].name === newName) {
				alert(`${newName} is already added to the phonebook`);
				setNewName('');
				return; // To prevent the rest of the code.
			}
		}

		let nameObject = {
			name: newName,
			number: newNumber
		};

		// Push doesn't work probably because it mutates the state. You could probably do this with a spread operator.
		setPersons(persons.concat(nameObject));
		setNewName('');
		setNewNumber('');
		console.log(persons);
	};

	const renderPersons = function() {
		console.log('triggers render persons');

		let filteredPersons;

		// Truthy if non empty string.
		if (filter.length) {
			filteredPersons = persons.filter((person) => {
				return person.name.includes(filter);
			});
		} else {
			filteredPersons = persons;
		}

		// If the filter is empty, then just map like normal.
		return filteredPersons.map((person) => {
			return (
				<h1 key={person.name}>
					{person.name} {person.number}
				</h1>
			);
		});
	};

	return (
		<div className="App">
			<h2>Phonebook</h2>

			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<AddContact
				handleFormSubmit={handleFormSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<NumbersList renderPersons={renderPersons} />
			<div>debug {newName}</div>
			<div>debug {newNumber}</div>
		</div>
	);
};

export default App;
