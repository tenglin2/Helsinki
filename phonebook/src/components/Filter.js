import React from 'react';

const Filter = function({ filter, handleFilterChange }) {
	return (
		<div className="Filter">
			Filter Shown With: <input value={filter} onChange={handleFilterChange} />
		</div>
	);
};

export default Filter;
