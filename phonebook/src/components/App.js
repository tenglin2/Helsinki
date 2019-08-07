import React from 'react';
import Filter from './Filter';
import AddContact from './AddContact';
import NumbersList from './NumbersList';
import Notification from './Notification';
import axios from 'axios';

const App = function() {
	const [ persons, setPersons ] = React.useState([ { name: 'Arto Hellas', number: '040-1234567' } ]);
	const [ newName, setNewName ] = React.useState('');
	const [ newNumber, setNewNumber ] = React.useState('');
	const [ filter, setFilter ] = React.useState('');
	const [ errorMessage, setErrorMessage ] = React.useState(null);

	React.useEffect(function() {
		console.log('effect runs only on initial render');
		axios
			.get('http://localhost:3001/api/persons')
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
				// Logic to change the phonenumber if name is already in phonebook
				if (window.confirm(`${newName} is already in phonebook, do you want to update the phonenumber?`)) {
					let id = persons[i].id;
					axios
						.put(`http://localhost:3001/api/persons/${id}`, { ...persons[i], number: newNumber })
						.then((response) => {
							console.log('the put request response is', response);
							console.log('doing a get request to update the numbers list');
							axios
								.get('http://localhost:3001/api/persons')
								.then((response) => {
									console.log('response is', response);
									console.log('response data is', response.data);
									setPersons(response.data);
								})
								.catch((error) => {
									console.log(error);
								});
						})
						.catch((error) => {
							console.log('put error is', error);
						});
				}

				console.log('the updating was complete, now reseting the name and number fields');
				// alert(`${newName} is already added to the phonebook`);
				setNewName('');
				setNewNumber('');
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

		// We want to make a post request to the backend database that hardcodes the values. That means we need to change the db file.
		axios
			.post('http://localhost:3001/api/persons', nameObject)
			.then((response) => {
				console.log('response data is', response.data);
				// Does the db json file mutate automatically?

				// Here we are attemping to update the state using a get request synchronously after the post request. This should solve the undefined id problem.
				console.log('attempting to solve id problem');
				axios
					.get('http://localhost:3001/api/persons')
					.then((response) => {
						console.log('response is', response);
						console.log('response data is', response.data);
						setPersons(response.data);
					})
					.catch((error) => {
						console.log(error);
					});

				setErrorMessage(`Added ${nameObject.name}`);
				setTimeout(function() {
					setErrorMessage(null);
				}, 5000);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleDeleteClick = function(id) {
		console.log('handling the deletion of a person', id);

		if (window.confirm('Are you sure you want to delete this fucker?')) {
			axios
				.delete(`http://localhost:3001/api/persons/${id}`)
				.then((response) => {
					console.log('delete response is', response);
					// Do the get request after deleting synchronously...
					console.log('now try the get request to update and trigger state change');
					axios
						.get('http://localhost:3001/api/persons')
						.then((response) => {
							console.log('response is', response);
							console.log('response data is', response.data);
							setPersons(response.data);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					console.log('error deleting the stuff', error);

					let name;

					// Okay so the reasons I can't get a reference to the name for the error message is because it doesn't exist in the DB anymore. Which means I would have to somehow manipulate the dom element somehow and not the backend because it doesn't exist.
					// Solution to this could be getting the name before the deletion step!!!
					axios
						.get('http://localhost:3001/api/persons')
						.then((response) => {
							console.log('resposne data is', response.data);
							name = response.data[id].name;
							console.log('name is', name);
						})
						.catch((error) => {
							console.log('error finding the name');
						});

					setErrorMessage(`Information of ${name} is already removed from the server, or some other error`);
					setTimeout(function() {
						setErrorMessage(null);
					}, 5000);
				});
		}

		// How do I force a rerender on this deleting?
		// When I create a new entry it is added to the database but trying to deleting it fails because the reference to the id is not there for some reason.
		// Okay so now the only problem is that new entries don't have a defined id. Does that mean I need to do a get request on creation?
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
				<div key={person.name}>
					<h1>
						{person.name} {person.number}
					</h1>
					<button onClick={() => handleDeleteClick(person.id)}>Delete</button>
				</div>
			);
		});
	};

	return (
		<div className="App">
			<h2>Phonebook</h2>

			<Notification message={errorMessage} />

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
