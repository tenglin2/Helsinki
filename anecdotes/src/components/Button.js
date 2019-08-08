import React from 'react';
import '../stylesheets/Button.css';

const Button = function({ text, handler }) {
	return (
		<button onClick={handler} className="button">
			{text}
		</button>
	);
};

export default Button;
