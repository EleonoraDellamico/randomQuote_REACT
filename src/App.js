import './App.scss';
import React, { useEffect, useState } from 'react';
import COLORS_ARRAY from './colorsArray.js';

let quoteBDurl =
	'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
	const [ quote, setQuote ] = useState('I am dead inside');
	const [ author, setAuthor ] = useState('Michael Scott');
	const [ randomNumber, setRandomNumber ] = useState(0);
	const [ quotesArray, setQuotesArray ] = useState(null);
	const [ accentColor, setAccentColor ] = useState('#282c34');

	const fetchQuotes = async (url) => {
		const response = await fetch(url);
		const parsedJSON = await response.json();
		setQuotesArray(parsedJSON.quotes);
		console.log(parsedJSON);
	};
	useEffect(
		() => {
			fetchQuotes(quoteBDurl);
		},
		[ quoteBDurl ]
	);

	const getRandomQuote = () => {
		let randomInteger = Math.floor(quotesArray.length * Math.random());
		setRandomNumber(randomInteger);
		setAccentColor(COLORS_ARRAY[randomInteger]);
		setQuote(quotesArray[randomInteger].quote);
		setAuthor(quotesArray[randomInteger].author);
	};

	return (
		<div className="App">
			<header style={{ backgroundColor: accentColor }} className="App-header">
				<div id="quote-box">
					<p style={{ color: accentColor }} id="text">
						"{quote}"
					</p>
					<p id="author" style={{ color: accentColor }}>
						"{author}"
					</p>
					<div className="button">
						<a id="tweet-quote" href={`http://www.twitter.com/intent/tweet?text=${quote} -${author}`}>
							<img
								className="imgTwitter"
								alt="icon twitter"
								src="https://img.icons8.com/material/96/000000/twitter--v1.png"
							/>
						</a>
						<button id="new-quote" onClick={() => getRandomQuote()}>
							Next Quote
						</button>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;
