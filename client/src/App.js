import React from 'react';
import axios from 'axios';
function App() {
	const [symbol, setSymbol] = React.useState('');
	const [date, setDate] = React.useState('');
	const [stockData, setStockData] = React.useState('');
	const [fetchError, setFetchError] = React.useState(false);
	React.useEffect(() => {
		console.log(date)
	}, [date]);

	React.useEffect(() => {
		setStockData("1");
		setSymbol("a specific stock");
		setDate("a particular Date");
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		debugger;
		try {
			const response = await axios.post('http://localhost:5000/api/fetchStockData', {
				symbol,
				date,
			}
			);
			setFetchError(false);
			console.log(response.data);
			setStockData(response.data);
		}
		catch (error) {
			console.log(error);
			setFetchError(true);
			console.error('Error fetching data:', error);
			setStockData(null);
		}
	}


	return (
		<div className="container">
			<h1>Stock Details</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Stock Symbol: </label>
					<input
						type="text"
						id="symbol"
						onChange={(e) => setSymbol(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Date: </label>
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Submit</button>
			</form>

			{stockData && (
				<div>
					<h2>Stock Data for {symbol} on {date}</h2>
					<p>Open: {stockData.open}</p>
					<p>High: {stockData.high}</p>
					<p>Low: {stockData.low}</p>
					<p>Close: {stockData.close}</p>
					<p>Volume: {stockData.volume}</p>
				</div>
			)}

			{
				fetchError && (
					<p>Please enter correct Details!</p>
				)
			}
		</div>



	);
}

export default App;