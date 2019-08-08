import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
import './stylesheets/App.css';

// the array...
const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

// Storage to maintain the number of votes for an anecdote. I believe it needs to be outside so that it doesn't rerender each time.
const votesDB = new Array(anecdotes.length).fill(0);

const App = function(props) {
	const [ selected, setSelected ] = React.useState(0);
	const [ votes, setVotes ] = React.useState(0);

	// Event handlers for the buttons.
	const handleVote = async function() {
		// // Not sure why but the first pass doesn't trigger. Another problem is that the value saves itself.
		// increaseVotes(votes + 1);
		// // selected refers to the index of the array, ie the exact anecdote.

		// votesDB[selected] = votes;
		// console.log(votesDB, votes);
		console.log('votes');
		// Will this force it to be synchronous? Try without first.
		// setVotes(() => )
		const newVotes = await setVotes(votes + 1);
		votesDB[selected] = newVotes;

		console.log(votesDB, votes);
	};

	const handleNext = async function() {
		// // Should change to index 0 if already at the last element. Do this by checking the length of the array.
		// if (selected === anecdotes.length - 1) {
		// 	// Problem is that I need to wait for setSelected to finish before going on.
		// 	setSelected(0);
		// 	console.log('the selected is currently asynch at', selected);
		// 	increaseVotes(votesDB[selected] - 1);
		// } else {
		// 	setSelected(selected + 1);
		// 	console.log('the selected is currently asynch at', selected);
		// 	increaseVotes(votesDB[selected] - 1);
		// }

		// console.log('new selected is', selected);
		// console.log(votesDB, votes);
		console.log('anecdotes');

		if (selected === votesDB.length - 1) {
			// Very last element so shift to index 0.
			setSelected(0);
			// Also change the votes value to the one already stored to db.
			// This might need to be asynchrnous.
			setVotes(votesDB[selected]);
		} else {
			// Normal case, just move the selected index up one.
			const newSelected = await setSelected(selected + 1);

			// Again, update the votes value on display.
			setVotes(votesDB[newSelected]);
		}

		console.log(votesDB, votes);
	};

	// So we expect an array called anecdotes to be passed to the props.
	return (
		<div className="App">
			<h2>{props.anecdotes[selected]}</h2>
			<h2>has {votesDB[selected]} votes</h2>

			{/* Buttons are inline block elements. Have to pass handle method */}
			<Button text="vote" handler={handleVote} />
			<Button text="next anecdote" handler={handleNext} />
		</div>
	);
};

// We can pass props to the app inside of the reactdom render part.
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

// Can't figure out how to use state synchronously. Maybe next time.
