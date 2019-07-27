import React from 'react';
import Part from './Part';
import Sum from './Sum';

const Content = function({ parts }) {
	const renderParts = function() {
		return parts.map((part) => {
			return (
				// <li key={part.id}>
				// 	{part.name} {part.exercises}
				// </li>
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			);
		});
	};

	const returnTotal = function() {
		return parts.reduce((total, accumulator) => {
			return total + accumulator.exercises;
		}, 0);
	};

	return (
		<div className="Content">
			<h1>Content</h1>
			<ul>
				{renderParts()}
				<li>Total tesitng {returnTotal()}</li>
				<Sum total={returnTotal()} />
			</ul>
		</div>
	);
};

export default Content;
