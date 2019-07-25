import React from 'react';

const Total = ({ parts }) => {
	let total = 0;
	parts.forEach((part) => {
		total += part.exercises;
	});

	return <p>Number of exercise is {total}</p>;
};

export default Total;
