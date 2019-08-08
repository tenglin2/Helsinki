import React from 'react';

const NumbersList = function({ renderPersons }) {
	return (
		<div className="NumbersList">
			<h2>Numbers List</h2>
			{renderPersons()}
		</div>
	);
};

export default NumbersList;
