import React from 'react';

const Notification = function({ message }) {
	if (message === null) {
		console.log('message is null');
		return <h1>Something NONNULL</h1>;
	}

	return (
		<div>
			<h2>{message}</h2>
		</div>
	);
};

export default Notification;
