import React from 'react';
import '../stylesheets/Statistics.css';

const Statistics = function({ good, neutral, bad }) {
	const total = good + neutral + bad;

	if (total !== 0) {
		return (
			<div class="Statistics">
				<h3>average {(good - bad) / total}</h3>
				<h3>positive {good / total * 100} %</h3>
			</div>
		);
	} else return null;
};

export default Statistics;
