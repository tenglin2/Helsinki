import React from 'react';
import axios from 'axios';

const App = function() {
	const [ query, setQuery ] = React.useState('');
	const [ countries, setCountries ] = React.useState([]);

	React.useEffect(function() {
		console.log('effect hook triggers at start');
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then((response) => {
				console.log('response data is');
				console.log(response.data);
				console.log('first entry is', response.data[0].name);
				setCountries(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const renderCountry = function() {
		if (countries.length > 0) {
			return <h3>{countries[2].name}</h3>;
		} else {
			return <h3>loading...</h3>;
		}
	};

	const handleQueryChange = function(event) {
		console.log('query change triggers');
		setQuery(event.target.value);
	};

	// const helper = function(name) {
	// 	return handleShowClick(name);
	// };

	const handleShowClick = function(name) {
		console.log('show click triggers');
		console.log('the name for the counntry is', name);
		setQuery(name);
	};

	const renderCountries = function() {
		let countriesArray = [];

		if (query.length > 0) {
			countriesArray = countries.filter((country) => {
				if (country.name.toLowerCase().includes(query.toLowerCase())) {
					return true;
				}
				return false;
			});
		} else {
			// Render nothing...
			console.log('query is empty');
		}

		if (countriesArray.length > 10) {
			return <h3>too many countries</h3>;
		} else {
			// If we only have one element in the countries array, then give more information...
			if (countriesArray.length === 1) {
				return (
					<div>
						<h3>{countriesArray[0].name}</h3>
						<p>capital {countriesArray[0].capital}</p>
						<p>population {countriesArray[0].population}</p>
						<h2>Languages</h2>
						{/* Remember that they use camel case for styling inline JSX */}
						<ul style={{ listStyle: 'none' }}>{renderLanguages(countriesArray)}</ul>
						<img src={countriesArray[0].flag} alt="flag" style={flagStyle} />
					</div>
				);
			}

			return countriesArray.map((country) => {
				return (
					<div key={country.name}>
						<h3>{country.name}</h3>
						{/* This button has a onClick event listener that is given a parameter. We do this by passing a function that returns the handler. What's weird is that I don't know how the handler has a reference to the country.name value from the normal function. I don't know how you would do this without arrow functions. */}
						<button style={buttonStyle} onClick={() => handleShowClick(country.name)}>
							Show
						</button>
					</div>
				);
			});
		}
	};

	const renderLanguages = function(countriesArray) {
		return countriesArray[0].languages.map((language) => {
			return <li key={language.name}>{language.name}</li>;
		});
	};

	const flagStyle = {
		border: '.3rem solid black',
		height: '15rem',
		width: 'auto'
	};

	const buttonStyle = {
		border: '.4rem dashed black',
		backgroundColor: 'crimson',
		width: '5rem',
		height: 'auto',
		display: 'inline'
	};

	return (
		<div className="App">
			<h1>App Component</h1>
			{renderCountry()}
			Find Countries: <input value={query} onChange={handleQueryChange} />
			<div>{renderCountries()}</div>
		</div>
	);
};

export default App;
