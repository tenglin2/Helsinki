import React from 'react';
import '../stylesheets/Sum.css';

const Sum = function({ total }) {
	return <li class="Sum">Total number of exercises is {total}</li>;
};

export default Sum;
