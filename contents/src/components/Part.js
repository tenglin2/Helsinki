import React from 'react';

const Part = function({ id, name, exercises }) {
	return (
		<li key={id}>
			{name} {exercises} jump
		</li>
	);
};

export default Part;
