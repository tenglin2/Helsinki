import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = function({ course }) {
	const { name, parts } = course;

	return (
		<div className="Course">
			<Header name={name} />
			<Content parts={parts} />
		</div>
	);
};

export default Course;
