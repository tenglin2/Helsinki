import React from 'react';

const AddContact = function({ handleFormSubmit, newName, handleNameChange, newNumber, handleNumberChange }) {
	console.log(newName, newNumber);

	return (
		<div className="AddContact">
			<h1>Add a New Contact</h1>
			<form onSubmit={handleFormSubmit}>
				Name: <input value={newName} onChange={handleNameChange} />
				Number: <input value={newNumber} onChange={handleNumberChange} />
				<div>
					<button type="submit">Add New Contact</button>
				</div>
			</form>
		</div>
	);
};

export default AddContact;
