import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/App.css';
import Statistics from './components/Statistics';

const App = function() {
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);
	const total = good + neutral + bad;

	const buttonGoodHandler = function() {
		setGood(good + 1);
	};

	const buttonNeutralHandler = function() {
		setNeutral(neutral + 1);
	};

	const buttonBadHandler = function() {
		setBad(bad + 1);
	};

	return (
		<div class="App">
			<h2 class="header">give feedback</h2>
			{/* buttons are default inline block */}
			<button onClick={buttonGoodHandler} class="button good">
				good
			</button>
			<button onClick={buttonNeutralHandler} class="button neutral">
				neutral
			</button>
			<button onClick={buttonBadHandler} class="button bad">
				bad
			</button>

			<h3>good {good}</h3>
			<h3>neutral {neutral}</h3>
			<h3>bad {bad}</h3>
			<h3>all {total}</h3>

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
