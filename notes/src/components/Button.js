import React, { useState } from 'react';
import '../stylesheets/Button.css';

const Button = function() {
	const [ counter, setCounter ] = useState(0);

	const incrementCounter = function() {
		setCounter(counter + 1);
	};

	return (
		<div>
			<h1>{counter}</h1>
			<button class="button" onClick={incrementCounter}>
				&#43;
			</button>
			<a class="button red" onClick={() => setCounter(counter - 1)}>
				&#45;
			</a>
		</div>
	);
};

export default Button;
