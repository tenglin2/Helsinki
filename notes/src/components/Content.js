import React from 'react';

const Content = ({ parts }) => {
	// Destructuring an array
	const [ part1, part2, part3 ] = parts;
	return (
		<div>
			<p>
				{part1.name} {part1.exercises}
			</p>
			<p>
				{part2.name} {part2.exercises}
			</p>
			<p>
				{part3.name} {part3.exercises}
			</p>
		</div>
	);
};

export default Content;
